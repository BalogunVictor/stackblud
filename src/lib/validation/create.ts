import { z } from 'zod';

const MAX_FILE_SIZE = 2000000;

function checkImageType(file: File) {
  if (file?.name) {
    const fileType = file.name.split('.').pop()?.toLowerCase();
    if (fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png') {
      return true;
    }
  }
  return false;
}

export const CreateSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  image: z
    .any()
    .nullable()
    .refine((file) => file === null || file.size > 0, {
      message: 'Image is required',
    })
    .refine((file) => file === null || file.size < MAX_FILE_SIZE, {
      message: 'Max size is 2MB',
    })
    .refine((file) => file === null || checkImageType(file), {
      message: 'Only .jpg, .jpeg, .png formats are supported',
    }),
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(1, 'Price is required'),
});

export type CreateSchemaType = z.infer<typeof CreateSchema>;
