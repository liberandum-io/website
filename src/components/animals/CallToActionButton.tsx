import type { Animal } from '@prisma/client';
import { AnimalStatusType } from '@prisma/client';

export default function CallToActionButton(props: {
  animal: Pick<Animal, 'status' | 'source'>;
}): JSX.Element | null {
  if (!props.animal.source) {
    return null;
  }

  if (props.animal.status === AnimalStatusType.DELETED) {
    return (
      <span className="float-right px-4 py-2 rounded-full bg-gray-600 text-white font-semibold -mt-3 mb-4 mx-2">
        Delete
      </span>
    );
  }

  if (props.animal.status === AnimalStatusType.PENDING) {
    return (
      <span className="float-right px-4 py-2 rounded-full bg-gray-600 text-white font-semibold -mt-3 mb-4 mx-2">
        Pending
      </span>
    );
  }

  if (props.animal.status === AnimalStatusType.REHOMED) {
    return (
      <span className="float-right px-4 py-2 rounded-full bg-primary text-white font-semibold -mt-3 mb-4 mx-2">
        Rehomed
      </span>
    );
  }

  if (props.animal.status === AnimalStatusType.UNKNOWN) {
    return (
      <a
        href={props.animal.source}
        target="_blank"
        rel="nofollow noreferrer noopener"
        className="float-right px-4 py-2 rounded-full bg-gray-600 text-white font-semibold hover:bg-primary -mt-3 mb-4 mx-2"
      >
        Unknown
      </a>
    );
  }

  if (props.animal.status === AnimalStatusType.RESERVED) {
    return (
      <a
        href={props.animal.source}
        target="_blank"
        rel="nofollow noreferrer noopener"
        className="float-right px-4 py-2 rounded-full bg-gray-600 text-white font-semibold hover:bg-primary -mt-3 mb-4 mx-2"
      >
        Reserved
      </a>
    );
  }

  if (props.animal.status === AnimalStatusType.REHOMING) {
    return (
      <a
        href={props.animal.source}
        target="_blank"
        rel="nofollow noreferrer noopener"
        className="float-right px-4 py-2 rounded-full bg-primary text-white font-semibold hover:bg-secondary -mt-3 mb-4 mx-2"
      >
        Apply
      </a>
    );
  }

  return null;
}
