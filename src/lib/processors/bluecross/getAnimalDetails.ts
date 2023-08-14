import type { AnimalSpecies, Partner } from '@prisma/client';
import {
  AnimalRelationshipType,
  AnimalSex,
  AnimalStatusType,
} from '@prisma/client';
import { load as cheerioLoad } from 'cheerio';
import { NodeHtmlMarkdown } from 'node-html-markdown';

import normaliseVariants from '../normaliseVariants';
import type { BluecrossAnimal } from './config';
import { BASE_URL } from './config';

export function getReferenceFromAnimal(animal: BluecrossAnimal): string {
  return `${BASE_URL}${animal.view_node}`;
}

function isCatFriendly(friendlyTo: string[]) {
  return friendlyTo.indexOf('cats') !== -1;
}

function isDogFriendly(friendlyTo: string[]) {
  return friendlyTo.indexOf('dogs') !== -1;
}

function humanFriendlyAge(friendlyTo: string[]): number {
  if (friendlyTo.indexOf('all age children') !== -1) {
    return 1;
  }

  if (friendlyTo.indexOf('school age children') !== -1) {
    return 8;
  }

  return 16;
}

export default async function getAnimalDetails(
  species: AnimalSpecies,
  bluecrossAnimal: BluecrossAnimal,
  partnersByWebsite: Record<string, Partner>
) {
  // Validate the URL
  const reference = getReferenceFromAnimal(bluecrossAnimal);
  if (!reference) {
    throw new Error('Unable to get reference');
  }

  // Load the Page
  const response = await fetch(`${reference}`, { next: { revalidate: 3600 } });
  const body = await response.text();
  const content = cheerioLoad(body);

  let partner: Partner = partnersByWebsite[BASE_URL]!;
  const sex: AnimalSex | undefined = {
    female: AnimalSex.FEMALE,
    male: AnimalSex.FEMALE,
  }[(bluecrossAnimal.field_pet_sex || '').toLowerCase()];
  const breed: string | undefined = bluecrossAnimal.field_breed;
  const colour: string | undefined =
    normaliseVariants(bluecrossAnimal.field_pet_colour) || undefined;
  let dateOfBirth: Date | undefined;
  if (
    typeof bluecrossAnimal.field_age_year === 'string' ||
    typeof bluecrossAnimal.field_age_month === 'string'
  ) {
    dateOfBirth = new Date();
    if (typeof bluecrossAnimal.field_age_year === 'string') {
      dateOfBirth.setFullYear(
        dateOfBirth.getFullYear() - Number(bluecrossAnimal.field_age_year)
      );
    }
    if (typeof bluecrossAnimal.field_age_month === 'string') {
      dateOfBirth.setMonth(
        dateOfBirth.getMonth() - Number(bluecrossAnimal.field_age_month)
      );
    }
  }
  const friendlyTo = (bluecrossAnimal.field_pet_can_live_with || []).map(
    (item) => item.toLowerCase()
  );
  const friendlyToCats: boolean | undefined = isCatFriendly(friendlyTo);
  const friendlyToDogs: boolean | undefined = isDogFriendly(friendlyTo);
  const friendlyToHumans: number | undefined = humanFriendlyAge(friendlyTo);
  const medicalNeeds: boolean = false;
  let locationName: string | undefined = partner.locationName || undefined;
  let locationLat: number | undefined = partner.locationLat || undefined;
  let locationLng: number | undefined = partner.locationLng || undefined;
  let status: AnimalStatusType = AnimalStatusType.REHOMING;
  if (bluecrossAnimal.field_reserved.toLowerCase() === 'yes') {
    status = AnimalStatusType.RESERVED;
  }

  // .info-panel > dl > div > dd > a
  const partnerLink = content('.info-panel > dl > div > dd > a[hreflang=en]').get(0)?.attribs
    .href as string;
  partner =
    partnersByWebsite[partnerLink] ??
    partnersByWebsite[`${BASE_URL}${partnerLink}`];
  if (!partner) {
    throw new Error(
      `Unable to get partner: ${partnerLink} (${Object.keys(
        partnersByWebsite
      )})`
    );
  }

  locationName = partner.locationName || undefined;
  locationLat = partner.locationLat || undefined;
  locationLng = partner.locationLng || undefined;

  let name: string | undefined = bluecrossAnimal.title;
  if (name) {
    name = (name.split('(&')[0] as string).replace(/\s+/, ' ').trim();
  }

  const images: string[] = content('.splide__slide.m-slide.m-slide--image img')
    .toArray()
    .map((element) => {
      let bestImageSrc: string = element.attribs?.src as string;
      const bestImageSize: number = 0;
      for (const src of (element.attribs?.srcset as string).split(',')) {
        const parts = src.split(' ').map((part) => part.trim());
        if (Number(parts[1]) > bestImageSize) {
          bestImageSrc = parts[0] as string;
        }
      }

      return bestImageSrc;
    })
    .filter((image) => image && image.length > 4)
    .map((image) => image.split('?')[0] as string);

  const description = NodeHtmlMarkdown.translate(
    (content('.prose').html() || '').split('h2').join('h3')
  );

  // Create the Animal.
  const data = {
    name,
    species,
    status,
    description,
    source: reference,
    sex,
    breed,
    colour,
    friendlyToCats,
    friendlyToDogs,
    friendlyToHumans,
    locationName,
    locationLat,
    locationLng,
    medicalNeeds,
    dateOfBirth,
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

  for (const image of images) {
    const imageUrl =
      image.indexOf('://') === -1 ? `${BASE_URL}${image}` : image;

    // Don't save placeholder images.
    if (imageUrl.indexOf('public/default_images') !== -1) {
      continue;
    }

    data.images.push({
      url: imageUrl,
      source: imageUrl,
    });
  }

  // Success!
  return data;
}
