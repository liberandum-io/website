import { AnimalSpecies } from '@prisma/client';

export const BASE_URL = 'https://www.bluecross.org.uk';
export const FRIENDLY_NAME = 'Bluecross';
export const DEFAULT_PHONE_NUMBER = '0300 777 1757';
export const SEARCHES = {
  '/pet/listing/cat': AnimalSpecies.CAT,
  '/pet/listing/dog': AnimalSpecies.DOG,
  '/pet/listing/rabbit': AnimalSpecies.RABBIT,
} as const;

export type BluecrossAnimal = {
  field_adestra_location: string;
  field_age_bracket: string;
  field_age_month: string;
  field_age_year: string;
  field_breed: string;
  field_centre: string;
  field_cross_breed: string;
  field_horse_height: string;
  field_horse_height_defined: string;
  field_horse_suitability: string;
  field_pet_can_live_with: string[] | undefined;
  field_pet_colour: string;
  field_pet_image: string;
  field_pet_sex: string;
  field_reserved: string;
  field_species: string;
  field_video: string;
  title: string;
  view_node: string;
};

export const PARTNER_MAP = {
  default: {
    name: FRIENDLY_NAME,
    locationName: 'Blue Cross, Shilton Road, Burford, Oxford, OX18 4PF',
    locationLat: 51.79252,
    locationLng: -1.62675,
    phone: DEFAULT_PHONE_NUMBER,
    website: `${BASE_URL}`,
    email: 'legacy@bluecross.org.uk',
  },
  devon: {
    name: 'Devon',
    locationName:
      'Stratford House, Waterbridge Court, Maford Park Road, Marsh Barton, Exeter, EX2 8EX',
    locationLat: 50.69577,
    locationLng: -3.52047,
    phone: '0300 777 1853',
    website: `${BASE_URL}/devon-exeter-rehoming-advice-and-behaviour-unit`,
    email: 'devon@bluecross.org.uk',
  },
  manchester: {
    name: 'Manchester',
    locationName: '48 Blackburn Street, Radcliffe, M26 1NQ',
    locationLat: 53.56007,
    locationLng: -2.32628,
    phone: '0300 777 1852',
    website: `${BASE_URL}/greater-manchester-rehoming-and-advice-unit`,
    email: 'greatermanchester@bluecross.org.uk',
  },
  southampton: {
    name: 'Southampton',
    locationName: 'Bubb Lane, West End, Southampton, SO30 2HL',
    locationLat: 50.94066,
    locationLng: -1.29802,
    phone: '0300 777 1847',
    website: `${BASE_URL}/hampshire-southampton-rehoming-centre`,
    email: 'southampton@bluecross.org.uk',
  },
  burford: {
    name: 'Burford',
    locationName: 'Shilton Road, Burford, OX18 4PF',
    locationLat: 51.79252,
    locationLng: -1.62675,
    phone: '0300 777 1849',
    website: `${BASE_URL}/oxfordshire-burford-rehoming-centre`,
    email: 'burford@bluecross.org.uk',
  },
  newport: {
    name: 'Newport',
    locationName: 'Willenhall Street , Newport, NP19 0GE',
    locationLat: 51.5834698328,
    locationLng: -2.97923228657,
    phone: '0300 777 1850',
    website: `${BASE_URL}/south-wales-newport-rehoming-and-advice-unit`,
    email: 'newport@bluecross.org.uk',
  },
  sheffield: {
    name: 'Sheffield',
    locationName: 'Old Station Drive, Sheffield, S7 2PY',
    locationLat: 53.345667119,
    locationLng: -1.4947057521,
    phone: '0300 777 1850',
    website: `${BASE_URL}/south-yorkshire-sheffield-rehoming-and-advice-unit`,
    email: 'sheffield@bluecross.org.uk',
  },
  suffolk: {
    name: 'Suffold',
    locationName: 'Bourne Hill, Wherstead, Ipswich, IP2 8NQ',
    locationLat: 52.0292314,
    locationLng: 1.1467717664,
    phone: '0300 777 1850',
    website: `${BASE_URL}/suffolk-rehoming-centre`,
    email: 'suffolk@bluecross.org.uk',
  },
  bromsgrove: {
    name: 'Bromsgrove',
    locationName: 'Wildmoor Lane, Catshill, Bromsgrove, B61 0RJ',
    locationLat: 52.372513793,
    locationLng: -2.057623602,
    phone: '0300 777 1842',
    website: `${BASE_URL}/west-midlands-bromsgrove-rehoming-centre`,
    email: 'bromsgrove@bluecross.org.uk',
  },
  thirsk: {
    name: 'Thirsk',
    locationName: 'Parklands, Station Road, Topcliffe, Thirsk, YO7 3SE',
    locationLat: 54.194690818,
    locationLng: -1.4029516213,
    phone: '0300 777 1848',
    website: `${BASE_URL}/yorkshire-thirsk-rehoming-centre`,
    email: 'thirsk@bluecross.org.uk',
  },
  'kimpton bottom': {
    name: 'Kimpton Bottom',
    locationName: 'Kimpton Bottom, Hertfordshire, SG4 8EU',
    locationLat: 51.84401766,
    locationLng: -0.3195074267,
    phone: '0300 777 1844',
    website: `${BASE_URL}/hertfordshire-kimpton-rehoming-centre`,
    email: 'hertfordshire@bluecross.org.uk',
  },
} as const;
