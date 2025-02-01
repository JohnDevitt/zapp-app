"use client";

import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import ProductForm from "@/components/forms/product";
import {
  createProductSchema,
  Store,
} from "../../../../../packages/schemas/schema";

export default function Home() {
  const defaultValues = {
    store: Store.Store1,
  };

  const onSubmit = async (form: z.infer<typeof createProductSchema>) => {
    toast({
      title: "Product added",
    });
    console.log(form);
    return;
  };

  return (
    <main className="flex-grow w-full flex flex-col items-center">
      <div className="flex items-center gap-8">
        <h2 className="text-3xl font-bold tracking-tight">Add Product 📈</h2>
      </div>
      <div className="flex flex-col flex-grow items-center justify-start sm:justify-center pt-8 sm:pt-0">
        <ProductForm defaultValues={defaultValues} onSubmit={onSubmit} />
      </div>
    </main>
  );
}
