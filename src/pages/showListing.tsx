import React, { ReactElement, useEffect, useState } from 'react';
import { wordLimit } from '@ui/WordLimit';
import { Wrapper } from '@ui/Wrapper';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Layout } from 'src/layouts';
import PagesRoute from 'src/routes/pages.routes';
import { ProductListing } from 'src/types';
import { getItem, setItem } from 'src/utils/AsyncStorage';

import { NextPageWithLayout } from './_app';

const ShowListing: NextPageWithLayout = () => {
  const [listings, setListings] = useState<ProductListing[]>([]);

  useEffect(() => {
    try {
      const storedListings = getItem('ListingData');
      if (storedListings) {
        const parsedListings = JSON.parse(storedListings);
        setListings(parsedListings);
      } else {
        setListings([]);
      }
    } catch (error) {
      console.error('Error getting item:', error);
      setListings([]);
    }
  }, []);

  const handleDelete = (id: string) => {
    const updatedListings = listings.filter((listing) => listing.id !== id);
    setListings(updatedListings);

    // Update localStorage
    setItem('ListingData', JSON.stringify(updatedListings));
  };

  return (
    <>
      <Head>
        <title>Victor Store Listings - Stackblud</title>
      </Head>
      <Wrapper>
        <div className="mx-auto flex max-w-[1000px] flex-col gap-4">
          <h1 className="mt-7 text-center text-2xl font-semibold">
            Your Listings
          </h1>

          {listings.length > 0 ? (
            listings.map((listing) => (
              <div
                className="flex items-center justify-between gap-4 rounded-lg border p-3"
                key={listing.id}
              >
                {/* Conditional rendering for the image */}
                <div className="flex-1">
                  {listing.image ? (
                    <Image
                      alt="listing cover"
                      className="h-16 w-16 object-cover"
                      height={100}
                      src={listing.image}
                      width={100}
                    />
                  ) : (
                    <p className="text-sm text-gray-500">No image available</p>
                  )}
                </div>

                {/* Listing information */}
                <div className="flex-1">
                  <p className="truncate font-semibold text-slate-700">
                    {listing.name}
                  </p>
                  <p className="truncate text-slate-600">
                    {wordLimit(30, listing.description)}
                  </p>
                  <p className="font-bold text-slate-800">
                    {listing.price} NGN
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col items-center">
                  <button
                    className="uppercase text-red-700"
                    onClick={() => handleDelete(listing.id)}
                  >
                    Delete
                  </button>
                  <Link href={`${PagesRoute.update}/${listing.id}`}>
                    <button className="uppercase text-green-700">Edit</button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-600">No listings available.</p>
          )}
        </div>
      </Wrapper>
    </>
  );
};

ShowListing.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default ShowListing;
