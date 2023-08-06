import Link from 'next-intl/link';
import type { ReactNode } from 'react';

export type Breadcrumb = {
  title: ReactNode;
  link: any;
};

interface PageTitleProps {
  title: ReactNode;
  breadcrumbs: Breadcrumb[];
  image?: string;
}

export default function PageTitle(props: PageTitleProps) {
  let breadcrumbsShown = 0;

  return (
    <header
      className="page-title relative bg-center"
      style={{
        backgroundImage: `url("${
          props.image ? props.image : 'https://place-puppy.com/1920x500'
        }")`,
      }}
    >
      <div className="container px-4 mx-auto pt-32 pb-32">
        <div className="flex items-center">
          <div className="mb-0 relative z-20">
            <h1
              className="text-8xl text-white font-bold mb-4"
              style={{
                textShadow: '3px -3px 0px #ec5078, -3px 3px 0px #7fb432',
              }}
            >
              {props.title}
            </h1>
            {props.breadcrumbs && props.breadcrumbs.length > 0 ? (
              <ol className="text-lg mt-2 text-white font-semibold">
                {props.breadcrumbs.map((breadcrumb: Breadcrumb) => {
                  ++breadcrumbsShown;

                  return (
                    <li
                      className="inline"
                      key={`${breadcrumbsShown}-${breadcrumb.title}-${breadcrumb.link}`}
                    >
                      {breadcrumbsShown > 1 ? <span> / </span> : null}
                      <Link
                        href={breadcrumb.link}
                        className={
                          breadcrumbsShown === props.breadcrumbs!.length
                            ? 'hover:text-white text-secondary'
                            : 'hover:text-secondary'
                        }
                      >
                        {breadcrumb.title}
                      </Link>
                    </li>
                  );
                })}
              </ol>
            ) : null}
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-hidden">
        <svg className="hidden">
          <use xlinkHref="#svg__element-1" />
        </svg>
        <svg
          id="svg__element-1"
          className="relative z-20"
          width="2067"
          height="72"
          viewBox="0 0 2067 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M146.5 48.9976C146.5 48.9976 395.758 -0.715271 556.485 0.00781224C663.105 0.487508 745.259 18.2412 827.36 35.9836C909.81 53.8014 992.208 71.6079 1099.28 71.897C1197 72.1609 1272.63 57.3568 1348.1 42.5842C1424.67 27.5957 1501.07 12.6397 1600.21 13.4871C1783.63 15.0549 2066.5 71.897 2066.5 71.897V71.9005H146.5H0L146.5 48.9976Z"
            fill="white"
          />
        </svg>
      </div>
    </header>
  );
}
