import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PagesRoute from 'src/routes/pages.routes';
import { ProductListing } from 'src/types';

interface ListingItemProps {
  productListing: ProductListing;
}

function ListingItem({ productListing }: ListingItemProps) {
  const { id, name, description, price, image } = productListing;

  return (
    <div className="mx-auto flex h-[400px] w-full max-w-sm flex-col rounded-lg border p-4 shadow-md">
      <div className="relative h-48 w-full">
        <Image
          alt={name}
          className="rounded-t-lg object-cover"
          fill
          src={image}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="mt-2 flex-1 text-sm text-gray-600">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-green-600">
            ₦{price.toFixed(2)}
          </span>
          <Link href={`${PagesRoute.product}/${id}`}>
            <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              View more
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ListingItem;
