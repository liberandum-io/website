import type { Partner } from '@prisma/client';
import Link from 'next-intl/link';

import { getPartnersByParentId } from '@/app/api/partners/route';
import PageBody from '@/components/layouts/PageBody';
import PageTitle from '@/components/layouts/PageTitle';

type PartnerBoxProps = {
  partner: Partner;
};

function PartnerBox(props: PartnerBoxProps) {
  return (
    <Link
      href={`/partners/${props.partner.id}`}
      className="block px-4 py-8 rounded-xl relative overflow-hidden text-center hover:bg-primary bg-neutral-500 hover:text-white text-2xl flex-1 flex items-center justify-center"
    >
      {props.partner.name.replace('National Animal Welfare Trust', 'NAWT')}
    </Link>
  );
}

export const metadata = {
  title: 'Partners | Liberandum',
  description: 'Our excellant partners and how you can join too.',
};

export default async function PartnersPage() {
  const partners = await getPartnersByParentId(null);

  return (
    <>
      <PageTitle
        title="Partners"
        breadcrumbs={[
          { title: 'Home', link: '/' },
          { title: 'Partners', link: '/partners' },
        ]}
      />
      <PageBody>
        <h2 className="text-4xl p-4 text-center">
          Data Provided by our Excellent Partners
        </h2>
        <p className="text-center pb-4">
          And you too can become a partner by contacting us{' '}
          <Link
            href="mailto:partners@liberandum.io"
            className="hover:text-primary text-secondary"
          >
            partners@liberandum.io
          </Link>
          .
        </p>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
          {partners.map((partner) => (
            <PartnerBox key={partner.id} partner={partner} />
          ))}
        </div>
      </PageBody>
    </>
  );
}
