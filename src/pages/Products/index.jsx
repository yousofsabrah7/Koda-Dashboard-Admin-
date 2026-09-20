// src/pages/products/index.jsx
import { useEffect, useState } from "react";
import StatCard from "../../components/products/statCard";
import {
  PackageSearch,
  Plus,
  Package,
  Star,
  TrendingUp,
  Boxes,
  SlidersHorizontal,
} from "lucide-react";
import Search from "../../components/UI/Search";
import Filter from "../../components/UI/Filter";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../services/apiHooks/productsHook";
import ProductsCard from "../../components/products/productCart";
import { productFilters } from "../../utils/Filters";
import Pagination from "../../components/UI/Pagination";
import { useProductFilters } from "../../utils/useFilters";

const staticConfig = [
  { key: "total", icon: Package, label: "Total" },
  { key: "featured", icon: Star, label: "Featured" },
  { key: "inStock", icon: TrendingUp, label: "In Stock" },
  { key: "outOfStock", icon: Boxes, label: "Out Of Stock" },
];

const index = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
  });
  const [productFilter, setProductFilter] = useState(productFilters);

  const {
    data: response,
    isLoading,
    isError,
  } = useProducts(page, 10, search, filters);

  const { brands, categories, error, isFilterLoading } = useProductFilters();
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleEditProduct = (product) => {
    if (!product?._id) return;
    navigate(`/product/edit/${product._id}`);
  };
  const productList = response?.products || [];

  const stats = {
    total: response?.totalProducts ?? productList.length,
    featured: productList.filter((p) => p.featured).length,
    inStock: productList.filter((p) => p.stock > 0).length,
    outOfStock: productList.filter((p) => p.stock === 0).length,
  };
  useEffect(() => {
    if (!categories || !brands) return;
    setProductFilter((prev) =>
      prev.map((filter, index) => {
        if (index === 0) {
          return {
            ...filter,
            options: isFilterLoading ? null : categories,
          };
        }
        if (index === 1) {
          return {
            ...filter,
            options: isFilterLoading ? null : brands,
          };
        }
        return filter;
      }),
    );
  }, [response]);
  return (
    <div>
      <div className="products pt-6 flex flex-col gap-4 items-center px-8">
        <div className="product-top flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 w-full bg-surface-elevated rounded-3xl px-5 sm:p-8 border border-border-subtle">
          <div className="div1 flex flex-row items-center gap-4">
            <div className="flex items-center justify-center bg-accent-light rounded-2xl size-15 shrink-0 border border-border-subtle">
              <PackageSearch
                size={28}
                strokeWidth={1.75}
                className="text-accent"
              />
            </div>
            <div>
              <p className="text-accent text-xs font-semibold tracking-[1px] uppercase">
                Product Dashboard
              </p>
              <h2 className="text-text-primary text-2xl md:text-3xl font-extrabold">
                Products
              </h2>
            </div>
          </div>

          <button
            className="group flex items-center gap-2 bg-accent hover:bg-accent-hover transition-colors text-white font-semibold rounded-2xl px-6 py-3 w-full sm:w-auto justify-center cursor-pointer"
            onClick={() => navigate("/product/new")}
          >
            <Plus
              size={22}
              strokeWidth={2.5}
              className="transition-transform duration-300 group-hover:rotate-90"
            />
            Add Product
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {staticConfig.map((item) => (
            <StatCard
              key={item.key}
              icon={item.icon}
              value={stats[item.key]}
              label={item.label}
            />
          ))}
        </div>

        <div className="w-full bg-surface-card rounded-3xl border border-border-subtle p-6">
          <div>
            <div className="flex gap-3">
              <div className="flex-2">
                <Search value={search} onChange={setSearch} />
              </div>
              <div className="flex-0">
                <button
                  type="button"
                  onClick={() => setShowFilters((prev) => !prev)}
                  className="
                  flex size-12 items-center justify-center
                  rounded-xl
                  border border-border-subtle
                  bg-surface-card
                  text-text-secondary
                  transition
                  hover:border-border-strong
                "
                >
                  <SlidersHorizontal size={18} />
                </button>
              </div>
            </div>

            <div className={`${showFilters ? "mt-3" : ""} overflow-hidden`}>
              <Filter
                filters={productFilter}
                values={filters}
                onChange={handleFilterChange}
                showFilters={showFilters}
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          <ProductsCard
            products={productList}
            isLoading={isLoading}
            isError={isError}
            onEdit={handleEditProduct}
          />
        </div>
        <div className="w-full mb-8">
          <Pagination
            currentPage={response?.currentPage || page}
            totalPages={response?.totalPages || 1}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default index;
