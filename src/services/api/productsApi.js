import apiClient from "../../config/apiClient";

export const getAllProducts = async (page, limit, search, filter = {}) => {
  const response = await apiClient.get("/products", {
    params: {
      page,
      limit,
      search,
      category: filter.category || undefined,
      subcategory: filter.subcategory || undefined,
      brand: filter.brand || undefined,
      minPrice: filter.minPrice || undefined,
      maxPrice: filter.maxPrice || undefined,
      sort: filter.sort || undefined,
    },
  });

  return response.data;
};
export const createProduct = async (payload) => {
  const formData = new FormData();

  formData.append("name", payload.name);
  formData.append("shortDescription", payload.shortDescription);
  formData.append("description", payload.description);
  formData.append("price", payload.price);
  formData.append("discountPrice", payload.discountPrice);
  formData.append("stock", payload.stock);
  formData.append("sku", payload.sku);
  formData.append("category", payload.category);
  formData.append("subcategory", payload.subcategory);
  formData.append("brand", payload.brand);
  formData.append("featured", payload.featured);
  formData.append("isActive", payload.isActive ?? true);

  (payload.tags || []).forEach((tag) => {
    formData.append("tags", tag);
  });

  (payload.images || []).forEach((image) => {
    formData.append("images", image);
  });

  const response = await apiClient.post("/products", formData, {
    headers: {
      "Content-Type": undefined,
    },
  });
  return response.data;
};
export const searchProducts = async (page, limit, search, filter) => {
  const response = await apiClient.get(
    `/products/search?page=${page}&limit=${limit}&category=${filter.category}&subcategory=${filter.subcategory}&brand=${filter.brand}&minPrice=${filter.minPrice}&maxPrice=${filter.maxPrice}&search=${search}&sort=${filter.sort}`,
  );
  return response.data;
};

export const getProductById = async (id) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await apiClient.delete(`/products/${id}`);
  return response.data;
};

export const updateProduct = async (id, payload) => {
  const formData = new FormData();

  formData.append("name", payload.name);
  formData.append("shortDescription", payload.shortDesc);
  formData.append("description", payload.description);
  formData.append("price", payload.price);
  formData.append("discountPrice", payload.discountPrice);
  formData.append("stock", payload.stock);
  formData.append("sku", payload.sku);
  formData.append("category", payload.category);
  formData.append("subcategory", payload.subcategory);
  formData.append("brand", payload.brand);
  formData.append("featured", payload.featured);
  formData.append("isActive", payload.isActive ?? true);

  (payload.tags || []).forEach((tag) => {
    formData.append("tags", tag);
  });

  (payload.images || []).forEach((image) => {
    formData.append("images", image);
  });
  console.log(payload.images);
  const response = await apiClient.patch(`/products/update/${id}`, formData);
  return response.data;
};
