"use client";

import { getProducts } from "@/api/api";
import FAB from "@/components/FAB";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["GetProducts"],
    queryFn: getProducts,
  });

  if (!data || data.length === 0)
    return (
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {"No products added"}
        <FAB onClick={() => router.push("/add")} />
      </main>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <FAB onClick={() => router.push("/add")} />
    </div>
  );
}
