import type { AnimalSpecies, Partner } from '@prisma/client';
import { AnimalRelationshipType, AnimalStatusType } from '@prisma/client';
import { load as cheerioLoad } from 'cheerio';
import { NodeHtmlMarkdown } from 'node-html-markdown';

import type { RspcaAnimal } from './config';
import { BASE_URL } from './config';
import rspcaFetch from './rspcaFetch';

export function getReferenceFromAnimal(animal: RspcaAnimal): string {
  return `${BASE_URL}${animal.url}`;
}

export default async function getAnimalDetails(
  species: AnimalSpecies,
  rspcaAnimal: (RspcaAnimal & any),
  partnersByEmail: Record<string, Partner>,
  cookies: string
) {
  // Validate the URL
  const reference = getReferenceFromAnimal(rspcaAnimal);
  if (!reference) {
    throw new Error('Unable to get reference');
  }

  // Load the Page
  const response = await rspcaFetch(
    `${BASE_URL}${rspcaAnimal.url}`,
    '',
    cookies
  );
  const body = await response.text();
  const content = cheerioLoad(body);
  const description = NodeHtmlMarkdown.translate(
    content('div.petDescription.schemeBorder.themeFindAPetBorder').html() ?? ''
  );

  const email = content('p.email a')[0]?.attribs.href.split(':').pop();
  if (!email) {
    throw new Error(`Unable to get email: ${BASE_URL}${rspcaAnimal.url}`);
  }
  const partner = partnersByEmail[email];

  // Create the Animal.
  const data = {
    name: rspcaAnimal.name,
    species,
    status: AnimalStatusType.REHOMING,
    description,
    source: reference,
    sex: rspcaAnimal.sex,
    breed: rspcaAnimal.breed,
    friendlyToCats: rspcaAnimal.catFriendly,
    friendlyToDogs: rspcaAnimal.dogFriendly,
    friendlyToHumans: rspcaAnimal.humanFriendly,
    locationName: partner.locationName ?? undefined,
    locationLat: partner.locationLat ?? undefined,
    locationLng: partner.locationLng ?? undefined,
    dateOfBirth: rspcaAnimal.dateOfBirth,
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

  console.log(data);

  for (const image of rspcaAnimal.images) {
    const imageUrl =
      image.indexOf('://') === -1 ? `${BASE_URL}${image}` : image;

    data.images.push({
      url: imageUrl,
      source: imageUrl,
    });
  }

  // Success!
  return data;
}
