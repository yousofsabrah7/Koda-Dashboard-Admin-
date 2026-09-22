import apiClient from "../../config/apiClient";
export const getAdminDashboard = async () => {
  const response = await apiClient.get("/orders/admin/dashboard");
  return response.data;
};

export const getAllOrders = async (page, limit, filter = {}) => {
  const response = await apiClient.get("/orders/admin", {
    params: {
      page,
      limit,
      status: filter.status || undefined,
      paymentStatus: filter.paymentStatus || undefined,
      paymentMethod: filter.method || undefined,
      from: filter.from || undefined,
      to: filter.to || undefined,
      sortBy: filter.sortBy || undefined,
      sortDir: filter.sortDir || undefined,
    },
  });

  return response.data;
};

export const updateOrderStatus = async (orderId, payload) => {
  const response = await apiClient.patch(
    `/orders/admin/${orderId}/status`,
    payload,
  );
  return response.data;
};
