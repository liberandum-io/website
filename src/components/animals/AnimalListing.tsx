import type {
  Animal,
  AnimalMedia,
  AnimalRelationship,
  Partner,
} from '@prisma/client';
import { AnimalMediaType, AnimalRelationshipType, AnimalSex } from '@prisma/client';
import Image from '@/components/core/Image';
import Link from 'next-intl/link';
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs';
import GetUrlForAnimalMedia from '@/lib/GetUrlForAnimalMedia';

type AnimalListingProps = {
  animal: Animal & {
    media: AnimalMedia[];
    relationships: (AnimalRelationship & { partner: Partner | null })[];
  };
};

function AnimalIcon(props: { sex: AnimalSex | null }) {
  if (props.sex === AnimalSex.FEMALE) {
    return (
      <BsGenderFemale
        title="Female"
        className="text-blue-600 inline text-sm align-top"
      />
    );
  }

  if (props.sex === AnimalSex.MALE) {
    return (
      <BsGenderMale
        title="Male"
        className="text-pink-600 inline text-sm align-top"
      />
    );
  }

  return null;
}

export default function AnimalListing(props: AnimalListingProps) {
  const { animal } = props;

  return (
    <div
      key={animal.id}
      className="bg-neutral-500 pb-4 w-full shadow-white shadow-none hover:[box-shadow:_3px_-3px_0px_#ec5078,_-3px_3px_0px_#7fb432] group"
    >
      <figure className="overflow-hidden relative">
        <Link href={`/animals/${animal.id}`} className="block block-child">
          <Image
            height={300}
            width={350}
            className="block group-hover:scale-125 group-hover:rotate-6 transition duration-500 object-cover w-full"
            src={
              animal.media.find((media => media.type === AnimalMediaType.IMAGE))?.location
                ?? 
            "https://imagedelivery.net/GHaKR5yPkym5rFlXe0JpNw/e1787f0b-4f50-41cb-0564-f939d3665500/listing"
            }
            alt=""
          />
        </Link>
        {animal.relationships
          .filter(
            (relationship) => relationship.type === AnimalRelationshipType.OWNER
          )
          .map((relationship) => (
            <Link
              key={relationship.id}
              href={`/partners/${relationship.partnerId}`}
              className="block rounded-full text-sm absolute bottom-2 text-secondary border-2 font-semibold border-gray-400 left-0 m-5 py-2 px-3 bg-white"
            >
              {relationship.partner?.name}
            </Link>
          ))}
      </figure>
      <Link href={`/animals/${animal.id}`} className="block pt-1 px-5 mx-2">
        <span className="pt-4 float-right font-bold text-xs">
          {animal.status}
        </span>
        <h4 className="text-xl font-bold mt-4 mb-6">
          <span className="hover:text-primary">
            {animal.name || 'Unknown'}{' '}
          </span>
          <AnimalIcon sex={animal.sex} />
        </h4>
        <span className="float-right -mt-2 -mr-2 ml-2 px-6 py-2 rounded-full bg-primary text-white font-semibold hover:bg-secondary">
          View
        </span>
        {animal.breed ? (
          <h5 className="text-s text-gray-500">{animal.breed}</h5>
        ) : null}
      </Link>
    </div>
  );
}
