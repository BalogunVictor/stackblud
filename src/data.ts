import { v4 as uuidv4 } from 'uuid';

import {
  bluetoothSpeaker,
  laptop,
  smartphone,
  smartwatch,
  wirelessHeadphone,
} from './assets/images';

export const productListings = [
  {
    description:
      'High-quality wireless headphones with noise-cancellation and long battery life.',
    id: uuidv4(),
    image: wirelessHeadphone,
    name: 'Wireless Headphones',
    price: 199.99,
  },
  {
    description:
      'Latest smartphone with an edge-to-edge display, powerful processor, and excellent camera quality.',
    id: uuidv4(),
    image: smartphone,
    name: 'Smartphone',
    price: 899.99,
  },
  {
    description:
      'Lightweight laptop with a 13-inch display, 16GB RAM, and 512GB SSD.',
    id: uuidv4(),
    image: laptop,
    name: 'Laptop',
    price: 1299.99,
  },
  {
    description:
      'Fitness smartwatch with heart rate monitoring, GPS, and sleep tracking features.',
    id: uuidv4(),
    image: smartwatch,
    name: 'Smartwatch',
    price: 249.99,
  },
  {
    description:
      'Portable Bluetooth speaker with powerful sound and water-resistant design.',
    id: uuidv4(),
    image: bluetoothSpeaker,
    name: 'Bluetooth Speaker',
    price: 99.99,
  },
];
