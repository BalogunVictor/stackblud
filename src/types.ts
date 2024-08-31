import { StaticImageData } from 'next/image';

export interface ProductListing {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | StaticImageData;
}
