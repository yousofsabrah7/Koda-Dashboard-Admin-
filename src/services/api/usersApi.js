import apiClient from "../../config/apiClient";

export const getAllUsers = async () => {
  const response = await apiClient.get("/users/all");
  return response.data;
};

export const getUserById = async (id) => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};

export const addUser = async (payload) => {
  const response = await apiClient.post("/users/add", payload);
  return response.data;
};

export const updateUser = async (id, payload) => {
  const response = await apiClient.patch(`/users/${id}`, payload);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await apiClient.delete(`/users/${id}`);
  return response.data;
};
