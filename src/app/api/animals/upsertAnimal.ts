import type { z } from 'zod';

import prisma from '@/lib/prisma';
import type { UpsertAnimal } from '@/lib/validations/animals';
import { Animal, AnimalMedia, AnimalMediaType, Prisma } from '@prisma/client';
import UploadToCloudflareImages from '@/lib/cloudflare/images';

async function saveImage(animal: Pick<Animal, "id">, image: {
  name?: string|undefined,
  url: string,
  source: string,
}): Promise<string> {
  const response = await UploadToCloudflareImages(
    image.source,
    {
      name: image.name!,
      source: image.source,
      animalId: animal.id,
    }
  );

  if (response.success !== true || !response.result) {
    throw new Error(JSON.stringify(response.errors));
  }

  return `cloudflare-images://${process.env.NEXT_CLOUDFLARE_IMAGE_ACCOUNT_ID}/${response.result.id}`;
}

export default async function upsertAnimal(
  animalDetails: z.infer<typeof UpsertAnimal>
) {
  const data = {
    updatedAt: new Date(),
    species: animalDetails.species,
    status: animalDetails.status,
    name: animalDetails.name,
    subtitle: animalDetails.subtitle,
    description: animalDetails.description,
    dateOfBirth: animalDetails.dateOfBirth,
    sex: animalDetails.sex,
    breed: animalDetails.breed,
    colour: animalDetails.colour,
    medicalNeeds: animalDetails.medicalNeeds,
    friendlyToCats: animalDetails.friendlyToCats,
    friendlyToDogs: animalDetails.friendlyToDogs,
    friendlyToHumans: animalDetails.friendlyToHumans,
    source: animalDetails.source,
    locationName: animalDetails.locationName,
    locationLat: animalDetails.locationLat,
    locationLng: animalDetails.locationLng,
  };

  const animal = await prisma.animal.upsert({
    select: {
      id: true,
      media: true,
    },
    create: {
      createdAt: new Date(),
      relationships: animalDetails.relationships
        ? {
            createMany: {
              data: animalDetails.relationships,
              skipDuplicates: true,
            },
          }
        : undefined,
      ...data,
    },
    update: {
      ...data,
      relationships: animalDetails.relationships
        ? {
            createMany: {
              data: animalDetails.relationships,
              skipDuplicates: true,
            },
          }
        : undefined,
    },
    where: {
      source: animalDetails.source,
    },
  });

  const mediaToCreate: Prisma.AnimalMediaCreateManyAnimalInput[] = [];
  const mediaBySource = animal.media.reduce<Record<string, AnimalMedia>>(
    (result, media) => ({
      ...result,
      [media.source!]: media
    }),
    {},
  );

  const mediaToKeep: string[] = [];
  for (const image of animalDetails.images ?? []) {
    if (mediaBySource[image.source]) {
      mediaToKeep.push(mediaBySource[image.source].id);

      continue;
    }

    try {
      console.log('Saving image to cloudflare-images');
      mediaToCreate.push({
        type: AnimalMediaType.IMAGE,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: image.name,
        source: image.source,
        location: await saveImage(animal, image),
      });
    } catch (e) {
      // do nothing...
      console.warn("error saving image to cloudflare-images", e);
    }
  }

  const mediaToDelete = animal.media.filter(
    (media) => !mediaToKeep.includes(media.id)
  ).map(media => media.id);

  console.log({
    mediaToCreate,
    mediaToDelete
  });

  await prisma.animal.update({
    data: {
      media: {
        createMany: {
          data: mediaToCreate
        },
        deleteMany: mediaToDelete.length > 0 ? {
          id: {
            in: mediaToDelete,
          }
        } : undefined,
      },
    },
    where: {
      id: animal.id,
    }
  });

  return animal;
}
