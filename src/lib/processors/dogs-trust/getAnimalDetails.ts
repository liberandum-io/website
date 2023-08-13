import type { AnimalSpecies, Partner } from '@prisma/client';
import {
  AnimalRelationshipType,
  AnimalSex,
  AnimalStatusType,
} from '@prisma/client';

import type { DogsTrustAnimal } from './config';
import { BASE_URL } from './config';
import type { DogsTrustAnimalDetails } from './getAnimalDetailsTypes';

export function getReferenceFromAnimal(animal: DogsTrustAnimal): string {
  return `${BASE_URL}${animal.url}`;
}

function humanFriendlyAge(animal: DogsTrustAnimal): number {
  if (animal.liveWithPreschool) {
    return 1;
  }

  if (animal.liveWithPrimary) {
    return 4;
  }

  if (animal.liveWithSecondary) {
    return 11;
  }

  return 16;
}

type getAnimalDetailsResponseType = {
  result: {
    data: {
      dogData: DogsTrustAnimalDetails;
    };
  };
};

export default async function getAnimalDetails(
  species: AnimalSpecies,
  dogstrustAnimal: DogsTrustAnimal,
  partnersByWebsite: Record<string, Partner>
) {
  // Validate the URL
  const reference = getReferenceFromAnimal(dogstrustAnimal);
  if (!reference) {
    throw new Error('Unable to get reference');
  }

  // Load the Page
  const response = await fetch(
    `${BASE_URL}/page-data${dogstrustAnimal.url}/page-data.json`,
    { next: { revalidate: 3600 } }
  );
  const body = (await response.json()) as getAnimalDetailsResponseType;

  const partnerUrl = `${BASE_URL}${body.result.data.dogData.thisDogsCentre.path.alias}`;
  const partner = partnersByWebsite[partnerUrl];
  if (!partner) {
    throw new Error(`Unable to get partner: ${partnerUrl}`);
  }

  const description: string[] = [];
  if (body.result.data.dogData.field_info) {
    description.push(
      `## The Ideal Home\r\n\r\n${body.result.data.dogData.field_typeofhomerequired}`
    );
  }
  if (body.result.data.dogData.field_typeofhomerequired) {
    description.push(
      `### Required Home\r\n\r\n${body.result.data.dogData.field_info}`
    );
  }

  // Create the Animal.
  const data = {
    name: dogstrustAnimal.name,
    species,
    status: AnimalStatusType.REHOMING,
    description:
      description.length > 0 ? description.join('\r\n\r\n') : undefined,
    source: reference,
    sex: dogstrustAnimal.gender === 'F' ? AnimalSex.FEMALE : AnimalSex.MALE,
    breed: dogstrustAnimal.breed,
    // colour: dogstrustAnimal.colour,
    friendlyToCats: dogstrustAnimal.liveWithCats,
    friendlyToDogs: dogstrustAnimal.liveWithDogs,
    friendlyToHumans: humanFriendlyAge(dogstrustAnimal),
    locationName: partner.locationName ?? undefined,
    locationLat: partner.locationLat ?? undefined,
    locationLng: partner.locationLng ?? undefined,
    medicalNeeds: dogstrustAnimal.needsMedicalCare,
    dateOfBirth: new Date(dogstrustAnimal.dob),
    relationships: [
      {
        partnerId: partner.id,
        type: AnimalRelationshipType.OWNER,
      },
    ],
    images: [] as {
      name?: string|undefined,
      url: string,
      source: string,
    }[],
  };

  for (const image of dogstrustAnimal.media?.images ?? []) {
    const imageUrl =
      image.src.indexOf('://') === -1 ? `${BASE_URL}/images/800x600/${image.src}` : image.src;

    data.images.push({
      url: imageUrl,
      source: imageUrl,
    });
  }

  // Success!
  return data;
}
