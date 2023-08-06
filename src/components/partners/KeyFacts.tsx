import type { Partner } from '@prisma/client';
import Link from 'next-intl/link';
import type { ReactNode } from 'react';

import MapBox from './MapBox';

export default function PartnerKeyFacts(props: { partner: Partner }) {
  const parts: ReactNode[] = [];

  parts.push(
    <Link
      key="breed"
      href={`/partners/${props.partner.id}`}
      className="hover:text-secondary"
    >
      <strong>Name:</strong> {props.partner.name}
    </Link>
  );
  return (
    <div className="-mx-8 text-[0px]">
      <MapBox />
    </div>
  );
}
