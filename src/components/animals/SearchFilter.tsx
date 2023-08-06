'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

function getTranslatedOptionName(
  t: CallableFunction,
  optionCategory: string,
  optionName: string
) {
  const transKey = `filters.${optionCategory}.value.${optionName}`;
  const result = t(transKey);

  if (result === 'common.'+transKey) {
    return optionName[0].toUpperCase() + optionName.substring(1);
  }

  return result;
}

function cleanPostcode(postcode: string) {
  return postcode.toUpperCase().substring(0, 8).replace(/\s+/g, '');
}

export default function SearchFilter(props: {
  name: string;
  options: { [key: string]: number };
}) {
  const t = useTranslations('common');
  const searchParams = useSearchParams();
  const [postcode, setPostcode] = useState<string>(
    typeof searchParams.get('postcode') === 'string'
      ? cleanPostcode(searchParams.get('postcode')!)
      : ''
  );
  const postcodeMode = props.name === 'distance';

  return (
    <>
      <h6 className="font-bold my-3">
        {t(`filters.${props.name}.title` as any)}
        {postcodeMode ? (
          <>
            {' '}
            from
            <input
              onChange={(e) => {
                e.preventDefault();
                setPostcode(cleanPostcode(e.target.value || ''));
              }}
              maxLength={8}
              value={postcode}
              className="ml-2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              placeholder="Postcode"
            />
          </>
        ) : null}
      </h6>
      <ul className={postcodeMode && postcode.length > 5 ? 'hidden' : ''}>
        {Object.keys(props.options).map((optionName) => {
          const routerQuery: string[] = searchParams.getAll(props.name);
          const checked = routerQuery.indexOf(optionName) !== -1;

          return (
            <li
              key={optionName}
              style={{ padding: '5px 0px', borderBottom: 'none' }}
            >
              <label style={{ marginBottom: '0px' }}>
                <input
                  className="ml-6"
                  type="checkbox"
                  checked={checked}
                  onChange={() => {
                    let value: string[] = [];
                    if (checked) {
                      value = routerQuery.filter((x) => x !== optionName);
                    } else {
                      value = [...routerQuery, optionName];
                    }
                    value = value.sort((a, b) => (a > b ? 1 : -1));

                    const newQuery = {
                      // ...searchParams.entries(),
                      [props.name]: value,
                    };

                    if (value.length < 1) {
                      delete newQuery[props.name];
                    }

                    // Router.push('@todo', undefined, {
                    //   scroll: false,
                    // });
                  }}
                />{' '}
                {getTranslatedOptionName(t, props.name, optionName)}
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
}
