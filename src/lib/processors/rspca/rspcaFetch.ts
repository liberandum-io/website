import { SEARCH_DEFAULT_PARAMS, SEARCH_URL } from './config';

function getPayloadForParams(
  params: string | Record<string, string> | undefined
): string | undefined {
  if (params === undefined) {
    return undefined;
  }
  if (typeof params === 'string') {
    return params;
  }

  const parts: string[] = [];
  for (const key of Object.keys(params)) {
    parts.push(`${key}=${params[key]}`);
  }

  return parts.join('&');
}

export default async function rspcaFetch(
  url: string,
  payload: string | { [key: string]: string } | undefined,
  cookies: string | undefined = undefined
) {
  const request = {
    headers: {
      accept: 'text/html',
      'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
      'cache-control': 'max-age=0',
      'content-type': 'application/x-www-form-urlencoded',
      cookies: cookies as string,
    },
    body: getPayloadForParams(payload),
    method: payload === undefined ? 'GET' : 'POST',
  };

  return fetch(url, request);
}

export async function getSessionCookies(): Promise<string> {
  const response = await rspcaFetch(SEARCH_URL, {
    ...SEARCH_DEFAULT_PARAMS,
    animalType: 'FISH',
  });

  return (response.headers as any)
    .getAll('set-cookie')
    .map((cookie: string) => cookie.split(';')[0])
    .join('; ');
}
