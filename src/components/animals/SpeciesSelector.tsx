import { AnimalSpecies, AnimalStatusType } from '@prisma/client';
import Link from 'next-intl/link';
import React from 'react';
import { GiCat, GiRabbit, GiSittingDog as GiDog } from 'react-icons/gi';

function AnimalSelectorOption(props: { species: string }) {
  const className = 'inline-block text-5xl text-black group-hover:text-white';
  let icon: React.ReactNode;

  if (props.species === AnimalSpecies.CAT) {
    icon = <GiCat className={className} />;
  }

  if (props.species === AnimalSpecies.DOG) {
    icon = <GiDog className={className} />;
  }

  if (props.species === AnimalSpecies.RABBIT) {
    icon = <GiRabbit className={className} />;
  }

  return (
    <Link
      href={`/animals?species=${props.species}&status=${AnimalStatusType.REHOMING}`}
      className="block p-10 rounded-xl relative overflow-hidden text-center hover:bg-primary bg-neutral-500 hover:text-white"
    >
      {icon}
      <h4 className="pt-2 mb-1 text-2xl font-bold">View {props.species}</h4>
      <p>View the collection of {props.species}.</p>
    </Link>
  );
}

export default function SpeciesSelector() {
  return (
    <div className="mt-6 px-4 mx-auto">
      <div className="grid grid-cols-3 gap-4">
        {Object.keys(AnimalSpecies).map((species) => (
          <AnimalSelectorOption key={species} species={species} />
        ))}
      </div>
    </div>
  );
}
