import { AnimalSpecies } from '@prisma/client';

export const BASE_URL = 'https://www.dogstrust.org.uk';
export const FRIENDLY_NAME = 'Dogs Trust';
export const DEFAULT_PHONE_NUMBER = '+442078370006';

export const SEARCHES = {
  '/api/df-search/graphql': AnimalSpecies.DOG,
} as const;

export const PARTNER_MAP = {
  default: {
    name: FRIENDLY_NAME,
    locationName: '17 Wakley Street, London, EC1V 7RQ',
    locationLat: 51.79252,
    locationLng: -1.62675,
    phone: DEFAULT_PHONE_NUMBER,
    website: `${BASE_URL}`,
    email: 'info@dogstrust.org.uk',
  },
} as const;

export type DogsTrustAnimal = {
  key: number;
  id: string;
  name: string;
  url: string;
  created: Date;
  isPublished: boolean;
  gender: Gender;
  dob: string;
  breed: string;
  isCrossBreed: boolean;
  size: Size;
  centreCode: string;
  status: Status;
  liveWithCats: boolean;
  liveWithDogs: boolean;
  liveWithPreschool: boolean;
  liveWithPrimary: boolean;
  liveWithSecondary: boolean;
  isPromotedByCentre: boolean;
  needsMedicalCare: boolean;
  frontEndBreedName: string;
  isReserved: boolean;
  isHomeFromHome: boolean;
  media: Media;
  __typename: DogsTrustTypename;
};

export enum DogsTrustTypename {
  ESDocDog = 'ESDocDog',
}

export enum Gender {
  F = 'F',
  M = 'M',
}

export type Media = {
  images: Image[];
  videos: Video[];
  __typename: MediaTypename;
};

export enum MediaTypename {
  ESDogMedia = 'ESDogMedia',
}

export type Image = {
  src: string;
  alt: null;
  weight: number | null;
  isHero: boolean;
  caption: null;
  __typename: ImageTypename;
};

export enum ImageTypename {
  DogImage = 'DogImage',
}

export type Video = {
  url: string;
  title: string;
  __typename: string;
};

export enum Size {
  Large = 'Large',
  Medium = 'Medium',
  Small = 'Small',
}

export enum Status {
  Available = 'available',
}
