import type { DogsTrustAnimal } from './config';
import { BASE_URL } from './config';

type DogsTrustAnimalListResponse = {
  data?: {
    results?: {
      results?: DogsTrustAnimal[];
    };
  };
};

const baseRequest = {
  operationName: 'SearchFilterDogs',
  variables: {
    page: 1,
    sort: 'NEW',
    breed: [],
    age: [],
    size: [],
    gender: [],
    centres: [],
    liveWithCats: false,
    liveWithDogs: false,
    liveWithPreschool: false,
    liveWithPrimary: false,
    liveWithSecondary: false,
  },
  query:
    'query SearchFilterDogs($page: Int, $sort: String, $breed: [String], $age: [String], $size: [String], $gender: [String], $centres: [String], $daysSinceAdded: Int, $liveWithCats: Boolean, $liveWithDogs: Boolean, $liveWithPreschool: Boolean, $liveWithPrimary: Boolean, $liveWithSecondary: Boolean, $isPromotedByCentre: Boolean, $searchFrom: PlaceInput) {\n  results: searchFilterDogs(\n    where: {page: $page, sort: $sort, breed: $breed, age: $age, size: $size, gender: $gender, centres: $centres, daysSinceAdded: $daysSinceAdded, liveWithCats: $liveWithCats, liveWithDogs: $liveWithDogs, liveWithPreschool: $liveWithPreschool, liveWithPrimary: $liveWithPrimary, liveWithSecondary: $liveWithSecondary, isPromotedByCentre: $isPromotedByCentre, searchFrom: $searchFrom}\n  ) {\n    totalResults\n    results {\n      key\n      id\n      name\n      url\n      created\n      isPublished\n      gender\n      dob\n      breed\n      isCrossBreed\n      size\n      centreCode\n      status\n      liveWithCats\n      liveWithDogs\n      liveWithPreschool\n      liveWithPrimary\n      liveWithSecondary\n      isPromotedByCentre\n      needsMedicalCare\n      frontEndBreedName\n      isReserved\n      isHomeFromHome\n      media {\n        images {\n          src\n          alt\n          weight\n          isHero\n          caption\n          __typename\n        }\n        videos {\n          url\n          title\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    filterData {\n      breedList {\n        title\n        count\n        __typename\n      }\n      centresList {\n        title\n        count\n        __typename\n      }\n      age\n      size\n      gender\n      liveWithCats\n      liveWithDogs\n      liveWithPreschool\n      liveWithPrimary\n      liveWithSecondary\n      __typename\n    }\n    resultsUrls\n    __typename\n  }\n}\n',
};

export default async function getListOfAnimals(
  url: string
): Promise<DogsTrustAnimal[]> {
  // Each URL is an animal.
  const animals: DogsTrustAnimal[] = [];

  // Load all the pages to scrap the URLs.
  let page = 1;
  do {
    const request = JSON.parse(
      JSON.stringify(baseRequest)
    ) as typeof baseRequest;
    request.variables.page = page;

    // Load the page.
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    const body: DogsTrustAnimalListResponse = await response.json();

    const results = body?.data?.results?.results;

    if (!results || (results.length ?? 0) < 1) {
      break;
    }

    for (const animal of results) {
      animals.push(animal);
    }

    ++page;
  } while (page < 55);

  return animals;
}
