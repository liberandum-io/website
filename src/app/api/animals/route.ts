import type { AnimalSex, AnimalSpecies, AnimalStatusType, Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import type { z } from 'zod';

import db from '@/lib/prisma';
import { GetAnimals } from '@/lib/validations/animals';

export type GetAnimalsResponse = Awaited<ReturnType<typeof getAnimals>>;

export interface GetAnimalsInput
  extends Pick<
    Prisma.AnimalFindManyArgs,
    'where' | 'orderBy' | 'skip' | 'take'
  > {}

async function getAnimalsFromDb({
  where,
  orderBy,
  skip = 0,
  take = 100,
}: GetAnimalsInput) {
  return {
    skip,
    take,
    count: await db.animal.count({ where }),
    animals: await db.animal.findMany({
      take,
      skip,
      include: {
        media: true,
        relationships: {
          include: {
            partner: true,
          },
        },
      },
      where,
      orderBy,
    }),
  };
}

function getAsArray<T>(input: T|T[]): T[] {
  if (Array.isArray(input)) {
    return input;
  }

  return [input];
}

export async function getQueryFromInput(
  input: z.infer<typeof GetAnimals>
): Promise<GetAnimalsInput> {
  // Validate input - very important for security
  const data = GetAnimals.parse(input) || {};

  const query: GetAnimalsInput = {
    where: {},
    orderBy: {},
  };

  if (data.orderBy) {
    query.orderBy = data.orderBy;
  }

  if (typeof data.take === 'number') {
    query.take = data.take;
  }

  if (typeof data.skip === 'number') {
    query.skip = data.skip;
  }

  // Stop typescript getting upset.
  if (!query.where) {
    return query;
  }

  if (data.where?.notId) {
    query.where.id = {
      notIn: data.where.notId,
    };
  }
  if (data.where?.name) {
    query.where.name = {
      contains: data.where.name,
    };
  }
  if (data.where?.distance) {
    // @todo: Prisma doesn't support this natively yet :(
    const animalsInRange = await db.$queryRaw<
      { id: string }[]
    >`SELECT id FROM Animal WHERE ST_Distance_Sphere(POINT(${data.where.distance.latitude}, ${data.where.distance.longitude}), POINT(locationLat, locationLng))`;

    query.where.id = {
      in: animalsInRange.map((row) => row.id),
    };
  }
  if (data.where?.source) {
    query.where.source = {
      in: data.where.source,
    };
  }
  if (data.where?.sourcePrefix) {
    query.where.source = {
      startsWith: data.where.sourcePrefix,
    };
  }
  if (data.where?.species) {
    query.where.species = {
      in: getAsArray<AnimalSpecies>(data.where.species),
    };
  }
  if (data.where?.status) {
    query.where.status = {
      in: getAsArray<AnimalStatusType>(data.where.status),
    };
  }
  if (data.where?.sex) {
    query.where.sex = {
      in: getAsArray<AnimalSex>(data.where.sex),
    };
  }
  if (data.where?.breed) {
    query.where.breed = {
      in: getAsArray<string>(data.where.breed),
    };
  }
  if (data.where?.colour) {
    query.where.OR = getAsArray<string>(data.where.colour).map((colour: string) => ({
      colour: {
        contains: colour,
      },
    }));
  }
  if (data.where?.medicalNeeds === true || data.where?.medicalNeeds === "true") {
    query.where.medicalNeeds = true;
  }
  if (data.where?.medicalNeeds === false || data.where?.medicalNeeds === "false") {
    query.where.medicalNeeds = false;
  }

  if (data.where?.friendlyToCats === true || data.where?.friendlyToCats === "true") {
    query.where.friendlyToCats = true;
  }
  if (data.where?.friendlyToCats === false || data.where?.friendlyToCats === "false") {
    query.where.friendlyToCats = { not: true };
  }
  if (data.where?.friendlyToDogs === true || data.where?.friendlyToDogs === "true") {
    query.where.friendlyToDogs = true;
  }
  if (data.where?.friendlyToDogs === false || data.where?.friendlyToDogs === "false") {
    query.where.friendlyToDogs = { not: true };
  }
  if (typeof data.where?.friendlyToHumans === 'number') {
    query.where.friendlyToHumans =
      data.where.friendlyToHumans < 1
        ? 0
        : { lte: data.where.friendlyToHumans };
  }

  return query;
}

export async function getAnimals(params: z.infer<typeof GetAnimals>) {
  const query = await getQueryFromInput(params);
  return await getAnimalsFromDb(query);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const params = {
    ...(Object.fromEntries(searchParams) as any),
    where: Object.fromEntries(searchParams) as any,
  };

  return NextResponse.json(await getAnimals(params));
}
