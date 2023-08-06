import { AnimalSpecies, AnimalStatusType } from '@prisma/client';
import Link from 'next-intl/link';
import type { ReactNode } from 'react';

function Button(props: { href: string; children: ReactNode }) {
  return (
    <Link
      href={props.href}
      className="px-5 py-2 xl:px-12 xl:py-4 rounded-full bg-primary text-white font-semibold hover:bg-secondary mb-4 mx-2"
    >
      {props.children}
    </Link>
  );
}

export default function Banner() {
  return (
    <header className="my-20 relative container px-4 mx-auto">
      <div className="flex items-center flex-row">
        <div className="w-7/12 lg:w-6/12 pt-4">
          <div className="section__heading mb-0">
            <h5 className="text-lg font-semibold text-secondary">Our Aim: </h5>
            <h1 className="text-5xl md:text-7xl mt-2 font-black mb-40 md:mb-20">
              Make a better world for animals
              <br />
              <small>(and humans)</small>
            </h1>
            <Button
              href={`/animals?species=${AnimalSpecies.CAT}&status=${AnimalStatusType.REHOMING}`}
            >
              <span className="hidden md:inline">View&nbsp;</span>
              Cats
            </Button>
            <Button
              href={`/animals?species=${AnimalSpecies.DOG}&status=${AnimalStatusType.REHOMING}`}
            >
              <span className="hidden md:inline">View&nbsp;</span>
              Dogs
            </Button>
            <Button
              href={`/animals?species=${AnimalSpecies.RABBIT}&status=${AnimalStatusType.REHOMING}`}
            >
              <span className="hidden md:inline">View&nbsp;</span>
              Rabbits
            </Button>
          </div>
        </div>
        <div className="w-5/12 lg:w-6/12 pt-4 text-center">
          <Link
            href=""
            className="z-20 relative rotate-3 block hover:scale-125 hover:rotate-12 transition duration-500"
          >
            <img
              src="https://imagedelivery.net/GHaKR5yPkym5rFlXe0JpNw/e9918f26-2805-458a-e85a-dd98c3d14900/detail"
              alt="Rusty the Dog"
              className="block mx-auto rounded-3xl border filter shadow"
            />
            <span className="block mt-3 text-2xl z-40">
              Dog of the Day:{' '}
              <strong className="font-bold text-secondary">Rusty</strong>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
