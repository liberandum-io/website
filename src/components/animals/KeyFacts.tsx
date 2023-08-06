import type { Animal, AnimalRelationship, Partner, User } from '@prisma/client';
import { AnimalRelationshipType } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next-intl/link';
import { useTranslations } from 'next-intl';

type KeyFactsProps = {
  animal: Animal & {
    relationships: (AnimalRelationship & {user?: User, partner?: Partner})[];
  };
};

export default function AnimalKeyFacts(props: KeyFactsProps) {
  const t = useTranslations('common');

  const parts: React.ReactNode[] = [];
  parts.push(
    <Link
      key="species"
      href={`/animals?species=${props.animal.species}`}
      className="hover:text-secondary"
    >
      <strong>Species:</strong>{' '}
      {t(`filters.species.value.${props.animal.species}`)}
    </Link>
  );

  if (props.animal.breed) {
    parts.push(
      <Link
        key="breed"
        href={`/animals?species=${props.animal.species}&breed=${props.animal.breed}`}
        className="hover:text-secondary"
      >
        <strong>Breed:</strong>{' '}
        {props.animal.breed[0].toUpperCase() + props.animal.breed.substring(1)}
      </Link>
    );
  }

  if (props.animal.colour) {
    parts.push(
      <Link
        key="colour"
        href={`/animals?species=${props.animal.species}&colour=${props.animal.colour}`}
        className="hover:text-secondary"
      >
        <strong>Colour:</strong> {props.animal.colour}
      </Link>
    );
  }

  if (props.animal.sex) {
    parts.push(
      <Link
        key="sex"
        href={`/animals?species=${props.animal.species}&sex=${props.animal.sex}`}
        className="hover:text-secondary"
      >
        <strong>Sex:</strong> {t(`filters.sex.value.${props.animal.sex}`)}
      </Link>
    );
  }

  if (typeof props.animal.friendlyToCats === 'boolean') {
    parts.push(
      <Link
        key="friendlyToCats"
        href={`/animals?species=${props.animal.species}&friendlyToCats=${props.animal.friendlyToCats}`}
        className="hover:text-secondary"
      >
        <strong>Cat Friendly: </strong>{' '}
        {t(`filters.friendlyToCats.value.${props.animal.friendlyToCats}`)}
      </Link>
    );
  }

  if (typeof props.animal.friendlyToDogs === 'boolean') {
    parts.push(
      <Link
        key="friendlyToDogs"
        href={`/animals?species=${props.animal.species}&friendlyToDogs=${props.animal.friendlyToDogs}`}
        className="hover:text-secondary"
      >
        <strong>Dog Friendly: </strong>{' '}
        {t(`filters.friendlyToDogs.value.${props.animal.friendlyToDogs}`)}
      </Link>
    );
  }

  if (typeof props.animal.friendlyToHumans === 'number') {
    parts.push(
      <Link
        key="friendlyToHumans"
        href={`/animals?species=${props.animal.species}&friendlyToHumans=true`}
        className="hover:text-secondary"
      >
        <strong>Human Friendly: </strong>
        {props.animal.friendlyToHumans}+ years old
      </Link>
    );
  }
  if (typeof props.animal.medicalNeeds === 'boolean') {
    parts.push(
      <Link
        key="medicalNeeds"
        href={`/animals?species=${props.animal.species}&medicalNeeds=${props.animal.medicalNeeds}`}
        className="hover:text-secondary"
      >
        <strong>Ongoing Medical Needs: </strong>{' '}
        {t(`filters.medicalNeeds.value.${props.animal.medicalNeeds}`)}
      </Link>
    );
  }
  if (props.animal.dateOfBirth) {
    parts.push(
      <span key="dateOfBirth">
        <strong>Born: </strong>
        {formatDistanceToNow(props.animal.dateOfBirth, { addSuffix: true })}
      </span>
    );
  }
  for (const relationship of props.animal.relationships) {
    if (relationship.type !== AnimalRelationshipType.OWNER) {
      continue;
    }
    if (relationship.partner) {
      parts.push(
        <Link
          key={relationship.id}
          href={`/partners/${relationship.partner.id}`}
          className="hover:text-secondary"
        >
          <strong>Owner: </strong>
          {relationship.partner.name}
        </Link>
      );
    }
    if (relationship.user) {
      parts.push(
        <Link
          key={relationship.id}
          href={`/users/${relationship.user.id}`}
          className="hover:text-secondary"
        >
          <strong>Owner: </strong>
          {relationship.user.name}
        </Link>
      );
    }
  }

  if (props.animal.source) {
    parts.push(
      <a
        key="source"
        href={props.animal.source}
        target="_blank"
        rel="nofollow noreferrer noopener"
        className="hover:text-secondary"
      >
        <strong>Source: </strong> Website
      </a>
    );
  }
  parts.push(
    <span key="created">
      <strong>Created: </strong>
      {formatDistanceToNow(props.animal.createdAt, { addSuffix: true })}
    </span>
  );

  return (
    <ul>
      {parts.map((li, index) => (
        <li key={index} className="border-b pb-3 mb-3 chevron-left relative">
          {li}
        </li>
      ))}
    </ul>
  );
}
