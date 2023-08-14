import { AnimalSpecies } from '@prisma/client';
import { PartnerType } from '@prisma/client';
import { PromisePool } from '@supercharge/promise-pool';

import upsertAnimal from '@/app/api/animals/upsertAnimal';
import {
  createPartner,
  getPartnerByWebsite,
  getPartnersByParentId,
} from '@/app/api/partners/route';

import { BASE_URL, PARTNER_MAP, SEARCHES } from './config';
import getAnimalDetails from './getAnimalDetails';
import getListOfAnimals from './getListOfAnimals';

export default async function Bluecross(species: AnimalSpecies) {
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

  for (const branch of Object.values(PARTNER_MAP)) {
    if (partnersByWebsite[branch.website!] || branch.name === 'Bluecross') {
      continue;
    }

    // Create a branch partner.
    partnersByWebsite[branch.website!] = await createPartner({
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
    await PromisePool
      .withConcurrency(3)
      .for(animals)
      .process(async (animal) => {
        await upsertAnimal(
          await getAnimalDetails(urlSpecies, animal, partnersByWebsite)
        );

        result.animals++;
      });
  }

  return result;
}
