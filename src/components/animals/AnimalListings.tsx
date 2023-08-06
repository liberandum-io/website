import AnimalListing from './AnimalListing';
import { GetAnimalsResponse } from '@/app/api/animals/route';

type AnimalListingsProps = {
  animals: GetAnimalsResponse['animals'];
};

export default function AnimalListings(props: AnimalListingsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {props.animals.map((animal) => (
        <AnimalListing key={animal.id} animal={animal as any} />
      ))}
    </div>
  );
}
