import { useMemo } from "react";
import { useProducts } from "../services/apiHooks/productsHook";

export const useProductFilters = () => {
  const { data, isLoading, error } = useProducts(1, 1000, "", {});

  const products = data?.products || [];

  const categories = useMemo(() => {
    const countsMap = products.reduce((acc, product) => {
      const category = product.category || "uncategorized";

      acc[category] = (acc[category] || 0) + 1;

      return acc;
    }, {});

    return Object.entries(countsMap)
      .map(([category, count]) => category)
      .sort((a, b) => b.count - a.count);
  }, [products]);

  const brands = useMemo(() => {
    const countsMap = products.reduce((acc, product) => {
      const brand = product.brand || "noBrand";

      acc[brand] = (acc[brand] || 0) + 1;

      return acc;
    }, {});

    return Object.entries(countsMap)
      .map(([brand]) => brand)
      .sort((a, b) => b.count - a.count);
  }, [products]);

  return {
    categories,
    brands,
    isLoading,
    error,
  };
};
