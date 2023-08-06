import type { Partner } from '@prisma/client';
import Link from 'next-intl/link';
// import ReactMarkdown from 'react-markdown';

type PartnerDetailProps = {
  partner: Partner & {
    parent?: Partner | undefined | null;
    branches: Partner[];
  };
};

function domainFromUrl(url: string): string | undefined {
  return url
    .split('://')[1]
    ?.split('/')[0]
    ?.replace(/^www\./i, '');
}

export default function PartnerDetails(props: PartnerDetailProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="flex lg:flex-row flex-col gap-8 lg:gap-4">
          <div className="w-full lg:w-8/12 xl:w-9/12 md:pl-2">
            {/* <ul className="meta_list">
              <li>
                <span className="icon">
                  <i className="ri-calendar-check-line" />
                </span>
                <span className="value">
                  {intlFormat(props.partner.createdAt)}
                </span>
              </li>
              <li>
                <span className="icon">
                  <i className="ri-message-2-line" />
                </span>
                <span className="value">
                  {Math.max(1, props.partner.branches.length)} branches
                </span>
              </li>
            </ul> */}
            {props.partner.subtitle ? <h3>{props.partner.subtitle}</h3> : null}
            {props.partner.description ? (
              // <ReactMarkdown skipHtml>
              //   {props.partner.description}
              // </ReactMarkdown>
              <></>
            ) : null}
          </div>
          <div className="w-full lg:w-4/12 xl:w-3/12 mt-0">
            <aside>
              <div className="bg-neutral-500 py-8 px-8">
                <h5 className="pb-2 border-b mb-8 font-bold text-lg">
                  Key Facts
                </h5>
                <ul>
                  <li className="border-b pb-3 mb-3 chevron-left relative">
                    <strong>Name:</strong> {props.partner.name}
                  </li>
                  {props.partner.website ? (
                    <li className="border-b pb-3 mb-3 chevron-left relative">
                      <strong>Website:</strong>{' '}
                      <a
                        className="hover:text-secondary"
                        rel="nofollow noreferrer noopener"
                        target="_blank"
                        href={props.partner.website}
                      >
                        {domainFromUrl(props.partner.website) ||
                          props.partner.website}
                      </a>
                    </li>
                  ) : null}
                  {props.partner.phone ? (
                    <li className="border-b pb-3 mb-3 chevron-left relative">
                      <strong>Phone:</strong>{' '}
                      <a
                        className="hover:text-secondary"
                        href={`tel:${props.partner.phone}`}
                      >
                        {props.partner.phone}
                      </a>
                    </li>
                  ) : null}
                  {props.partner.email ? (
                    <li className="border-b pb-3 mb-3 chevron-left relative">
                      <strong>Email:</strong>{' '}
                      <a
                        className="hover:text-secondary"
                        href={`mailto:${props.partner.email}?subject=Enquiry+via+Liberandum`}
                      >
                        {props.partner.email}
                      </a>
                    </li>
                  ) : null}
                  {props.partner.locationName ? (
                    <li className="border-b pb-3 mb-3 chevron-left relative">
                      <strong>Address:</strong> {props.partner.locationName}
                    </li>
                  ) : null}
                  {props.partner.parent ? (
                    <li className="border-b pb-3 mb-3 chevron-left relative">
                      <strong>Parent: </strong>
                      <Link
                        href={`/partners/${props.partner.parent.id}`}
                        className="hover:text-secondary"
                      >
                        {props.partner.parent.name}
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </div>
              {props.partner.branches.length > 0 ? (
                <div className="my-4 bg-neutral-500 py-8 px-8">
                  <h5 className="pb-2 border-b mb-8 font-bold text-lg">
                    Branches
                  </h5>
                  <ul>
                    {props.partner.branches
                      .sort((a, b) => (a.name > b.name ? 1 : -1))
                      .map((branch) => (
                        <li
                          key={branch.id}
                          className="border-b pb-3 mb-3 chevron-left relative"
                        >
                          <Link
                            href={`/partners/${branch.id}`}
                            className="hover:text-secondary"
                          >
                            {branch.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ) : null}
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
