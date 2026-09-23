import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import {
  Star,
  Eye,
  Pencil,
  SlidersHorizontal,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useDeleteProduct } from "../../services/apiHooks/productsHook";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Loading from "../../utils/Loading";
import ErrorState from "../UI/Error";
import { useState } from "react";
import Modal from "../UI/Modal";
import EditProduct from "../../pages/EditProduct";
import { selectUser } from "../../redux/services/authSlice";
import { useSelector } from "react-redux";

function ProductsCard({ products, isLoading, isError, onEdit }) {
  const user = useSelector(selectUser);
  const deleteProduct = useDeleteProduct();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQuickEditModal, setShowQuickEditModal] = useState(false);
  const [quickEditProduct, setQuickEditProduct] = useState(null);
  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedProduct?._id) return;

    deleteProduct.mutate(selectedProduct._id, {
      onSuccess: () => {
        setShowDeleteModal(false);
        setSelectedProduct(null);
      },
    });
  };

  const handleCloseDeleteModal = () => {
    if (deleteProduct.isPending) return;
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };
  const handleQuickEdit = (product) => {
    setQuickEditProduct(product);
    setShowQuickEditModal(true);
  };
  if (isLoading) {
    return <Loading page="products" message="We are getting our products" />;
  }

  if (isError) {
    return <ErrorState />;
  }

  if (!products?.length) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-border-subtle bg-surface-card">
        <div className="text-center">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-surface-elevated text-text-muted">
            <Eye size={21} />
          </div>

          <p className="text-sm font-semibold text-text-primary">
            No products found
          </p>

          <p className="mt-1 text-xs text-text-muted">
            Try changing your search or filters.
          </p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => {
          const {
            _id,
            images = [],
            featured,
            stock,
            name = "",
            category,
            subcategory,
            brand,
            shortDescription = "",
            price,
            discount,
            tags = [],
          } = product;

          const id = _id;

          const breadcrumb = [category, subcategory, brand].filter(Boolean);

          return (
            <article key={id}>
              <div
                onClick={() => navigate(`/products/view/${id}`)}
                className="
                  group
                  flex w-full flex-col overflow-hidden
                  rounded-3xl
                  border border-border-subtle
                  bg-surface-card
                  shadow-sm
                  cursor-pointer
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-border-strong
                  hover:shadow-[0_18px_45px_rgba(24,23,20,0.08)]
                  dark:hover:shadow-[0_18px_45px_rgba(0,0,0,0.28)]
                "
              >
                <div className="relative h-[220px] w-full overflow-hidden bg-surface-elevated sm:h-[260px]">
                  {images.length > 0 ? (
                    <Swiper
                      modules={[Navigation, Pagination]}
                      navigation={
                        images.length > 1
                          ? {
                              prevEl: `.product-prev-${id}`,
                              nextEl: `.product-next-${id}`,
                            }
                          : false
                      }
                      pagination={
                        images.length > 1
                          ? {
                              clickable: true,
                            }
                          : false
                      }
                      loop={images.length > 1}
                      className="product-swiper h-full w-full"
                    >
                      {images.map((img, index) => {
                        const imageUrl =
                          typeof img === "string" ? img : img?.url;

                        return (
                          <SwiperSlide key={index}>
                            <img
                              src={imageUrl}
                              alt={`${name} image ${index + 1}`}
                              className="
                                h-full w-full object-cover
                                transition-transform duration-500 ease-out
                                group-hover:scale-105
                              "
                            />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <div className="text-center">
                        <div className="mx-auto mb-2 flex size-11 items-center justify-center rounded-2xl bg-surface-card text-text-muted">
                          <Eye size={20} />
                        </div>

                        <span className="text-xs font-medium text-text-muted">
                          No image available
                        </span>
                      </div>
                    </div>
                  )}

                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => e.stopPropagation()}
                        className={`
                          product-prev-${id}
                          absolute left-3 top-1/2 z-20
                          flex size-9 -translate-y-1/2
                          cursor-pointer items-center justify-center
                          rounded-full
                          border border-border-subtle
                          bg-surface-card/90
                          text-text-primary
                          shadow-sm
                          backdrop-blur-sm
                          opacity-0
                          transition-all duration-300
                          hover:scale-105
                          hover:border-accent
                          hover:bg-accent
                          hover:text-white
                          group-hover:opacity-100
                        `}
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={18} strokeWidth={2} />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => e.stopPropagation()}
                        className={`
                          product-next-${id}
                          absolute right-3 top-1/2 z-20
                          flex size-9 -translate-y-1/2
                          cursor-pointer items-center justify-center
                          rounded-full
                          border border-border-subtle
                          bg-surface-card/90
                          text-text-primary
                          shadow-sm
                          backdrop-blur-sm
                          opacity-0
                          transition-all duration-300
                          hover:scale-105
                          hover:border-accent
                          hover:bg-accent
                          hover:text-white
                          group-hover:opacity-100
                        `}
                        aria-label="Next image"
                      >
                        <ChevronRight size={18} strokeWidth={2} />
                      </button>
                    </>
                  )}

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-black/25 to-transparent" />

                  {featured && (
                    <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-white/10 bg-accent px-3 py-1.5 text-xs font-bold text-white shadow-sm backdrop-blur-sm sm:left-4 sm:top-4">
                      <Star size={13} fill="currentColor" />
                      Featured
                    </div>
                  )}

                  <div
                    className={`
                      absolute bottom-3 right-3 z-20
                      rounded-full
                      border px-3 py-1.5
                      text-xs font-semibold
                      backdrop-blur-sm
                      ${
                        stock > 0
                          ? "border-border-subtle bg-surface-card/90 text-text-primary"
                          : "border-red-500/20 bg-red-500/10 text-red-500"
                      }
                    `}
                  >
                    {stock > 0 ? `${stock} in stock` : "Out of stock"}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  {breadcrumb.length > 0 && (
                    <div className="mb-2 flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-accent" />

                      <p className="truncate text-[11px] font-bold uppercase tracking-[0.14em] text-text-muted">
                        {breadcrumb.join(" • ")}
                      </p>
                    </div>
                  )}

                  <h3 className="line-clamp-2 text-xl font-bold leading-7 tracking-tight text-text-primary sm:text-2xl">
                    {name.length > 20 ? name.slice(0, 20) + " ..." : name}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-text-muted">
                    {shortDescription.length > 30
                      ? shortDescription.slice(0, 30) + " ..."
                      : shortDescription}
                  </p>

                  <div className="mt-3 flex items-end justify-between gap-3">
                    <div>
                      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                        Price
                      </p>

                      <span className="text-2xl font-extrabold tracking-tight text-text-secondary sm:text-3xl">
                        ${price}
                      </span>
                    </div>

                    {discount > 0 && (
                      <div className="rounded-full bg-accent-light px-3 py-1.5">
                        <span className="text-xs font-bold text-accent">
                          −${discount} off
                        </span>
                      </div>
                    )}
                  </div>

                  {tags.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="
                            rounded-full
                            border border-border-subtle
                            bg-surface-elevated
                            px-3 py-1.5
                            text-[11px] font-medium
                            text-text-secondary
                            transition-colors
                            hover:border-border-strong
                            hover:text-text-primary
                          "
                        >
                          #{tag}
                        </span>
                      ))}

                      {tags.length > 2 && (
                        <span className="rounded-full bg-surface-elevated px-3 py-1.5 text-[11px] font-medium text-text-muted">
                          +{tags.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div
                  className={`mb-4 px-4 ${user?._id !== product?.createdBy?._id || user?.email !== "admin@E-Hub.com" ? "hidden" : ""}`}
                >
                  <div className="mb-4 h-px bg-border-subtle" />

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit?.(product);
                      }}
                      className="
                        flex cursor-pointer items-center justify-center gap-1.5
                        rounded-xl
                        border border-accent/20
                        bg-accent-light/50
                        px-1.5 py-2.5
                        text-sm font-semibold
                        text-accent
                        transition-all duration-200
                        hover:border-accent/30
                        hover:bg-accent/70
                        hover:text-white
                      "
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickEdit(product);
                      }}
                      className="
                        flex cursor-pointer items-center justify-center gap-1.5
                        rounded-xl
                        border border-border-subtle
                        bg-surface-elevated
                        px-1.5 py-2.5
                        text-sm font-semibold
                        text-text-secondary
                        transition-all duration-200
                        hover:border-accent/30
                        hover:bg-accent-light
                        hover:text-accent
                      "
                    >
                      <SlidersHorizontal size={16} />
                      Quick Edit
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(product);
                      }}
                      disabled={deleteProduct.isPending}
                      className="
                        flex cursor-pointer items-center justify-center gap-1.5
                        rounded-xl
                        border border-red-500/10
                        bg-red-500/5
                        px-1.5 py-2.5
                        text-sm font-semibold
                        text-red-500
                        transition-all duration-200
                        hover:border-red-500/20
                        hover:bg-red-500/10
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <Modal
        isOpen={showDeleteModal}
        onClose={handleCloseDeleteModal}
        title="Delete Product"
        description="This action cannot be undone."
        size="sm"
        footer={
          <>
            <button
              type="button"
              onClick={handleCloseDeleteModal}
              disabled={deleteProduct.isPending}
              className="
                rounded-xl
                border
                border-border-subtle
                px-4
                py-2.5
                text-sm
                font-medium
                text-text-secondary
                hover:bg-surface-elevated
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={deleteProduct.isPending}
              onClick={handleConfirmDelete}
              className="
                rounded-xl
                bg-red-500
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-red-600
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {deleteProduct.isPending ? "Deleting..." : "Delete"}
            </button>
          </>
        }
      >
        <div className="text-sm text-text-secondary">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-text-primary">
            {selectedProduct?.name}
          </span>
          ?
        </div>
      </Modal>
      <Modal
        isOpen={showQuickEditModal}
        onClose={() => {
          setShowQuickEditModal(false);
          setQuickEditProduct(null);
        }}
        title="Edit Product"
        size="xl"
      >
        {quickEditProduct && (
          <EditProduct
            product={quickEditProduct}
            onClose={() => {
              setShowQuickEditModal(false);
              setQuickEditProduct(null);
            }}
          />
        )}
      </Modal>
    </>
  );
}

export default ProductsCard;
