import type { AnimalSpecies, Partner } from '@prisma/client';
import { AnimalRelationshipType, AnimalStatusType } from '@prisma/client';
import { load as cheerioLoad } from 'cheerio';
import { NodeHtmlMarkdown } from 'node-html-markdown';

import type { NawtAnimal } from './config';
import { BASE_URL } from './config';

export function getReferenceFromAnimal(animal: NawtAnimal): string {
  return `${BASE_URL}${animal.url}`;
}

export default async function getAnimalDetails(
  species: AnimalSpecies,
  nawtAnimal: NawtAnimal,
  partnersByEmail: Record<string, Partner>
) {
  // Validate the URL
  const reference = getReferenceFromAnimal(nawtAnimal);
  if (!reference) {
    throw new Error('Unable to get reference');
  }

  // Load the Page
  console.log(`${BASE_URL}${nawtAnimal.url}`)
  const response = await fetch(`${BASE_URL}${nawtAnimal.url}`, { next: { revalidate: 3600 } });
  const body = await response.text();
  const content = cheerioLoad(body);
  const description = NodeHtmlMarkdown.translate(
    content('p.intro').html() ?? ''
  );

  const email = content('p.email a')[0]?.attribs.href.split(':').pop();
  if (!email) {
    throw new Error(`Unable to get email: ${BASE_URL}${nawtAnimal.url}`);
  }
  const partner = partnersByEmail[email];

  // Create the Animal.
  const data = {
    name: nawtAnimal.name,
    species,
    status: AnimalStatusType.REHOMING,
    description,
    source: reference,
    sex: nawtAnimal.sex,
    breed: nawtAnimal.breed,
    friendlyToCats: nawtAnimal.catFriendly,
    friendlyToDogs: nawtAnimal.dogFriendly,
    friendlyToHumans: nawtAnimal.humanFriendly,
    locationName: partner.locationName ?? undefined,
    locationLat: partner.locationLat ?? undefined,
    locationLng: partner.locationLng ?? undefined,
    dateOfBirth: nawtAnimal.dateOfBirth,
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

  content('div[data-image]').each((_, divImage) => {
    data.images.push({
      name: undefined,
      url: divImage.attribs?.['data-image'],
      source: divImage.attribs?.['data-image'],
    });
  });

  // Success!
  return data;
}
