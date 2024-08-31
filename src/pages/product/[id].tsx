import { ReactElement } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout } from 'src/layouts';
import PagesRoute from 'src/routes/pages.routes';
import { getItem } from 'src/utils/AsyncStorage';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
};

const ProductItem = () => {
  const router = useRouter();
  const { id } = router.query;

  // Retrieve product by ID from local storage
  const storedProducts = getItem('ListingData');
  const product: Product | null = storedProducts
    ? JSON.parse(storedProducts).find((item: Product) => item.id === id)
    : null;

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <main className="mx-auto max-w-4xl p-3">
      <Link className="flex items-center gap-2 py-4" href={PagesRoute.homePage}>
        <ArrowLeftIcon className="h-5 w-5" />
        <p>Back</p>
      </Link>
      <h1 className="my-7 text-center text-3xl font-semibold">
        {product.name}
      </h1>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="flex-shrink-0">
          {product.image ? (
            <Image
              alt={product.name}
              className="rounded-lg object-contain"
              height={400}
              src={product.image}
              width={400}
            />
          ) : (
            <p>No image available</p>
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-xl font-semibold">Price: ${product.price}</p>
          <p className="mt-4">{product.description}</p>
        </div>
      </div>
    </main>
  );
};

ProductItem.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default ProductItem;
