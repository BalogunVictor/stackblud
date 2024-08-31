import { ReactElement, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/Buttons';
import { Input } from '@ui/Input';
import { TextArea } from '@ui/TextArea';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Layout } from 'src/layouts';
import { CreateSchema, CreateSchemaType } from 'src/lib/validation/create';
import PagesRoute from 'src/routes/pages.routes';
import { getItem, setItem } from 'src/utils/AsyncStorage';
import { v4 as uuidv4 } from 'uuid';

const CreateListing = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreateSchemaType>({
    defaultValues: {
      description: '',
      image: null,
      name: '',
      price: 0,
    },
    resolver: zodResolver(CreateSchema),
  });

  const onSubmit: SubmitHandler<CreateSchemaType> = async (data) => {
    const id = uuidv4();

    let imageUrl = '';

    if (data.image) {
      imageUrl = URL.createObjectURL(data.image);
    } else {
      console.log('No image provided');
    }

    // Create the listing object
    const newListing = {
      description: data.description,
      id: id,
      image: imageUrl,
      name: data.name,
      price: data.price,
    };

    try {
      // Retrieve existing listings from localStorage
      const existingListingsJSON = getItem('ListingData');
      const existingListings = existingListingsJSON
        ? JSON.parse(existingListingsJSON)
        : [];

      // Append the new listing to the existing array
      existingListings.push(newListing);

      // Save the updated array back to localStorage
      setItem('ListingData', JSON.stringify(existingListings));
      toast.success('Listing Created');
      router.push(PagesRoute.homePage);
    } catch (error) {
      console.error('Error handling listings data:', error);
    }

    reset();
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
    <>
      <Head>
        <title>Victor Store Create - Stackblud</title>
      </Head>
      <main className="mx-auto max-w-4xl p-3">
        <h1 className="my-7 text-center text-3xl font-semibold">
          Create a Product Listing
        </h1>
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
            <Button type="submit">Create Listing</Button>
          </div>
        </form>
      </main>
    </>
  );
};

CreateListing.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default CreateListing;
