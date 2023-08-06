import { AnimalSpecies } from '@prisma/client';

export const BASE_URL = 'https://www.battersea.org.uk';
export const FRIENDLY_NAME = 'Battersea';
export const DEFAULT_PHONE_NUMBER = '+448000014444';
export const SEARCHES = {
  '/api/animals/cats': AnimalSpecies.CAT,
  '/api/animals/dogs': AnimalSpecies.DOG,
} as const;
export const PARTNER_MAP = {
  default: {
    name: FRIENDLY_NAME,
    locationName: '4 Battersea Park Road, London, SW8 4AA',
    locationLat: 51.47821,
    locationLng: -0.14506,
    phone: DEFAULT_PHONE_NUMBER,
    website: `${BASE_URL}`,
  },
  'old windsor': {
    name: 'Old Windsor',
    locationName:
      'Priest Hill, Old Windsor, Berkshire, SL4 2JN, United Kingdom',
    locationLat: 51.44646,
    locationLng: -0.57376,
    phone: DEFAULT_PHONE_NUMBER,
    website: `${BASE_URL}/about-us/visit-us/visit-battersea-old-windsor`,
  },
  'brands hatch': {
    name: 'Brands Hatch',
    locationName: 'Crowhurst Lane, Ash, Kent, TN15 7HH, United Kingdom',
    locationLat: 51.35818,
    locationLng: 0.28271,
    phone: '+441474875102',
    website: `${BASE_URL}/about-us/visit-us/visit-battersea-brands-hatch`,
  },
  battersea: {
    name: 'London',
    locationName: '4 Battersea Park Road, SW8 4AA, United Kingdom',
    locationLat: 51.47821,
    locationLng: -0.14506,
    phone: DEFAULT_PHONE_NUMBER,
    website: `${BASE_URL}/about-us/visit-us/visit-battersea-london`,
  },
} as const;

export type BatterseaAnimal = {
  field_animal_age: string | undefined;
  field_animal_breed: string | undefined;
  field_animal_cat_suitability: string | undefined;
  field_animal_centre: string | undefined;
  field_animal_child_suitability: string | undefined;
  field_animal_date_published: string | undefined;
  field_animal_dog_suitability: string | undefined;
  field_animal_rehomed: string | undefined;
  field_animal_reserved: string | undefined;
  field_animal_sex: string | undefined;
  field_animal_size: string | undefined;
  flagged: number | undefined;
  nid: number | undefined;
  path: string | undefined;
  sort: string | undefined;
  title: string | undefined;
};
