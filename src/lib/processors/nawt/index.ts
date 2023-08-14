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

export default async function Nawt(species: AnimalSpecies) {
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
  const result = { animals: 0 };
  for (const url of Object.keys(SEARCHES) as (keyof typeof SEARCHES)[]) {
    const urlSpecies = SEARCHES[url];
    if (urlSpecies !== species) {
      continue;
    }

    // Get outline data from source.
    const animals = await getListOfAnimals(url);

    // Process each animal.
    for (const animal of animals) {
      try {
        const details = await getAnimalDetails(
          urlSpecies,
          animal,
          partnersByEmail
        );
        await upsertAnimal(details);

        result.animals++;
      } catch (e) {
        console.warn(e);
      }
    }
  }

  return result;
}
