import type { AnimalSpecies } from '@prisma/client';
import { PartnerType } from '@prisma/client';

import upsertAnimal from '@/app/api/animals/upsertAnimal';
import {
  createPartner,
  getPartnerByWebsite,
  getPartnersByParentId,
} from '@/app/api/partners/route';

import { BASE_URL, PARTNER_MAP, SEARCHES } from './config';
import getAnimalDetails from './getAnimalDetails';
import getBranches from './getBranches';
import getListOfAnimals from './getListOfAnimals';

export default async function DogsTrust() {
  // Load the Config for this partner.
  let rootPartner = await getPartnerByWebsite(BASE_URL);
  if (!rootPartner) {
    rootPartner = await createPartner({
      ...PARTNER_MAP.default,
      type: PartnerType.CHARITY,
    });
  }

  const partnersByWebsite = {
    [rootPartner.website!]: rootPartner,
  };

  for (const partner of await getPartnersByParentId(rootPartner.id)) {
    partnersByWebsite[partner.website!] = partner;
  }

  for (const branch of await getBranches()) {
    if (partnersByWebsite[branch.website]) {
      continue;
    }

    // Create a branch partner.
    partnersByWebsite[branch.website] = await createPartner({
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
    console.log("Getting " + url);
    const animals = await getListOfAnimals(url);

    // Process each animal.
    for (const animal of animals) {
      console.log("Updating " + animal.url);
      await upsertAnimal(
        await getAnimalDetails(species, animal, partnersByWebsite)
      );

      result[species]++;
    }
  }

  return result;
}
