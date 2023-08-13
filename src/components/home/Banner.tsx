import { AnimalMediaType, AnimalSpecies, AnimalStatusType } from '@prisma/client';
import Link from 'next-intl/link';
import type { ReactNode } from 'react';
import Image from '../core/Image';
import GetUrlForAnimalMedia from '@/lib/GetUrlForAnimalMedia';
import { getAnimals } from '@/app/api/animals/route';

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

export default async function Banner() {
  const species = new Date().getDay() % 2 === 0
    ? AnimalSpecies.DOG
    : AnimalSpecies.CAT;

  const animals = (await getAnimals({
    where: {species},
    take: 1,
  })).animals;
  const animal = animals.pop();
  const image = animal?.media.filter(
    (media) => media.type === AnimalMediaType.IMAGE
  )[0]?.location ?? process.env.NEXT_PUBLIC_DEFAULT_ANIMAL_IMAGE!;

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
        {animal && <div className="w-5/12 lg:w-6/12 pt-4 text-center">
          <Link
            href={`/animals/${animal.id}`}
            className="z-20 relative rotate-3 block hover:scale-125 hover:rotate-12 transition duration-500"
          >
            <Image
              src={GetUrlForAnimalMedia(image)}
              alt={`${animal.name} the ${species === AnimalSpecies.CAT ? 'Cat' : 'Dog'}`}
              className="block mx-auto rounded-3xl border filter shadow"
              width={400}
              height={400}
            />
            <span className="block mt-3 text-2xl z-40">
              {species === AnimalSpecies.CAT ? 'Cat' : 'Dog'} of the Day:{' '}
              <strong className="font-bold text-secondary">{animal.name}</strong>
            </span>
          </Link>
        </div>}
      </div>
    </header>
  );
}
