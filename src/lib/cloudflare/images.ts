export type CloudflareImageResponse = {
  result: CloudflareImage,
  success: boolean,
  errors?: any[] | null,
  messages?: any[] | null,
}
export type CloudflareImage = {
  id: string,
  filename: string,
  metadata: Record<string, string>,
  uploaded: string,
  requireSignedURLs: boolean,
  variants?: string[] | null,
}

export default async function UploadToCloudflareImages(
  url: string,
  metadata: CloudflareImage["metadata"],
): Promise<CloudflareImageResponse> {
  console.log("Uploading image: " + url);

  const body = new FormData();
  body.append("url", url);
  body.append("metadata", JSON.stringify(metadata));
  body.append("requireSignedURLs", "false");

  console.log(`https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_CLOUDFLARE_IMAGE_ACCOUNT_ID}/images/v1`);

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_CLOUDFLARE_IMAGE_ACCOUNT_ID}/images/v1`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.NEXT_CLOUDFLARE_IMAGE_API_KEY,
      },
      body,
    }
  );

  const content = await response.text();

  try {
    return JSON.parse(content);
  } catch (e) {
    console.error(content);

    throw e;
  }
}