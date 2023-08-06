import type { AnimalSex, AnimalStatusType } from '@prisma/client';
import { AnimalSpecies } from '@prisma/client';

export const BASE_URL = 'https://www.nawt.org.uk';
export const FRIENDLY_NAME = 'National Animal Welfare Trust';
export const DEFAULT_PHONE_NUMBER = '+442089500177';

export const SEARCHES = {
  '/rehoming/cats': AnimalSpecies.CAT,
  '/rehoming/dogs': AnimalSpecies.DOG,
} as const;

export const PARTNER_MAP = {
  default: {
    name: FRIENDLY_NAME,
    locationName: 'NAWT, Tylers Way, Watford, Hertfordshire, WD25 8WT',
    locationLat: 51.655532919,
    locationLng: -0.3457315898,
    phone: DEFAULT_PHONE_NUMBER,
    website: `${BASE_URL}`,
    email: 'reception@nawt.org.uk',
  },
  bedfordshire: {
    name: 'Bedfordshire',
    locationName:
      'NAWT, Glebe Farm, Salford Road, Milton Keynes Bedfordshire, MK17 8HZ',
    locationLat: 52.0278809,
    locationLng: -0.633313074,
    phone: '+441908584000',
    website: `${BASE_URL}/our-services/our-centres/nawt-bedfordshire/`,
    email: 'beds.reception@nawt.org.uk',
  },
  berkshire: {
    name: 'Berkshire',
    locationName:
      'NAWT, Trindledown Farm, Wantage Road, Great Shefford, Berkshire, RG17 7DQ',
    locationLat: 51.49411563,
    locationLng: -1.4348938477,
    phone: '+441488638584',
    website: `${BASE_URL}/our-services/our-centres/nawt-berkshire/`,
    email: 'td.reception@nawt.org.uk',
  },
  cornwall: {
    name: 'Cornwall',
    locationName: 'NAWT, Wheal Alfred Kennels, Wheal Alfred Rd, Hayle TR27 5JT',
    locationLat: 50.18283771,
    locationLng: -5.39808271,
    phone: '+441736756005',
    website: `${BASE_URL}/our-services/our-centres/nawt-cornwall/`,
    email: 'cornwallReception@nawt.org.uk',
  },
  essex: {
    name: 'Essex',
    locationName: 'NAWT, The St, Little Clacton, Clacton-on-Sea CO16 9LG',
    locationLat: 51.8292855985,
    locationLng: 1.1424460105,
    phone: '+441255860062',
    website: `${BASE_URL}/our-services/our-centres/nawt-essex/`,
    email: 'clacton@nawt.org.uk',
  },
  hertfordshire: {
    name: 'Hertfordshire',
    locationName: 'NAWT, Tylers Way, Watford, Hertfordshire, WD25 8WT',
    locationLat: 51.49411563,
    locationLng: -1.4348938477,
    phone: '+442089500177',
    website: `${BASE_URL}/our-services/our-centres/nawt-hertfordshire/`,
    email: 'reception@nawt.org.uk',
  },
} as const;

export type NawtAnimal = {
  name: string;
  status: AnimalStatusType;
  dateOfBirth: Date | undefined;
  sex: AnimalSex | undefined;
  catFriendly: boolean | undefined;
  dogFriendly: boolean | undefined;
  humanFriendly: number | undefined;
  breed: string | undefined;
  images: string[];
  url: string;
};
