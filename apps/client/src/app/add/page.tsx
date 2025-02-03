"use client";

import { toast } from "@/hooks/use-toast";
import ProductForm from "@/components/forms/product";
import { Store } from "../../../../../packages/schemas/schema";
import { ProductDTO } from "@/interfaces";
import { createProduct } from "@/api/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const defaultValues = {
  store: Store.Store1,
} as const;

export default function AddProduct() {
  const router = useRouter();

  const onSuccess = () => {
    toast({
      title: "Product added successfully",
    });
    router.push("/");
  };

  const onError = (error: Error) => {
    toast({
      title: "Error adding product",
      description: error.message,
      variant: "destructive",
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess,
    onError,
  });

  const onSubmit = async (product: ProductDTO) => {
    console.log(product);
    mutate(product);
  };

  if (isPending) {
    return "loading...";
  }

  return (
    <main className="flex-grow w-full flex flex-col items-center">
      <div className="flex items-center gap-8">
        <Button variant="outline" size="icon" onClick={() => router.push("/")}>
          <ArrowLeft onClick={() => router.push("/")} />
        </Button>

        <h2 className="text-3xl font-bold tracking-tight">Add Product</h2>
      </div>
      <div className="flex flex-col flex-grow items-center justify-start sm:justify-center pt-8 sm:pt-0">
        <ProductForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          isLoading={isPending}
        />
      </div>
    </main>
  );
}
