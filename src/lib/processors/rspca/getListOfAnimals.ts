import { load as cheerioLoad } from 'cheerio';

import type { RspcaAnimal } from './config';
import { SEARCH_DEFAULT_PARAMS, SEARCH_URL } from './config';
import rspcaFetch from './rspcaFetch';

async function getListOfAnimalsBySearchSetting(
  searchSetting: Readonly<Record<string, string>>,
  cookies: string
): Promise<RspcaAnimal[]> {
  // Each URL is an animal.
  const animals: RspcaAnimal[] = [];

  // Load all the pages to scrap the URLs.
  let page = 1;
  let validLinksCount = 0;
  do {
    // Load the page.
    validLinksCount = 0;
    const response = await rspcaFetch(
      SEARCH_URL,
      {
        ...SEARCH_DEFAULT_PARAMS,
        ...searchSetting,
      },
      cookies
    );
    const body = await response.text();
    const content = cheerioLoad(body);
    const links = content('a.detailLink').toArray();

    for (const link of links) {
      const href = content(link).attr('href');
      console.log(href);
      if (!href || href.startsWith('/findapet/')) {
        continue;
      }
      const name = cheerioLoad(link)('.themeTxtSmBd.themeDarkTxt')
        .text()
        .replace(/\s+/, ' ')
        .trim();

      ++validLinksCount;
      animals.push({
        name,
        url: href,
      });
    }

    ++page;
  } while (page < 30 && validLinksCount);

  return animals;
}

export default async function getListOfAnimals(
  searchSettings: Readonly<Record<string, string>[]>,
  cookies: string
): Promise<RspcaAnimal[]> {
  const animals: RspcaAnimal[] = [];

  for (const searchSetting of searchSettings) {
    try {
      animals.push(
        ...(await getListOfAnimalsBySearchSetting(searchSetting, cookies))
      );
    } catch (e) {
      console.error(e);
    }
  }

  return animals;
}
