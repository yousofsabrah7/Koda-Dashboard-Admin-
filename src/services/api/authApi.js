import apiClient from '../../config/apiClient';

export const loginUser = async (payload) => {
  const response = await apiClient.post("/auth/login", payload);
  return response.data;
};

export const logoutUser = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};
export const getProfile = async () => {
  const response = await apiClient.get("/auth/me");
  return response.data;
};

export const changeUserRole = async (payload) => {
  const response = await apiClient.patch("/auth/change-role", payload);
  return response.data;
};