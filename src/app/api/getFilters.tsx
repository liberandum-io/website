import type { Prisma } from '@prisma/client';
import { AnimalStatusType } from '@prisma/client';
import type { z } from 'zod';

import db from '@/lib/prisma';
import type { GetAnimals } from '@/lib/validations/animals';

import { getQueryFromInput } from '@/app/api/animals/route';

interface GetAnimalsInput
  extends Pick<
    Prisma.AnimalFindManyArgs,
    'where' | 'orderBy' | 'skip' | 'take'
  > {}

export type FilterData = {
  [key: string]: number;
};

export type GetFiltersData = {
  [key: string]: FilterData;
};

async function getFiltersByColumn(
  { where }: GetAnimalsInput,
  column: Prisma.AnimalScalarFieldEnum
): Promise<FilterData> {
  const result: FilterData = {};
  const rows = await db.animal.groupBy({
    by: [column],
    where,
    _count: true,
  });

  for (const row of rows) {
    // eslint-disable-next-line no-underscore-dangle
    result[row[column] ? `${row[column]}` : 'Unknown'] = row._count;
  }

  return result;
}

function tidyColours(colours: FilterData): FilterData {
  const result: FilterData = {};

  for (const key of Object.keys(colours)) {
    for (const colour of key.split('/')) {
      const safeColour = colour.replace(/\s+/g, ' ').trim().toLowerCase();
      if (!result[safeColour]) {
        result[safeColour] = 0;
      }

      result[safeColour] += colours[key] as number;
    }
  }

  return result;
}

/**
 * Converts true|false|Unknown to just true and false by
 * assuming that Unknown is part of another option.
 * @param data FilterData
 * @returns FilterData
 */
function tidyFriendlyness(data: FilterData, defaultOption: string): FilterData {
  const result: FilterData = {};

  for (const key of Object.keys(data)) {
    const filterKey = key === 'Unknown' ? defaultOption : key;
    if (!result[filterKey]) {
      result[filterKey] = 0;
    }
    result[filterKey] += data[key] as number;
  }

  return result;
}

async function getFiltersQuery({
  where,
}: GetAnimalsInput): Promise<GetFiltersData> {
  const status = getFiltersByColumn({ where }, 'status');
  const friendlyToCats = getFiltersByColumn({ where }, 'friendlyToCats');
  const friendlyToDogs = getFiltersByColumn({ where }, 'friendlyToDogs');
  const friendlyToHumans = getFiltersByColumn({ where }, 'friendlyToHumans');
  const medicalNeeds = getFiltersByColumn({ where }, 'medicalNeeds');
  const sex = getFiltersByColumn({ where }, 'sex');
  const breed = getFiltersByColumn({ where }, 'breed');
  const colour = getFiltersByColumn({ where }, 'colour');
  // const distance: FilterData = {
  //     "5": 1,
  //     "10": 1,
  //     "25": 1,
  //     "50": 1,
  //     "100": 1,
  // };

  return {
    status: await status,
    // distance, // @todo not ready yet
    friendlyToCats: tidyFriendlyness(await friendlyToCats, 'false'),
    friendlyToDogs: tidyFriendlyness(await friendlyToDogs, 'false'),
    friendlyToHumans: tidyFriendlyness(await friendlyToHumans, '18'),
    medicalNeeds: await medicalNeeds,
    sex: await sex,
    breed: await breed,
    colour: tidyColours(await colour),
  };
}

export default async function getFilters(
  input: z.infer<typeof GetAnimals>
): Promise<GetFiltersData> {
  const query: GetAnimalsInput = await getQueryFromInput(input);

  // A species must be provided for us to do the groupings.
  if (!query?.where?.species) {
    return {};
  }

  if (!query?.where?.status) {
    query.where.status = { not: AnimalStatusType.UNKNOWN };
  }

  const filters = await getFiltersQuery(query);

  // Remove filters where they wouldn't make a difference.
  for (const key of Object.keys(filters)) {
    if (Object.values(filters[key] as FilterData).length < 2) {
      delete filters[key];
    }
  }

  return filters;
}
