import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllProducts,
  createProduct,
  searchProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../api/productsApi";
import toast from "react-hot-toast";

export const useProducts = (page, limit, search, filter = {}) => {
  return useQuery({
    queryKey: ["products", page, limit, search, filter],
    queryFn: () => getAllProducts(page, limit, search, filter),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product created successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] }); // auto update products
    },
    onError: (error) => {
      const message = error?.message || "Failed to create product";
      toast.error(message);
    },
  });
};

export const useSearchProducts = (page, limit, search, filter = {}) => {
  return useQuery({
    queryKey: ["searchProducts", page, limit, search, filter],
    queryFn: () => searchProducts(page, limit, search, filter),
  });
};

export const useProduct = (productId) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      const message = error?.message || "Failed to delete product";
      toast.error(message);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => updateProduct(id, payload),
    onSuccess: (_data, variables) => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["product", variables.id],
      });
    },
    onError: (error) => {
      const message = error?.message || "Failed to update product";
      toast.error(error?.response);
    },
  });
};
