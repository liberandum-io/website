type MediaSize = "detail" | "listing" | "dynamic"

export default function GetUrlForAnimalMedia(url: string, size: MediaSize = 'dynamic'): string {
  if (url.startsWith('cloudflare-images://')) {
    return url
      .replace(
        process.env.NEXT_CLOUDFLARE_IMAGE_ACCOUNT_ID!,
        process.env.NEXT_CLOUDFLARE_ACCOUNT_HASH!
      )
      .replace(
        'cloudflare-images://',
        'https://imagedelivery.net/'
      ) + '/' + size
  }

  return url;
}