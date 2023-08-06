import type { AnimalSpecies, Partner } from '@prisma/client';
import { PartnerType } from '@prisma/client';

import upsertAnimal from '@/app/api/animals/upsertAnimal';
import {
  createPartner,
  getPartnerByWebsite,
  getPartnersByParentId,
} from '@/app/api/partners/route';

import { BASE_URL, FRIENDLY_NAME, PARTNER_MAP, SEARCHES } from './config';
import getAnimalDetails from './getAnimalDetails';
import getListOfAnimals from './getListOfAnimals';

export default async function Nawt() {
  // Load the Config for this partner.
  let rootPartner = await getPartnerByWebsite(BASE_URL);
  if (!rootPartner) {
    rootPartner = await createPartner({
      ...PARTNER_MAP.default,
      type: PartnerType.CHARITY,
    });
  }

  const partnersByEmail: Record<string, Partner> = {
    root: rootPartner,
  };

  for (const partner of await getPartnersByParentId(rootPartner.id)) {
    partnersByEmail[partner.email!] = partner;
  }

  for (const branch of Object.values(PARTNER_MAP)) {
    if (partnersByEmail[branch.email] || branch.name === FRIENDLY_NAME) {
      continue;
    }

    // Create a branch partner.
    partnersByEmail[branch.email] = await createPartner({
      ...branch,
      parentId: rootPartner.id,
      type: PartnerType.CHARITY,
    });
  }

  // Process each supported species.
  const result: Partial<Record<AnimalSpecies, number>> = {};
  for (const url of Object.keys(SEARCHES) as (keyof typeof SEARCHES)[]) {
    const species: AnimalSpecies = SEARCHES[url];
    result[species] = 0;

    // Get outline data from source.
    const animals = await getListOfAnimals(url);

    // Process each animal.
    for (const animal of animals) {
      try {
        const details = await getAnimalDetails(
          species,
          animal,
          partnersByEmail
        );
        await upsertAnimal(details);

        result[species]!++;
      } catch (e) {
        console.warn(e);
      }
    }
  }

  return result;
}
