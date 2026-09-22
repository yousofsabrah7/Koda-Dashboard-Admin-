import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addReview, getProductReviews, deleteReview } from "../api/reviewsApi";

export const useProductReviews = (productId) => {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => getProductReviews(productId),
    enabled: !!productId,
  });
};

export const useDeleteReview = (productId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId) => deleteReview(productId, reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
    },
    onError: (error) => {
      const message = error?.message || "Failed to delete product";
      toast.error(message);
    },
  });
};
