import { NextResponse } from 'next/server';

import Battersea from '@/lib/processors/battersea';
import Bluecross from '@/lib/processors/bluecross';
import DogsTrust from '@/lib/processors/dogs-trust';
import Nawt from '@/lib/processors/nawt';
import Rspca from '@/lib/processors/rspca';
import { AnimalSpecies } from '@prisma/client';

export const processors = {
  battersea: Battersea,
  bluecross: Bluecross,
  'dogs-trust': DogsTrust,
  nawt: Nawt,
  rspca: Rspca,
} as const;

export async function GET(
  request: Request,
  context: { params: { processor: string, species: AnimalSpecies } }
) {
  const { processor, species } = context.params;
  if (!(processor in processors) || !(species in AnimalSpecies)) {
    return NextResponse.json({
      ok: false,
    });
  }

  const result = await processors[processor as keyof typeof processors](species);

  return NextResponse.json({
    ok: true,
    result,
  });
}
