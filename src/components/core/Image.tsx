"use client"

import NextImage, {ImageLoaderProps, ImageProps} from 'next/image';

const universialId = 'cloudflare-images://';
const url = 'https://imagedelivery.net/'

export default function Image (props: ImageProps & {src: string}) {
  return <NextImage
    {...props}
    loader={(props: ImageLoaderProps) => {
      if (!props.src.startsWith(universialId)
        && !props.src.startsWith(url)
      ) {
        throw new Error('not a cloudflare iamge');
        return props.src;
      }
    
      const params: string[] = [
        `w=${props.width}`,
      ];
    
      if (props.quality) {
        params.push(`quality=${props.quality}`);
      }
    
      return props.src.replace(universialId, url).replace('/detail', '/') + params.join(',') + '?success=true';
    }}
    src={
      props.src
    }
  />
}