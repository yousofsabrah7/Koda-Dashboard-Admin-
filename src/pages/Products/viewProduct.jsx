import { useParams, useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import {
  Tag,
  LayoutGrid,
  Heart,
  Users,
  ChevronLeft,
  ChevronRight,
  Star,
  MessageSquare,
} from "lucide-react";

import { useProduct } from "../../services/apiHooks/productsHook";

import {
  useAdminWishlist,
  useAdminWishlistStatus,
} from "../../services/apiHooks/wishlistHook";

import { useProductReviews } from "../../services/apiHooks/reviewsHook";

import Loading from "../../utils/Loading";

import { IoIosArrowRoundBack } from "react-icons/io";

import { FaRegEye } from "react-icons/fa";

import { useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

function ViewProduct() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isLoading, isError } = useProduct(id);

  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    isError: reviewsError,
  } = useProductReviews(id);

  const { data: wishlistData, isLoading: wishlistLoading } = useAdminWishlist(
    1,
    100,
  );

  const { data: wishlistStatus, isLoading: wishlistStatusLoading } =
    useAdminWishlistStatus();

  const product = data?.product;

  if (isLoading) {
    return <Loading page="product" message="Loading product details" />;
  }

  if (isError || !product) {
    return <div className="p-6 text-text-primary">Product not found</div>;
  }

  const {
    name,
    shortDescription,
    price,
    discount,
    stock,
    sku,
    images = [],
    tags = [],
    category,
    subcategory,
    brand,
  } = product;

  const breadcrumb = [category, subcategory, brand].filter(Boolean);

  const wishlists = wishlistData?.wishlists || [];

  const statistics = wishlistStatus?.statistics;

  const totalWishlists = statistics?.totalWishlists || 0;

  const totalWishlistProducts = statistics?.totalWishlistProducts || 0;

  const reviews = reviewsData?.reviews || [];

  const averageRating = reviewsData?.averageRating || 0;

  const numReviews = reviewsData?.numReviews || 0;

  const productWishlistCount = wishlists.reduce((count, wishlist) => {
    const exists = wishlist.products?.some(
      (wishlistProduct) => wishlistProduct._id === product._id,
    );

    return exists ? count + 1 : count;
  }, 0);

  return (
    <div>
      <div className="pt-6 px-8">
        <div className="div1 flex flex-col items-center bg-surface-card rounded-[25px] p-6 border border-border-subtle">
          <button
            className="flex -translate-y-2 text-accent/70 hover:text-accent items-center cursor-pointer text-sm self-start"
            onClick={() => {
              navigate("/products");
            }}
          >
            <IoIosArrowRoundBack size={25} className="mr-2" />
            Back
          </button>

          <div className="flex flex-row w-full">
            <div className="flex items-center justify-center bg-accent-light rounded-2xl size-15 shrink-0 border border-border-subtle">
              <FaRegEye size={28} className="text-accent" />
            </div>

            <div className="ml-4">
              <h5 className="text-text-primary text-xl md:text-3xl font-extrabold">
                {name}
              </h5>

              <p className="text-accent text-xs font-semibold tracking-[1px]">
                Product details overview
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 sm:px-8 m-auto">
        <div className="flex flex-col gap-4">
          <div className="relative w-full h-[280px] sm:h-[380px] lg:h-[440px] rounded-3xl overflow-hidden bg-surface-card border border-border-subtle">
            <Swiper
              modules={[Navigation, Thumbs]}
              navigation={{
                prevEl: ".product-swiper-prev",
                nextEl: ".product-swiper-next",
              }}
              loop={images.length > 1}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              className="w-full h-full"
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img.url}
                    alt={`${name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {images.length > 1 && (
              <button
                type="button"
                className="product-swiper-prev absolute left-4 top-1/2 z-10 -translate-y-1/2 flex items-center justify-center size-10 sm:size-11 rounded-full bg-surface-card/90 backdrop-blur-sm border border-border-subtle text-text-primary shadow-sm transition-all duration-200 hover:bg-accent hover:text-white hover:border-accent hover:scale-105 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft size={21} strokeWidth={2} />
              </button>
            )}

            {images.length > 1 && (
              <button
                type="button"
                className="product-swiper-next absolute right-4 top-1/2 z-10 -translate-y-1/2 flex items-center justify-center size-10 sm:size-11 rounded-full bg-surface-card/90 backdrop-blur-sm border border-border-subtle text-text-primary shadow-sm transition-all duration-200 hover:bg-accent hover:text-white hover:border-accent hover:scale-105 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight size={21} strokeWidth={2} />
              </button>
            )}
          </div>

          <Swiper
            onSwiper={setThumbsSwiper}
            modules={[FreeMode, Thumbs]}
            spaceBetween={10}
            slidesPerView={4}
            freeMode
            watchSlidesProgress
            className="w-full"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img.url}
                  alt={`${name} ${index + 1}`}
                  className="h-20 w-full rounded-xl border border-border-subtle object-cover cursor-pointer"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-surface-card border border-border-subtle rounded-3xl p-5 sm:p-6">
            <h5 className="text-accent text-xs font-semibold tracking-wide">
              Overview
            </h5>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary mt-1">
              {name}
            </h1>

            <p className="text-text-secondary text-sm sm:text-base mt-3 leading-relaxed">
              {shortDescription}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-surface-card border border-border-subtle rounded-2xl p-4 sm:p-5">
              <p className="text-text-muted text-xs font-semibold">Price</p>

              <p className="text-text-primary text-xl sm:text-2xl font-bold mt-1">
                ${price}
              </p>
            </div>

            <div className="bg-surface-card border border-border-subtle rounded-2xl p-4 sm:p-5">
              <p className="text-text-muted text-xs font-semibold">Discount</p>

              <p className="text-text-primary text-xl sm:text-2xl font-bold mt-1">
                ${discount ? discount : " _"}
              </p>
            </div>

            <div className="bg-surface-card border border-border-subtle rounded-2xl p-4 sm:p-5">
              <p className="text-text-muted text-xs font-semibold">Stock</p>

              <p className="text-text-primary text-xl sm:text-2xl font-bold mt-1">
                {stock}
              </p>
            </div>

            <div className="bg-surface-card border border-border-subtle rounded-2xl p-4 sm:p-5">
              <p className="text-text-muted text-xs font-semibold">SKU</p>

              <p className="text-text-primary text-lg sm:text-xl font-bold mt-1 truncate">
                {sku}
              </p>
            </div>
          </div>

          {tags.length > 0 && (
            <div className="bg-surface-card border border-border-subtle rounded-2xl p-4 sm:p-5">
              <div className="flex items-center gap-2 text-text-primary font-semibold text-sm">
                <Tag size={16} />
                Tags
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-surface-elevated text-text-secondary text-xs sm:text-sm rounded-full px-3 py-1 sm:px-4 sm:py-1.5 border border-border-subtle"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {breadcrumb.length > 0 && (
            <div className="bg-surface-elevated border border-border-subtle rounded-2xl p-4 sm:p-5">
              <div className="flex items-center gap-2 text-text-primary font-semibold text-sm">
                <LayoutGrid size={16} />
                Category Info
              </div>

              <p className="text-text-secondary text-sm mt-2">
                {breadcrumb.join(" • ")}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 sm:px-8 m-auto">
        <div className="bg-surface-card rounded-3xl p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-accent text-xs font-semibold uppercase tracking-wider">
                Wishlist
              </p>

              <h3 className="text-xl font-bold text-text-primary mt-1">
                Wishlist Overview
              </h3>
            </div>

            <div className="flex items-center justify-center size-11 rounded-xl bg-accent-light">
              <Heart size={22} className="text-accent" fill="currentColor" />
            </div>
          </div>

          {wishlistLoading || wishlistStatusLoading ? (
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="h-24 rounded-2xl bg-surface-elevated animate-pulse" />
              <div className="h-24 rounded-2xl bg-surface-elevated animate-pulse" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="rounded-2xl bg-surface-elevated border border-border-subtle p-4">
                  <div className="flex items-center gap-2 text-text-muted">
                    <Users size={16} />
                    <span className="text-xs font-semibold">
                      Total Wishlists
                    </span>
                  </div>

                  <p className="text-2xl font-bold text-text-primary mt-2">
                    {totalWishlists}
                  </p>
                </div>

                <div className="rounded-2xl bg-surface-elevated border border-border-subtle p-4">
                  <div className="flex items-center gap-2 text-text-muted">
                    <Heart size={16} />
                    <span className="text-xs font-semibold">
                      Wishlist Products
                    </span>
                  </div>

                  <p className="text-2xl font-bold text-text-primary mt-2">
                    {totalWishlistProducts}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-border-subtle bg-surface-elevated p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-text-muted">
                      Current Product
                    </p>

                    <p className="text-sm font-bold text-text-primary mt-1">
                      {name}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-accent">
                      {productWishlistCount}
                    </p>

                    <p className="text-xs text-text-muted">
                      {productWishlistCount === 1 ? "wishlist" : "wishlists"}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="bg-surface-card rounded-3xl p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-accent text-xs font-semibold uppercase tracking-wider">
                Customer Reviews
              </p>

              <h3 className="text-xl font-bold text-text-primary mt-1">
                Product Reviews
              </h3>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-surface-elevated px-4 py-3">
              <div className="flex items-center gap-1">
                <Star size={20} className="text-accent" fill="currentColor" />

                <span className="text-xl font-bold text-text-primary">
                  {Number(averageRating).toFixed(1)}
                </span>
              </div>

              <div className="h-6 w-px bg-border-subtle" />

              <span className="text-sm text-text-muted">
                {numReviews} {numReviews === 1 ? "review" : "reviews"}
              </span>
            </div>
          </div>

          {reviewsLoading && (
            <div className="mt-5 space-y-3">
              <div className="h-24 rounded-2xl bg-surface-elevated animate-pulse" />
              <div className="h-24 rounded-2xl bg-surface-elevated animate-pulse" />
            </div>
          )}

          {reviewsError && !reviewsLoading && (
            <div className="mt-5 rounded-2xl border border-border-subtle bg-surface-elevated p-5 text-center">
              <p className="text-sm text-text-muted">
                Failed to load product reviews.
              </p>
            </div>
          )}

          {!reviewsLoading && !reviewsError && reviews.length === 0 && (
            <div className="mt-5 flex flex-col items-center justify-center rounded-2xl border border-border-subtle bg-surface-elevated px-5 py-10 text-center">
              <div className="flex size-12 items-center justify-center rounded-xl bg-accent-light text-accent">
                <MessageSquare size={22} />
              </div>

              <p className="mt-3 text-sm font-semibold text-text-primary">
                No reviews yet
              </p>

              <p className="mt-1 text-xs text-text-muted">
                This product hasn't received any reviews yet.
              </p>
            </div>
          )}

          {!reviewsLoading && !reviewsError && reviews.length > 0 && (
            <div className="mt-5 space-y-3">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="rounded-2xl border border-border-subtle bg-surface-elevated p-4 sm:p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-light text-sm font-bold text-accent">
                        {review.username?.charAt(0)?.toUpperCase() || "U"}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-text-primary">
                          {review.username || "Anonymous"}
                        </p>

                        <p className="mt-0.5 text-xs text-text-muted">
                          {review.createdAt
                            ? new Date(review.createdAt).toLocaleDateString()
                            : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={15}
                          className={
                            star <= review.rating
                              ? "text-accent"
                              : "text-text-muted"
                          }
                          fill={star <= review.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </div>

                  {review.comment && (
                    <p className="mt-4 text-sm leading-6 text-text-secondary">
                      {review.comment}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
