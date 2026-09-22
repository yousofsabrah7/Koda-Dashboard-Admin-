import React, { useState } from "react";

import ImageGallery from "./ImageGallery";
import ProductFormFields from "./ProductFormFields";
import ProductHeader from "./ProductHeader";

import { validateProductForm } from "./productValidation";
import { useCreateProduct } from "../../services/apiHooks/productsHook";
import { replace, useNavigate } from "react-router-dom";
import { useProductFilters } from "../../utils/useFilters";
function AddProduct() {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    shortDesc: "",
    description: "",
    price: "",
    discountPrice: "",
    stock: "",
    sku: "",
    category: "electronics",
    subcategory: "",
    brand: "",
    tags: [],
    featured: false,
    active: true,
  });

  const [errors, setErrors] = useState({});
  const [tagInput, setTagInput] = useState("");
  const navigate = useNavigate();
  const createProductMutation = useCreateProduct();
  const { categories, brands } = useProductFilters();
  const isLoading = createProductMutation.isPending;
  const isSuccess = createProductMutation.isSuccess;
  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);

    setImages((prevImages) => [...prevImages, ...newFiles]);

    e.target.value = "";
  };
  const handleRemoveImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => {
      const newErrors = {
        ...prev,
      };

      delete newErrors[name];

      return newErrors;
    });
  };

  const handleAddTag = () => {
    const newTag = tagInput.trim();

    if (!newTag) return;

    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, newTag],
    }));

    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleCancel = () => {
    window.history.back();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    const validationErrors = validateProductForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      return;
    }

    const productData = {
      name: formData.name,

      shortDescription: formData.shortDesc,

      description: formData.description,

      price: Number(formData.price),

      ...(formData.discountPrice !== ""
        ? {
            discountPrice: Number(formData.discountPrice),
          }
        : {}),

      stock: Number(formData.stock),

      sku: formData.sku,

      category: formData.category,

      subcategory: formData.subcategory,

      brand: formData.brand,

      tags: formData.tags,

      featured: formData.featured,
      images: images,
    };

    try {
      await createProductMutation.mutateAsync(productData);
      if (isSuccess) {
        navigate("/products", replace);
      }
      setErrors({});
    } catch (error) {
      const errorMessage =
        error?.message || "حدث خطأ أثناء حفظ المنتج، حاول مرة أخرى.";
      console.log(error);
      setErrors({
        general: errorMessage,
      });
    }
  };

  return (
    <div
      className="
        min-h-screen
        w-full
        bg-surface-base
        pb-12
        text-text-primary
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1280px]
          px-4
          py-5
          sm:px-6
          lg:px-8
        "
      >
        <ProductHeader onBack={handleCancel} />
        {errors.general && (
          <div
            className="
              mt-5
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/10
              px-4
              py-3.5
              text-sm
              text-red-500
            "
          >
            <span
              className="
                mt-0.5
                shrink-0
              "
            >
              ⚠️
            </span>

            <span>{errors.general}</span>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="
            mt-6
            grid
            grid-cols-1
            items-start
            gap-5
            lg:grid-cols-[320px_minmax(0,1fr)]
            xl:grid-cols-[350px_minmax(0,1fr)]
          "
        >
          <div
            className="
              lg:sticky
              lg:top-6
              lg:self-start
            "
          >
            <div
              className="
                overflow-hidden
                rounded-3xl
                border
                border-border-subtle
                bg-surface-card
                p-4
                shadow-sm
              "
            >
              <div className="mb-4">
                <h2
                  className="
                    text-sm
                    font-semibold
                    text-text-primary
                  "
                >
                  Product Images
                </h2>

                <p
                  className="
                    mt-1
                    text-xs
                    text-text-muted
                  "
                >
                  Add and manage product images
                </p>
              </div>

              <ImageGallery
                images={images}
                isLoading={isLoading}
                onImageChange={handleImageChange}
                onRemoveImage={handleRemoveImage}
              />
            </div>
          </div>
          <div
            className="
              min-w-0
              overflow-hidden
              rounded-3xl
              border
              border-border-subtle
              bg-surface-card
              shadow-sm
            "
          >
            <div
              className="
                border-b
                border-border-subtle
                px-5
                py-4
                sm:px-6
              "
            >
              <h2
                className="
                  text-base
                  font-semibold
                  text-text-primary
                "
              >
                Product Information
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  text-text-muted
                "
              >
                Fill in the details below to create your product.
              </p>
            </div>

            <div className="p-5 sm:p-6">
              <ProductFormFields
                categories={categories}
                brands={brands}
                formData={formData}
                errors={errors}
                onChange={handleChange}
                isLoading={isLoading}
                tagInput={tagInput}
                setTagInput={setTagInput}
                onAddTag={handleAddTag}
                onRemoveTag={handleRemoveTag}
                onCancel={handleCancel}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
