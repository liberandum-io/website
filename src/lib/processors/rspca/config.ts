import { AnimalSpecies } from '@prisma/client';

export const BASE_URL = 'https://www.rspca.org.uk';
export const FRIENDLY_NAME = 'RSPCA';
export const SEARCH_URL = `${BASE_URL}/findapet?p_p_id=petSearch2016_WAR_ptlPetRehomingPortlets&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_petSearch2016_WAR_ptlPetRehomingPortlets_action=search`;
export const SEARCH_DEFAULT_PARAMS = {
  location: 'LS141AH',
  postcode: 'LS141AH',
  searchedLongitude: '-1.4709758',
  searchedLatitude: '53.83750740000001',
} as const;
export const DEFAULT_PHONE_NUMBER = '+443001230346';

export const SEARCHES = {
  // This breaks up large results into smaller
  //     manageable ones so that we don't break
  //     the max 150 search results limit.

  // Dogs
  [AnimalSpecies.DOG]: [
    {
      animalType: 'DOG',
      'sizeFilters%5B0%5D.selected': 'true',
      'sizeFilters%5B0%5D.name': 'Very Large',
    },
    {
      animalType: 'DOG',
      'sizeFilters%5B0%5D.selected': 'true',
      'sizeFilters%5B0%5D.name': 'Large',
    },
    {
      animalType: 'DOG',
      'sizeFilters%5B0%5D.selected': 'true',
      'sizeFilters%5B0%5D.name': 'Medium',
    },
    {
      animalType: 'DOG',
      'sizeFilters%5B0%5D.selected': 'true',
      'sizeFilters%5B0%5D.name': 'Small',
    },
    {
      animalType: 'DOG',
      'sizeFilters%5B0%5D.selected': 'true',
      'sizeFilters%5B0%5D.name': 'Unclassified',
    },
  ],

  // Cats
  [AnimalSpecies.CAT]: [
    {
      animalType: 'CAT',
      'ageFilters%5B0%5D.selected': 'true',
      'ageFilters%5B0%5D.name': 'Kitten',
    },
    {
      animalType: 'CAT',
      'ageFilters%5B0%5D.selected': 'true',
      'ageFilters%5B0%5D.name': 'Juvenile',
      'sexFilters%5B1%5D.selected': 'true',
      'sexFilters%5B1%5D.name': 'Male',
    },
    {
      animalType: 'CAT',
      'ageFilters%5B0%5D.selected': 'true',
      'ageFilters%5B0%5D.name': 'Juvenile',
      'sexFilters%5B1%5D.selected': 'true',
      'sexFilters%5B1%5D.name': 'Female',
    },
    {
      animalType: 'CAT',
      'ageFilters%5B0%5D.selected': 'true',
      'ageFilters%5B0%5D.name': 'Juvenile',
      'sexFilters%5B1%5D.selected': 'true',
      'sexFilters%5B1%5D.name': 'Various',
    },
    {
      animalType: 'CAT',
      'ageFilters%5B0%5D.selected': 'true',
      'ageFilters%5B0%5D.name': 'Adult',
      'sexFilters%5B1%5D.selected': 'true',
      'sexFilters%5B1%5D.name': 'Male',
    },
    {
      animalType: 'CAT',
      'ageFilters%5B0%5D.selected': 'true',
      'ageFilters%5B0%5D.name': 'Adult',
      'sexFilters%5B1%5D.selected': 'true',
      'sexFilters%5B1%5D.name': 'Female',
    },
    {
      animalType: 'CAT',
      'ageFilters%5B0%5D.selected': 'true',
      'ageFilters%5B0%5D.name': 'Adult',
      'sexFilters%5B1%5D.selected': 'true',
      'sexFilters%5B1%5D.name': 'Various',
    },
    {
      animalType: 'CAT',
      'ageFilters%5B0%5D.selected': 'true',
      'ageFilters%5B0%5D.name': 'Unknown',
    },
    {
      animalType: 'CAT',
      'ageFilters%5B0%5D.selected': 'true',
      'ageFilters%5B0%5D.name': 'Various',
    },
  ],

  // Rabbits
  [AnimalSpecies.RABBIT]: [
    {
      animalType: 'RABT',
      'sexFilters%5B0%5D.selected': 'true',
      'sexFilters%5B0%5D.name': 'Male',
    },
    {
      animalType: 'RABT',
      'sexFilters%5B0%5D.selected': 'true',
      'sexFilters%5B0%5D.name': 'Female',
    },
    {
      animalType: 'RABT',
      'sexFilters%5B0%5D.selected': 'true',
      'sexFilters%5B0%5D.name': 'Various',
    },
    {
      animalType: 'RABT',
      'sexFilters%5B0%5D.selected': 'true',
      'sexFilters%5B0%5D.name': 'Unknown',
    },
  ],
  /*
    // Birds
    [AnimalSpecies.BIRD]: [{animalType: 'BIRD'}],

    // Farm
    farm: [{animalType: 'FARM'}],

    // GUINEA PIGS
    guineaPigs: [{animalType: 'GUINEA'}],

    // SMALL FURRIES
    furry: [{animalType: 'FURRY'}],

    // FERRETS
    ferrets: [{animalType: 'FERRET'}],

    // REPTILES
    reptiles: [{animalType: 'REPTILE'}],

    // FISHES
    fish: [{animalType: 'FISH'}],
*/
} as const;

export const PARTNER_MAP = {
  default: {
    name: FRIENDLY_NAME,
    locationName: 'RSPCA, Parkside, Chart Way, Horsham, West Sussex, RH12 1GY',
    locationLat: 51.064239733,
    locationLng: -0.32519601612,
    phone: DEFAULT_PHONE_NUMBER,
    website: `${BASE_URL}`,
    email: 'reception@nawt.org.uk',
  },
} as const;

export type RspcaAnimal = {
  name: string;
  url: string;
};
