import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import type { CreatePartnerSchema } from '@/lib/validations/partners';

export async function getPartnersByParentId(parentId: string | null) {
  return prisma.partner.findMany({
    where: {
      parentId,
    },
  });
}

export async function getPartnerByWebsite(website: string) {
  return prisma.partner.findUnique({
    where: {
      website,
    },
  });
}

export async function createPartner(data: CreatePartnerSchema) {
  return prisma.partner.create({
    data: {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const parentId = searchParams.get('parentId');

  return NextResponse.json(
    await getPartnersByParentId(
      typeof searchParams.get('parentId') === 'string' ? parentId : null
    )
  );
}
