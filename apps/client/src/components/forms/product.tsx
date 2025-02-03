import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  createProductSchema,
  Store,
} from "../../../../../packages/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { EmptyProduct, ProductDTO } from "@/interfaces";

interface Props {
  defaultValues: ProductDTO | EmptyProduct;
  onSubmit: (form: ProductDTO) => Promise<void>;
  isLoading: boolean;
}

const ProductForm: React.FC<Props> = ({
  defaultValues,
  onSubmit,
  isLoading,
}) => {
  const form = useForm<ProductDTO>({
    resolver: zodResolver(createProductSchema),
    defaultValues,
  });

  const submitButtonText = createProductSchema.safeParse(defaultValues).success
    ? "Edit"
    : "Submit";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-8"
      >
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  placeholder="1000"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(event) =>
                    field.onChange(Number(event.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input placeholder="UK-1011" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="My favourite product" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="store"
          render={({ field }) => (
            <FormItem className="flex-shrink-0">
              <FormLabel>Store</FormLabel>
              <Select {...field} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="What store is the product associated with" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(Store).map((store) => (
                    <SelectItem key={store} value={store}>
                      {store}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="animate-spin" />}
          {submitButtonText}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
