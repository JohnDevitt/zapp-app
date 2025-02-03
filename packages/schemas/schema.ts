import { z } from 'zod';

// Define the TypeScript enum for stores
export enum Store {
  KEN = 'KEN',
  BAT = 'BAT',
  FLOOP = 'FLOOP',
  // Add more stores as needed
}

export const productSchema = z.object({
  id: z.string().cuid(),
  quantity: z.number().int().min(0).max(10000),
  sku: z.string().regex(/^(UK|US|EU)-\d{4,10}$/, {
    message: "SKU must start with UK-, US-, or EU- followed by a 4 to 10 digit number",
  }),
  description: z.string().max(1024).optional(),
  store: z.nativeEnum(Store),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const productArraySchema = z.array(productSchema);

export const createProductSchema = productSchema.pick({
  quantity: true,
  sku: true,
  description: true,
  store: true,
});
