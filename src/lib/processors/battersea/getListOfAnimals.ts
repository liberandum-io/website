import type { BatterseaAnimal } from './config';
import { BASE_URL } from './config';

export default async function getListOfAnimals(
  url: string
): Promise<BatterseaAnimal[]> {
  const response = await fetch(`${BASE_URL}${url}`);
  const body: any = await response.json();

  if (!body || !body.animals || body.animals.length < 1) {
    throw new Error('Failed to get animals from Battersea API');
  }

  return body.animals;
}
