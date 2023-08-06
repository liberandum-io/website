import type { Animal, AnimalRelationship, Partner, User } from '@prisma/client';
import { AnimalRelationshipType } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next-intl/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { FaRegBuilding } from 'react-icons/fa';

import ShareButtons from '../core/ShareButtons';
import PartnerKeyFacts from '../partners/KeyFacts';
import CallToActionButton from './CallToActionButton';
import AnimalKeyFacts from './KeyFacts';

type AnimalDetailProps = {
  animal: Animal & {
    relationships: (AnimalRelationship & {user?: User, partner?: Partner})[];
  };
};

export default function Detail(props: AnimalDetailProps) {
  return (
    <section className="py-20 flex lg:flex-row flex-col gap-8 lg:gap-4">
      <div className="w-full lg:w-8/12 xl:w-9/12 md:pl-2">
        <ul className="flex flex-col md:flex-row md:space-x-2 mt-4">
          {props.animal.relationships
            .filter(
              (relationship) =>
                relationship.type === AnimalRelationshipType.OWNER
            )
            .map((relationship) => {
              if (relationship.partner) {
                return (
                  <li key={relationship.id} className="mr-4">
                    <FaRegBuilding className="inline-block align-top mt-1" />{' '}
                    Owner{' '}
                    <Link
                      href={`/partners/${relationship.partner.id}`}
                      className="font-bold text-blue-500"
                    >
                      {relationship.partner.name}
                    </Link>
                  </li>
                );
              }
              if (relationship.user) {
                return (
                  <li key={relationship.id} className="mr-4">
                    <FaRegBuilding className="inline-block align-top mt-1" />{' '}
                    Owner{' '}
                    <Link
                      href={`/users/${relationship.user.id}`}
                      className="font-bold text-blue-500"
                    >
                      {relationship.user.name}
                    </Link>
                  </li>
                );
              }

              return null;
            })}
          <li>
            <AiOutlineClockCircle className="inline-block align-top mt-1" />{' '}
            Created{' '}
            {formatDistanceToNow(props.animal.createdAt, { addSuffix: true })}
          </li>
        </ul>
        {props.animal.subtitle ? <h3>{props.animal.subtitle}</h3> : null}
        {props.animal.description ? (
          <div className="prose max-w-full pt-4">
            <MDXRemote source={props.animal.description} />
          </div>
        ) : null}
      </div>
      <div className="w-full lg:w-4/12 xl:w-3/12 mt-0">
        <aside>
          <div className="bg-neutral-500 p-8">
            <CallToActionButton animal={props.animal} />
            <h5 className="pb-2 border-b mb-8 font-bold text-lg">Key Facts</h5>
            <AnimalKeyFacts animal={props.animal} />
          </div>
          {props.animal.relationships[0].partner && (
            <div className="bg-neutral-500 px-8 pt-8 my-4">
              <h5 className="pb-2 border-b mb-8 font-bold text-lg">Location</h5>
              <PartnerKeyFacts
                partner={props.animal.relationships[0].partner}
              />
            </div>
          )}
          <div className="bg-neutral-500 p-8 my-4">
            <h5 className="pb-2 border-b mb-8 font-bold text-lg">Share</h5>
            <ShareButtons
              url=""
              title={`View ${props.animal.name} the ${props.animal.species} on Liberandum`}
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
