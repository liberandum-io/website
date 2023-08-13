import type { AnimalSpecies, Partner } from '@prisma/client';
import {
  AnimalRelationshipType,
  AnimalSex,
  AnimalStatusType,
} from '@prisma/client';
import { load as cheerioLoad } from 'cheerio';
import { NodeHtmlMarkdown } from 'node-html-markdown';

import type { UpsertAnimalSchema } from '@/lib/validations/animals';

import type { BatterseaAnimal } from './config';
import { BASE_URL, PARTNER_MAP } from './config';

export function getReferenceFromAnimal(animal: BatterseaAnimal): string {
  return `${BASE_URL}${animal.path}`;
}

export default async function processPage(
  species: AnimalSpecies,
  batterseaAnimal: BatterseaAnimal,
  partnersByWebsite: Record<string, Partner>
): Promise<UpsertAnimalSchema> {
  // Validate the URL
  const reference = getReferenceFromAnimal(batterseaAnimal);
  if (!reference) {
    throw new Error('Unable to get reference');
  }

  // Load the Page
  const response = await fetch(reference, { next: { revalidate: 3600 } });
  const body = await response.text();
  const content = cheerioLoad(body);

  let partner = partnersByWebsite[BASE_URL]!;
  const sex: AnimalSex | undefined = {
    female: AnimalSex.FEMALE,
    male: AnimalSex.MALE,
  }[(batterseaAnimal.field_animal_sex || '').toLowerCase()];
  const breed: string | undefined = batterseaAnimal.field_animal_breed;
  const dateOfBirth: Date | undefined = batterseaAnimal.field_animal_age
    ? new Date(batterseaAnimal.field_animal_age)
    : undefined;
  const friendlyToCats: boolean | undefined =
    typeof batterseaAnimal.field_animal_cat_suitability === 'string' &&
    batterseaAnimal.field_animal_cat_suitability[0] === 'A';
  const friendlyToDogs: boolean | undefined =
    typeof batterseaAnimal.field_animal_dog_suitability === 'string' &&
    batterseaAnimal.field_animal_dog_suitability[0] === 'A';
  const friendlyToHumans: number | undefined = {
    A: 1,
    B: 8,
    C: 13,
    D: 18,
  }[batterseaAnimal.field_animal_dog_suitability || ''];
  const medicalNeeds: boolean = false;
  let locationName: string | undefined = partner.locationName || undefined;
  let locationLat: number | undefined = partner.locationLat || undefined;
  let locationLng: number | undefined = partner.locationLng || undefined;
  let status: AnimalStatusType = AnimalStatusType.REHOMING;
  if (batterseaAnimal.field_animal_reserved) {
    status = AnimalStatusType.RESERVED;
  }
  if (batterseaAnimal.field_animal_rehomed) {
    status = AnimalStatusType.REHOMED;
  }

  if (
    (batterseaAnimal.field_animal_centre || '')
      .toLowerCase()
      .indexOf('communities') !== -1
  ) {
    // eslint-disable-next-line no-param-reassign
    batterseaAnimal.field_animal_centre = 'battersea';
  }

  const branchKey =
    batterseaAnimal.field_animal_centre as keyof typeof PARTNER_MAP;
  const branchPartner =
    branchKey in PARTNER_MAP ? PARTNER_MAP[branchKey] : undefined;
  if (!branchPartner) {
    throw new Error('Cannot find partner');
  }

  partner = partnersByWebsite[branchPartner.website];
  locationName = partner.locationName || undefined;
  locationLat = partner.locationLat || undefined;
  locationLng = partner.locationLng || undefined;

  let name: string | undefined = batterseaAnimal.title;
  if (typeof name === 'string') {
    name = `${name[0]}${name.substr(1).toLowerCase()}`.split('(&')[0] as string;
  }

  const images = content('img.slideshow_image')
    .toArray()
    .map((element) => element.attribs?.src);

  console.log({ images })

  const description = NodeHtmlMarkdown.translate(
    content('.animal_additional_details > div').html() || ''
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
