import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ImageGallery from "../AddProduct/ImageGallery";
import ProductFormFields from "../AddProduct/ProductFormFields";
import ProductHeader from "../AddProduct/ProductHeader";
import {
  useUpdateProduct,
  useProduct,
} from "../../services/apiHooks/productsHook";
import { useProductFilters } from "../../utils/useFilters";

function EditProduct({ product: productFromProps, onClose }) {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { categories, brands } = useProductFilters();

  const shouldFetchProduct = !productFromProps;

  const {
    data: response,
    isLoading: isProductLoading,
    isError,
  } = useProduct(shouldFetchProduct ? productId : undefined);

  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();

  const product = productFromProps || response?.product || response;
  const [formData, setFormData] = useState({
    name: "",
    shortDesc: "",
    description: "",
    price: "",
    discountPrice: "",
    stock: "",
    sku: "",
    category: "",
    subcategory: "",
    brand: "",
    tags: [],
    featured: false,
    active: true,
  });

  const [images, setImages] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!product) return;

    setFormData({
      name: product.name || "",
      shortDesc: product.shortDesc || "",
      description: product.description || "",
      price: product.price ?? "",
      discountPrice: product.discountPrice ?? "",
      stock: product.stock ?? "",
      sku: product.sku || "",
      category: product.category || "",
      subcategory: product.subcategory || "",
      brand: product.brand || "",
      tags: Array.isArray(product.tags) ? product.tags : [],
      featured: Boolean(product.featured),
      active: product.active ?? true,
    });

    const productImages = product.images || [];
    setImages(
      Array.isArray(productImages)
        ? productImages.map((image) => image.url)
        : [],
    );
  }, [product]);
  if (shouldFetchProduct && isProductLoading) {
    return (
      <div className="flex items-center justify-center bg-surface-base">
        <div className="text-sm font-medium text-text-muted">
          Loading product...
        </div>
      </div>
    );
  }
  if (shouldFetchProduct && (isError || !product)) {
    return (
      <div className="flex items-center justify-center bg-surface-base px-4">
        <div className="rounded-2xl border border-border-subtle bg-surface-card px-6 py-8 text-center shadow-sm">
          <h2 className="text-lg font-bold text-text-primary">
            Product not found
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            We couldn't load this product.
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-5 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-hover"
          >
            Back to products
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...newFiles]);

    e.target.value = "";
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, imageIndex) => imageIndex !== index));
  };

  const handleAddTag = () => {
    const tag = tagInput.trim();

    if (!tag) return;

    if (formData.tags.includes(tag)) {
      setTagInput("");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, tag],
    }));

    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.shortDesc.trim()) {
      newErrors.shortDesc = "Short description is required";
    } else if (formData.shortDesc.trim().length < 10) {
      newErrors.shortDesc = "Short description must be at least 10 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    if (formData.price === "" || Number(formData.price) < 0) {
      newErrors.price = "Valid price is required";
    }

    if (formData.discountPrice !== "" && Number(formData.discountPrice) < 0) {
      newErrors.discountPrice = "Invalid discount price";
    }

    if (formData.stock === "" || Number(formData.stock) < 0) {
      newErrors.stock = "Valid stock is required";
    }

    if (!formData.sku.trim()) {
      newErrors.sku = "SKU is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before updating");
      return;
    }

    const payload = {
      ...formData,

      price: Number(formData.price),

      stock: Number(formData.stock),

      discountPrice:
        formData.discountPrice === "" ? null : Number(formData.discountPrice),

      images,
    };

    updateProduct(
      {
        id: productId,
        payload,
      },
      {
        onSuccess: () => {
          if (onClose) {
            onClose();
          } else {
            navigate("/products");
          }
        },
      },
    );
  };

  return (
    <div className="min-h-screen w-full bg-surface-base pb-12 text-text-primary">
      <div className="mx-auto w-full max-w-[1280px] px-4 pt-5 sm:px-6 lg:px-8 lg:pt-7">
        <ProductHeader onBack={() => navigate(-1)} />

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[350px_minmax(0,1fr)]">
            {/* Gallery */}
            <div className="h-fit lg:sticky lg:top-6">
              <ImageGallery
                images={images}
                onImageChange={handleImageChange}
                onRemoveImage={handleRemoveImage}
              />
            </div>

            {/* Form */}
            <div className="overflow-hidden rounded-3xl border border-border-subtle bg-surface-card shadow-sm">
              <div className="border-b border-border-subtle px-5 py-5 sm:px-6">
                <div className="text-[10px] font-bold tracking-[0.12em] text-accent">
                  PRODUCT INFORMATION
                </div>

                <h2 className="mt-1 text-lg font-bold text-text-primary">
                  Edit product details
                </h2>

                <p className="mt-1 text-xs leading-5 text-text-muted">
                  Update the product information, pricing, stock, categories,
                  and other details.
                </p>
              </div>

              <div className="p-5 sm:p-6">
                <ProductFormFields
                  categories={categories}
                  brands={brands}
                  formData={formData}
                  errors={errors}
                  onChange={handleChange}
                  isLoading={isUpdating}
                  onCancel={() => {
                    if (onClose) {
                      onClose();
                    } else {
                      navigate(-1);
                    }
                  }}
                  tagInput={tagInput}
                  setTagInput={setTagInput}
                  onAddTag={handleAddTag}
                  onRemoveTag={handleRemoveTag}
                  submitLabel="Update Product"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
