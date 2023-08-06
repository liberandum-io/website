export type DogsTrustAnimalDetails = {
  path: Path;
  breadcrumbs: Breadcrumb[];
  field_dog_external_creation_date: Date;
  field_dog_gender: string;
  field_dog_image_base64: null;
  field_dog_key: number;
  field_dog_with_cats: boolean;
  field_dog_with_dogs: boolean;
  field_dog_with_preschool: boolean;
  field_dog_with_primary: boolean;
  field_dog_with_secondary: boolean;
  field_info: string | null;
  field_other: null;
  field_likesdislikes: null;
  field_typeofhomerequired: string | null;
  field_needs_medical_care: boolean;
  field_iscrossbreed: boolean;
  field_ishomefromhome: boolean;
  field_isreserved: boolean;
  id: string;
  field_dob: Date;
  frontEndBreedName: string;
  media: Media;
  thisDogsCentre: ThisDogsCentre;
  thisDogsBreedPage: ThisDogsBreedPage;
  relationships: DogsTrustRelationships;
  status: boolean;
  title: string;
};

export type Breadcrumb = {
  title: string;
  url: null | string;
};

export type Media = {
  images: Image[];
  videos: any[];
};

export type Image = {
  src: string;
  alt: null;
  weight: null;
  isHero: boolean;
  caption: null;
};

export type Path = {
  alias: string;
};

export type DogsTrustRelationships = {
  field_dog_age_band: null;
  field_crossbreed: null;
  field_dog_breed: Field;
  field_dog_dog_size: Field;
  field_dog_location: Field;
  field_dog_status: Field;
  field_promoted_to_section: any[];
};

export type Field = {
  name: string;
};

export type ThisDogsBreedPage = {
  title: string;
  path: Path;
  field_intro_copy: string;
  field_breeds_button_text: null;
  relationships: ThisDogsBreedPageRelationships;
};

export type ThisDogsBreedPageRelationships = {
  field_featured_image: FieldImage;
};

export type FieldImage = {
  field_media_image: FieldMediaImage;
};

export type FieldMediaImage = {
  uri: string;
  alt: string;
};

export type ThisDogsCentre = {
  id: string;
  title: string;
  moderation_state: string;
  path: Path;
  field_address_line_one: string;
  field_address_line_two: null;
  field_city: string;
  field_county: string;
  field_dog_adoption_form: string;
  field_facebook_url: null;
  field_google_maps_link: string;
  field_instagram_url: null;
  field_is_virtual_centre: boolean;
  field_latitude: string;
  field_linkedin_url: null;
  field_longitude: string;
  field_opening_times_text: string;
  field_phone_number: string;
  field_postcode: string;
  field_twitter_url: null;
  field_centre_lead_paragraph: FieldCentre;
  field_centre_intro_text: FieldCentre;
  field_wheelchair_text: null;
  relationships: ThisDogsCentreRelationships;
};

export type FieldCentre = {
  value: string;
};

export type ThisDogsCentreRelationships = {
  field_centre_code: Field;
  field_centre_images: FieldImage[];
  field_centre_intro_image: FieldCentreIntroImage;
  field_promotion_blocks: FieldPromotionBlock[];
};

export type FieldCentreIntroImage = {
  field_caption: null;
  field_media_image: FieldMediaImage;
};

export type FieldPromotionBlock = {
  field_title_front_end: string;
  field_text: string;
  field_promo_link: FieldPromoLink;
  relationships: FieldPromotionBlockRelationships;
};

export type FieldPromoLink = {
  uri: string;
  title: string;
};

export type FieldPromotionBlockRelationships = {
  field_promo_image: FieldImage;
  field_promotion_type: Field;
};
