import prisma from '@/lib/prisma';

export default async function getStats() {
  return {
    animalCount: await prisma.animal.count(),
    mediaCount: await prisma.animalMedia.count(),
    partnerCount: await prisma.partner.count(),
    usersCount: await prisma.user.count(),
  };
}