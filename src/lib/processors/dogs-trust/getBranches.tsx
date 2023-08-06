import { BASE_URL } from './config';

function mapBranch(branch: any) {
  return {
    name: (branch.title as string).replace(' rehoming', '').trim(),
    locationLat: Number(branch.field_longitude),
    locationLng: Number(branch.field_latitude),
    phone: branch.field_phone_number as string,
    website: `${BASE_URL}${branch.path.alias}`,
  };
}

export default async function getBranches(): Promise<
  ReturnType<typeof mapBranch>[]
> {
  const response = await fetch(
    `${BASE_URL}/page-data/rehoming/our-centres/page-data.json`
  );
  const body = await response.json();
  const results = body?.result?.data?.allNodeCentre?.nodes ?? [];

  return results.map(mapBranch);
}
