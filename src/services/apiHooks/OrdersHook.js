import {
  getAllOrders,
  getAdminDashboard,
  updateOrderStatus,
} from "../api/ordersApi";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAdminDashboard = () => {
  const query = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: getAdminDashboard,
  });
  useEffect(() => {
    if (query.isError) {
      const message = query.error?.message || "Something went wrong";
      toast.error(message);
    }
  }, [query.isError, query.error]);

  return query;
};
export const useAllOrders = (page, limit, filter = "") => {
  const query = useQuery({
    queryKey: ["orders", page, limit, filter],
    queryFn: () => getAllOrders(page, limit, filter),
    enabled: !!page || !!limit,
  });

  useEffect(() => {
    if (query.isError) {
      const message = query.error?.message || "Something went wrong";
      toast.error(message);
    }
  }, [query.isError, query.error]);

  return query;
};

export const useOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, newStatus }) =>
      updateOrderStatus(orderId, newStatus),

    onSuccess: (_, variables) => {
      toast.success("Order status updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      queryClient.invalidateQueries({
        queryKey: ["order", variables.orderId],
      });
    },

    onError: (error) => {
      const message = error?.message || "Failed to update order status";

      toast.error(message);
    },
  });
};
