import { NextResponse } from 'next/server';

import Battersea from '@/lib/processors/battersea';
import Bluecross from '@/lib/processors/bluecross';
import DogsTrust from '@/lib/processors/dogs-trust';
import Nawt from '@/lib/processors/nawt';
import Rspca from '@/lib/processors/rspca';

const processors = {
  battersea: Battersea,
  bluecross: Bluecross,
  'dogs-trust': DogsTrust,
  nawt: Nawt,
  rspca: Rspca,
} as const;

export async function GET(
  request: Request,
  context: { params: { processor: string } }
) {
  const { processor } = context.params;
  if (!(processor in processors)) {
    return NextResponse.json({
      ok: false,
    });
  }

  const result = await processors[processor as keyof typeof processors]();

  return NextResponse.json({
    ok: true,
    result,
  });
}
