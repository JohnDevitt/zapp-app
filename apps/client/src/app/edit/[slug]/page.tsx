"use client";

import { toast } from "@/hooks/use-toast";
import ProductForm from "@/components/forms/product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProduct, updateProduct } from "@/api/api";
import { ProductDTO } from "@/interfaces";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/enums/queryKeys";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EditProduct() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: [Product.GET_PRODUCT, slug],
    queryFn: () => getProduct(slug),
  });

  const onSuccess = () => {
    toast({
      title: `Product ${data?.id} updated successfully`,
    });
    router.push("/");
  };

  const onError = (error: Error) => {
    toast({
      title: `Error updating product ${data?.id}`,
      description: error.message,
      variant: "destructive",
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: updateProduct,
    onSuccess,
    onError,
  });

  const onSubmit = async (product: ProductDTO) => {
    mutate("abc123", product);
  };

  if (!data) {
    return (
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        Product: ${slug} not found
      </main>
    );
  }

  const defaultFormData = {
    sku: data.sku,
    quantity: data.quantity,
    description: data.description,
    store: data.store,
  };

  if (isLoading) {
    return "loading...";
  }

  return (
    <main className="flex-grow w-full flex flex-col items-center">
      <div className="flex items-center gap-8">
        <Button variant="outline" size="icon" onClick={() => router.push("/")}>
          <ArrowLeft onClick={() => router.push("/")} />
        </Button>

        <h2 className="text-3xl font-bold tracking-tight">Edit Product</h2>
      </div>
      <div className="flex flex-col flex-grow items-center justify-start sm:justify-center pt-8 sm:pt-0">
        <ProductForm
          defaultValues={defaultFormData}
          onSubmit={onSubmit}
          isLoading={isPending}
        />
      </div>
    </main>
  );
}
