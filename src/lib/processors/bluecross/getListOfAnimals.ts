import type { BluecrossAnimal } from './config';
import { BASE_URL } from './config';

export default async function getListOfAnimals(
  url: string
): Promise<BluecrossAnimal[]> {
  const response = await fetch(`${BASE_URL}${url}`);
  const body: any = await response.json();

  if (!body || !body.results || body.results.length < 1) {
    throw new Error('Failed to get animals from Bluecross API');
  }

  return body.results;
}
