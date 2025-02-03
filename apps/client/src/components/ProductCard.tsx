import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/interfaces";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "./ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "@/api/api";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      toast({
        title: `Product ${product.id} deleted`,
      });

      queryClient.invalidateQueries("GetProducts");
    },
    onError: (error) => {
      toast({
        title: "Error deleting product",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleDeleteProduct: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    mutate(product.id);
  };

  return (
    <Card key={product.id} onClick={() => router.push(`edit/${product.id}`)}>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{product.sku}</CardTitle>
          <Dialog>
            <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button>
                <XIcon onClick={(e) => e.stopPropagation()} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Delete product</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete {product.id}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild onClick={(e) => e.stopPropagation()}>
                  <Button type="button" onClick={handleDeleteProduct}>
                    Delete
                  </Button>
                </DialogClose>

                <DialogClose asChild onClick={(e) => e.stopPropagation()}>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <CardDescription>Quantity: {product.quantity}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{product.description}</p>
      </CardContent>
      <CardFooter>
        <p>Store: {product.store}</p>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
