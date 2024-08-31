import { ReactElement, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/Buttons';
import { Input } from '@ui/Input';
import { TextArea } from '@ui/TextArea';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Layout } from 'src/layouts';
import { CreateSchema, CreateSchemaType } from 'src/lib/validation/create';
import PagesRoute from 'src/routes/pages.routes';
import { getItem, setItem } from 'src/utils/AsyncStorage';

const UpdateListing = () => {
  const [listing, setListing] = useState<CreateSchemaType | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CreateSchemaType>({
    defaultValues: {
      description: '',
      image: null,
      name: '',
      price: 0,
    },
    resolver: zodResolver(CreateSchema),
  });

  useEffect(() => {
    if (id) {
      const storedListings = getItem('ListingData');
      if (storedListings) {
        const parsedListings = JSON.parse(storedListings);
        const foundListing =
          parsedListings.find((item: any) => item.id === id) || null;
        if (foundListing) {
          setListing(foundListing);
          reset(foundListing);
          setImagePreview(foundListing.image || null);
        }
      }
    }
  }, [id, reset]);

  const onSubmit: SubmitHandler<CreateSchemaType> = async (data) => {
    try {
      const existingListingsJSON = getItem('ListingData');
      const existingListings = existingListingsJSON
        ? JSON.parse(existingListingsJSON)
        : [];

      const updatedListings = existingListings.map((item: any) =>
        item.id === id
          ? { ...item, ...data, image: imagePreview || item.image }
          : item
      );

      setItem('ListingData', JSON.stringify(updatedListings));
      toast.success('Listing Updated');
      router.push(PagesRoute.homePage);
    } catch (error) {
      console.error('Error handling listings data:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setValue('image', file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <main className="mx-auto max-w-4xl p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">
        Update Product Listing
      </h1>
      {listing ? (
        <form
          className="flex flex-col gap-4 sm:flex-row"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-1 flex-col gap-4">
            <Input
              className="rounded-lg border p-3"
              id="name"
              label="Product Name"
              {...register('name')}
              placeholder="Product Name"
              required
              type="text"
            />
            <TextArea
              className="rounded-lg border p-3"
              id="description"
              label="Description"
              {...register('description')}
              placeholder="Product Description"
              required
            />
            <Input
              className="rounded-lg border p-3"
              id="price"
              label="Price"
              {...register('price', { valueAsNumber: true })}
              placeholder="Product Price"
              required
              type="number"
            />
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <p className="font-semibold">
              Product Image:
              <span className="ml-2 font-normal text-gray-600">(max 1)</span>
            </p>
            <div className="flex gap-4">
              <Input
                accept="image/*"
                className="w-full rounded border border-gray-300 p-3"
                id="image"
                onChange={handleFileChange}
                type="file"
              />
            </div>
            {imagePreview && (
              <div className="flex items-center justify-between border p-3">
                <Image
                  alt="listing image"
                  className="h-20 w-20 rounded-lg object-contain"
                  height={100}
                  src={imagePreview}
                  width={100}
                />
                <button
                  className="rounded-lg p-3 uppercase text-red-700 hover:opacity-75"
                  onClick={() => {
                    setImagePreview(null);
                    setValue('image', null);
                  }}
                  type="button"
                >
                  Delete
                </button>
              </div>
            )}
            {errors.image && errors.image.message && (
              <p className="text-red-500">{String(errors.image.message)}</p>
            )}
            <Button type="submit">Update Listing</Button>
          </div>
        </form>
      ) : (
        <p>Loading listing...</p>
      )}
    </main>
  );
};

UpdateListing.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default UpdateListing;
