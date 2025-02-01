import { z } from 'zod';

// Define the TypeScript enum for stores
export enum Store {
  Store1 = 'store1',
  Store2 = 'store2',
  Store3 = 'store3',
  // Add more stores as needed
}

export const productSchema = z.object({
  id: z.string().regex(/^c[a-z0-9]{25}$/, {
    message: "ID must be a valid cuid",
  }),
  quantity: z.number().int().min(0).max(10000),
  sku: z.string().regex(/^(UK|US|EU)-\d{4,10}$/, {
    message: "SKU must start with UK-, US-, or EU- followed by a 4 to 10 digit number",
  }),
  description: z.string().max(1024),
  store: z.nativeEnum(Store),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createProductSchema = productSchema.pick({
  quantity: true,
  sku: true,
  description: true,
  store: true,
});

export const updateProductSchema = createProductSchema.partial();
