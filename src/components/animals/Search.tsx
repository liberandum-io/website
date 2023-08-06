import type { Animal } from '@prisma/client';
import { AnimalSpecies } from '@prisma/client';
import Link from 'next-intl/link';

import AnimalListings from './AnimalListings';
import AnimalListingsEmpty from './AnimalListingsEmpty';
import PagingButtons from './PagingButtons';
import SearchFilter from './SearchFilter';
import { GetAnimalsSchema } from '@/lib/validations/animals';
import { GetAnimalsResponse } from '@/app/api/animals/route';

type Filters =
  | 'species'
  | 'breed'
  | 'age'
  | 'gender'
  | 'color'
  | 'size'
  | 'location'
  | 'status';

type SearchProps = {
  animals: GetAnimalsResponse['animals'];
  filters: Partial<Record<Filters, string[]>>;
  query: GetAnimalsSchema;
  page: number;
  perPage: number;
  resultCount: number;
};
export default function Search(props: SearchProps) {
  return (
    <section className="mt-6">
      <div className="flex lg:flex-row-reverse flex-col-reverse gap-8 lg:gap-4">
        <div className="w-full lg:w-8/12 xl:w-9/12 md:pl-2">
          {props.animals.length < 1 ? (
            <AnimalListingsEmpty />
          ) : (
            <AnimalListings animals={props.animals} />
          )}
          {props.animals.length > 0 ? (
            <div className="flex my-4">
              <div className="w-full bg-neutral-500 px-3 py-3 rounded">
                <nav className="flex justify-between">
                  <div className="flex items-center space-x-4">
                    <PagingButtons
                      query={{}}
                      page={props.page}
                      perPage={props.perPage}
                      count={props.resultCount}
                    />
                  </div>
                </nav>
              </div>
            </div>
          ) : null}
        </div>
        <div className="w-full lg:w-4/12 xl:w-3/12 mt-0">
          <aside className="space-y-4">
            {Object.keys(props.filters).length > 0 ? (
              <div className="bg-neutral-500 px-8 py-8">
                <h5 className="pb-2 border-b mb-4 font-bold text-lg ">
                  Filter
                </h5>
                <form className="search-form">
                  <ul>
                    {Object.keys(props.filters).map((filterName) => (
                      <li key={filterName}>
                        <SearchFilter
                          name={filterName}
                          options={(props as any).filters[filterName] as any}
                        />
                      </li>
                    ))}
                  </ul>
                </form>
              </div>
            ) : null}
            <div className="p-8 bg-neutral-500">
              <h5 className="pb-2 border-b mb-8 font-bold text-lg ">Species</h5>
              <ul>
                {Object.keys(AnimalSpecies).map((species) => (
                  <li
                    key={species}
                    className="border-b pb-3 mb-3 chevron-left relative"
                  >
                    <Link
                      href={`/animals?species=${species}`}
                      className="font-bold hover:text-secondary"
                    >
                      {species}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
