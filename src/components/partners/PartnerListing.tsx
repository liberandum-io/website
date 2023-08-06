import type { Partner } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next-intl/link';

type PartnerWithBranches = Partner & {
  braches?: PartnerWithBranches[];
};

type PartnerListingProps = {
  partner: PartnerWithBranches;
};

function PartnerListing(props: PartnerListingProps) {
  const { partner } = props;

  return (
    <div key={partner.id} className="w-full bg-neutral-500 py-4 px-4">
      <div className="posts_box">
        <figure className="posts_box-thumb">
          {/* <img src={getCdnUrl(images[0]?.location as string)} alt="" /> */}
        </figure>
        <div className="posts_box-details">
          <ul className="meta_list">
            <li>
              <span className="icon mr-2 text-primary">
                <span className="ri-calendar-check-line" />
              </span>
              <span className="value">
                {formatDistanceToNow(partner.createdAt, { addSuffix: true })}
              </span>
            </li>
          </ul>
          <h4 className="text-3xl font-bold mt-2 mb-4">
            <Link
              href={`/partners/${partner.id}`}
              className="hover:text-primary"
            >
              {partner.name}
            </Link>
          </h4>
          <div className="hidden">
            <p>{partner.subtitle}</p>
          </div>
          <Link href={`/partners/${partner.id}`} className="arrow-button">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PartnerListing;
