import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useMutation } from "@tanstack/react-query";
import { createProducts } from "@/api/api";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const AddFileButton = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

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

  const uploadMutation = useMutation({
    mutationFn: async (file: Blob) => {
      createProducts(file);
    },
    onSuccess,
    onError,
  });

  useEffect(() => {
    if (file) {
      uploadMutation.mutate(file);
    }
  }, [file]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Bulk upload</Label>
      <Input id="picture" type="file" onChange={handleFileChange} />
    </div>
  );
};

export default AddFileButton;
