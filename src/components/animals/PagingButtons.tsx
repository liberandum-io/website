import Link from 'next-intl/link';
import type { ParsedUrlQuery } from 'querystring';

export default function PagingButtons(props: {
  query: ParsedUrlQuery;
  page: number;
  perPage: number;
  count: number;
}) {
  const pages = Math.ceil(props.count / props.perPage);
  const buttons: React.ReactNode[] = [];

  buttons.push(
    props.page > 0 ? (
      <Link
        key="page-prev"
        href={{
          pathname: '/animals',
          query: {
            ...props.query,
            page: props.page,
          },
        }}
        className="px-2 border rounded"
      >
        <i className="ri-arrow-left-s-line" />
      </Link>
    ) : (
      <span
        key="page-prev"
        className="prev page-numbers border rounded flex items-center justify-center px-2"
      >
        <i className="ri-arrow-left-s-line" />
      </span>
    )
  );

  let pagesAdded = 0;
  const offset = Math.max(0, props.page - 2);
  while (pagesAdded < 5) {
    if (pagesAdded + offset > pages - 1) {
      break;
    }
    const pageNumber = pagesAdded + offset + 1;
    buttons.push(
      props.page === pages ? (
        <span
          key={`page-${pageNumber}`}
          aria-current="page"
          className="page-numbers current"
        >
          {pageNumber}
        </span>
      ) : (
        <Link
          key={`page-${pageNumber}`}
          href={{
            pathname: '/animals',
            query: {
              ...props.query,
              page: pageNumber,
            },
          }}
          className="hover:bg-gray-100 px-2"
        >
          {pageNumber}
        </Link>
      )
    );

    ++pagesAdded;
  }

  buttons.push(
    pages - props.page > 1 ? (
      <Link
        key="page-last"
        href={{
          pathname: '/animals',
          query: {
            ...props.query,
            page: props.page + 2,
          },
        }}
        className="next page-numbers"
      >
        <i className="ri-arrow-right-s-line" />
      </Link>
    ) : (
      <span
        key="page-last"
        className="prev page-numbers border rounded flex items-center justify-center px-2"
      >
        <i className="ri-arrow-right-s-line" />
      </span>
    )
  );

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{buttons}</>;
}
