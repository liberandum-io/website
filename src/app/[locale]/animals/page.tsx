import getFilters from '@/app/api/getFilters';
import Search from '@/components/animals/Search';
import SpeciesSelector from '@/components/animals/SpeciesSelector';
import PageBody from '@/components/layouts/PageBody';
import PageTitle from '@/components/layouts/PageTitle';

import { getAnimals } from '../../api/animals/route';
import { Metadata } from 'next';
import { GetAnimals } from '@/lib/validations/animals';

const ITEMS_PER_PAGE = 20;

type AnimalsPageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata: Metadata = {
  title: 'Animals | Liberandum',
  description:
    'Find animals near you, or search for specific animals, perfect for rehoming and adoption.',
};

export default async function AnimalsPage(props: AnimalsPageProps) {
  const input = GetAnimals.parse({
    ...props.searchParams,
    where: {
      ...props.searchParams,
    },
  }) || {};
  const breadcrumbs = [
    { title: 'Home', link: '/' },
    { title: 'Animals', link: '/animals' },
  ];

  if (typeof input.where?.species !== 'string') {
    return (
      <>
        <PageTitle title="Animals" breadcrumbs={breadcrumbs} />
        <PageBody>
          <SpeciesSelector />
        </PageBody>
      </>
    );
  }

  breadcrumbs.push({
    title: input.where.species,
    link: `/animals?species=${input.where.species}`,
  });

  const filters = await getFilters({
    where: {
      species: input.where.species,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: ITEMS_PER_PAGE,
    skip: 0,
  });

  const results = await getAnimals({
    ...props.searchParams,
    where: props.searchParams,
  });

  return (
    <>
      <PageTitle title="Animals" breadcrumbs={breadcrumbs} />
      <PageBody>
        <Search
          page={Math.floor(results.skip / results.take)}
          perPage={results.take}
          filters={filters}
          animals={results.animals}
          query={input}
          resultCount={results.count}
        />
      </PageBody>
    </>
  );
}
