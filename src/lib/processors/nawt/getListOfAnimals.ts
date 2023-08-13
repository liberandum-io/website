import { AnimalSex, AnimalStatusType } from '@prisma/client';
import { load as cheerioLoad } from 'cheerio';

import type { NawtAnimal } from './config';
import { BASE_URL } from './config';

function getDateOfBirth(details: string | undefined): Date | undefined {
  if (details === undefined) {
    return undefined;
  }

  const dobParts = details.match(/((\d+)\s+years?\s+(\d+)\smonths?)/);

  if (!dobParts) {
    return undefined;
  }

  const dob = new Date();
  dob.setMonth(
    dob.getMonth() - (Number(dobParts[2]) * 12 + Number(dobParts[3]))
  );

  return dob;
}

function getSex(html: string | undefined) {
  if (html === undefined) {
    return undefined;
  }

  if (html.includes('Female')) {
    return AnimalSex.FEMALE;
  }

  if (html.includes('Male')) {
    return AnimalSex.MALE;
  }

  return undefined;
}

function getDogFriendly(html: string | undefined): boolean | undefined {
  if (html === undefined) {
    return undefined;
  }

  if (html.includes('Not dog friendly')) {
    return false;
  }

  if (html.includes('Dog friendly')) {
    return true;
  }

  return undefined;
}

function getCatFriendly(html: string | undefined): boolean | undefined {
  if (html === undefined) {
    return undefined;
  }

  if (html.includes('Not cat friendly')) {
    return false;
  }

  if (html.includes('Cat friendly')) {
    return true;
  }

  return undefined;
}

function getHumanFriendly(html: string | undefined): number | undefined {
  if (html === undefined) {
    return undefined;
  }

  if (html.includes('Is child friendly')) {
    return 4;
  }

  return undefined;
}

export default async function getListOfAnimals(
  url: string
): Promise<NawtAnimal[]> {
  // Each URL is an animal.
  const animals: NawtAnimal[] = [];

  // Load all the pages to scrap the URLs.
  let page = 1;
  let validLinksCount = 0;
  do {
    // Load the page.
    validLinksCount = 0;
    const response = await fetch(`${BASE_URL}${url}?page=${page}`, { next: { revalidate: 3600 } });
    const body = await response.text();
    const content = cheerioLoad(body);
    const animalBlocks = content('.page-cards__card.medium').toArray();

    // Get the animals.
    for (const animalBlock of animalBlocks) {
      const animalContent = cheerioLoad(animalBlock);
      const animalContentHtml = animalContent.html();
      const name = animalContent('.page-cards__pet-info__primary h3').html()!;
      const status = animalContent('.page-cards__pet-info__primary p').html()!;
      const link = animalContent('a.page-cards__image')[0];
      const details = animalContent('p:not([class])');
      const breed = (details.html()?.split('<br />')[1] ?? '')
        .replace(/\s+/, ' ')
        .trim();
      const href = link.attribs?.href;
      if (!href) {
        continue;
      }

      ++validLinksCount;
      animals.push({
        name,
        status: status.includes('available')
          ? AnimalStatusType.REHOMING
          : AnimalStatusType.RESERVED,
        url: href.indexOf(BASE_URL) === 0 ? href.split(BASE_URL)[1] : href,
        sex: getSex(details.html() ?? undefined),
        dateOfBirth: getDateOfBirth(details.html() ?? undefined),
        catFriendly: getCatFriendly(animalContentHtml ?? undefined),
        dogFriendly: getDogFriendly(animalContentHtml ?? undefined),
        humanFriendly: getHumanFriendly(animalContentHtml ?? undefined),
        breed: breed === '' ? undefined : breed,
        images: [],
      });
    }

    ++page;
  } while (page < 30 && validLinksCount);

  return animals;
}
