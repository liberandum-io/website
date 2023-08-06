"use client"

import GetUrlForAnimalMedia from '@/lib/GetUrlForAnimalMedia';
import NextImage, {ImageLoaderProps, ImageProps} from 'next/image';

export default function Image (props: ImageProps & {src: string}) {
  return <NextImage
    {...props}
    loader={(props: ImageLoaderProps) => {
      if (!props.src.startsWith('cloudflare-images://')) {
        return props.src;
      }
    
      const params: string[] = [
        `width=${props.width}`
      ];
    
      if (props.quality) {
        params.push(`quality=${props.quality}`);
      }
    
      return 'https://imagedelivery.net/';
    }}
    src={
      GetUrlForAnimalMedia(props.src)
    }
  />
}