import AnimalDetails from '@/components/animals/Detail';
import PageBody from '@/components/layouts/PageBody';
import PageTitle from '@/components/layouts/PageTitle';
import GetUrlForAnimalMedia from '@/lib/GetUrlForAnimalMedia';
import prisma from '@/lib/prisma';
import { AnimalMediaType } from '@prisma/client';
import { Metadata, ResolvingMetadata } from 'next';

type AnimalPageProps = {
  params: { animalId: string };
}

async function getAnimal(id: string) {
  return await prisma.animal.findFirstOrThrow({
    where: {
      id,
    },
    include: {
      relationships: true,
      media: true,
    },
  });
}

export async function generateMetadata(
  props: AnimalPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const animal = await getAnimal(props.params.animalId);
  const parentData = await parent;

  const title: string[] = [];
  title.push(animal.name ?? 'View Animal');
  if (animal.species) {
    title.push(animal.species);
  }
  title.push('Animals');
  title.push(parentData.title!.absolute);
 
  return {
    title: title.join(' | '),
  }
}

export default async function AnimalViewPage(props: AnimalPageProps) {
  const animal = await getAnimal(props.params.animalId);
  return (
    <>
      <PageTitle
        title={animal.name || 'View Animal'}
        breadcrumbs={[
          { title: 'Home', link: '/' },
          { title: 'Animals', link: '/animals' },
          {
            title: animal.species,
            link: `/animals?species=${animal.species}`,
          },
          {
            title: animal.name || 'Unknown',
            link: `/animals/${animal.id}`,
          },
        ]}
        image={
          GetUrlForAnimalMedia(animal.media.filter(
            (media) => media.type === AnimalMediaType.IMAGE
          )[0]?.location)
        }
      />
      <PageBody>
        <AnimalDetails animal={animal} />
      </PageBody>
    </>
  );
}
