import { z } from "zod";
import { createProductSchema, productSchema, Store } from "../../../packages/schemas/schema";

export type Product = z.infer<typeof productSchema>;
export type ProductDTO = z.infer<typeof createProductSchema>;
export type EmptyProduct = { store: Store };