import React, { useMemo } from "react";
import { Image, Upload, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

function ImageGallery({
  images = [],
  isLoading,
  onImageChange,
  onRemoveImage,
}) {
  const imageSources = useMemo(() => {
    return images.map((image) => {
      if (typeof image === "string") {
        return image;
      }

      if (image instanceof File) {
        return URL.createObjectURL(image);
      }

      if (image?.url) {
        return image.url;
      }

      return "";
    });
  }, [images]);

  return (
    <div
      className="
        flex
        w-full
        flex-col
        gap-5
        rounded-3xl
        border
        border-border-subtle
        bg-surface-card
        p-4
        sm:p-5
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-accent-light
            text-accent
          "
        >
          <Image size={19} />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-text-primary">Gallery</h3>

          <p className="mt-0.5 text-xs leading-5 text-text-muted">
            Upload multiple images and preview instantly.
          </p>
        </div>
      </div>

      <div className="relative w-full">
        {/* Main Swiper */}
        <Swiper
          modules={[Navigation, Thumbs]}
          navigation={{
            prevEl: ".gallery-prev",
            nextEl: ".gallery-next",
          }}
          spaceBetween={12}
          slidesPerView={1}
          className="gallery-main"
        >
          {imageSources.map((src, index) => (
            <SwiperSlide key={`${src}-${index}`}>
              <div
                className="
                    relative
                    flex
                    w-full
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-2xl
                    border
                    border-border-subtle
                    bg-surface-elevated
                    
                  "
              >
                {src ? (
                  <img
                    src={src}
                    alt={`Product image ${index + 1}`}
                    className="
                        h-full
                        w-full
                        object-contain
                      "
                  />
                ) : (
                  <span className="text-sm text-text-muted">
                    Image unavailable
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => onRemoveImage(index)}
                  disabled={isLoading}
                  className="
                      absolute
                      right-3
                      top-3
                      z-10
                      flex
                      h-9
                      w-9 disabled:cursor-not-allowed disabled:opacity-60
                      items-center
                      justify-center
                      rounded-xl
                      bg-surface-card/70
                      text-red-500
                      shadow-sm
                      backdrop-blur
                      transition
                      hover:bg-red-500
                      hover:text-white
                    "
                  aria-label={`Delete image ${index + 1}`}
                >
                  <Trash2 size={16} />
                </button>

                <div
                  className="
                      absolute
                      bottom-3
                      left-3
                      rounded-lg
                      bg-surface-card/90
                      px-2.5
                      py-1
                      text-[11px]
                      font-semibold
                      text-text-secondary
                      backdrop-blur
                    "
                >
                  {index + 1} / {imageSources.length}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          disabled={isLoading}
          className="
              gallery-prev
              absolute
              left-3
              top-1/2
              z-10
             flex
              size-8 disabled:cursor-not-allowed disabled:opacity-60
              -translate-y-1/2
              items-center
              justify-center
              rounded-lg
              bg-surface-card/70
              text-text-primary
              shadow-sm
              backdrop-blur
              transition
              hover:bg-accent/50
              hover:text-white
            "
          aria-label="Previous image"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          disabled={isLoading}
          className="
              gallery-next
              absolute
              right-3
              top-1/2
              z-10
              flex
              size-8 disabled:cursor-not-allowed disabled:opacity-60
              -translate-y-1/2
              items-center
              justify-center
              rounded-lg
              bg-surface-card/70
              text-text-primary
              shadow-sm
              backdrop-blur
              transition
              hover:bg-accent/50
              hover:text-white
            "
          aria-label="Next image"
        >
          <ChevronRight size={18} />
        </button>

        <Swiper
          modules={[Thumbs]}
          spaceBetween={10}
          slidesPerView={4}
          breakpoints={{
            640: {
              slidesPerView: 5,
            },
            1024: {
              slidesPerView: 6,
            },
          }}
          className="mt-3"
        >
          {imageSources.map((src, index) => (
            <SwiperSlide key={`thumb-${src}-${index}`}>
              <div
                className="
                    h-20
                    cursor-pointer
                    overflow-hidden
                    rounded-xl
                    border
                    border-border-subtle
                    bg-surface-elevated
                    transition
                    hover:border-accent
                  "
              >
                {src && (
                  <img
                    aria
                    src={src}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Empty state */}
      {imageSources.length === 0 && (
        <div
          className="
            flex
            h-56
            w-full
            items-center
            justify-center
            rounded-2xl
            border
            border-border-subtle
            bg-surface-elevated/40
          "
        >
          <div className="text-center">
            <Image size={32} className="mx-auto mb-2 text-text-muted" />

            <p className="text-sm font-medium text-text-secondary">
              No images yet
            </p>

            <p className="mt-1 text-xs text-text-muted">
              Upload images to preview them here
            </p>
          </div>
        </div>
      )}

      {/* Upload */}
      <label
        className={`group flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border disabled:cursor-not-allowed disabled:opacity-60  border-dashed border-border-strong bg-surface-elevated/40 px-4 py-7 text-center transition ${isLoading ? "" : "hover:border-accent hover:bg-accent-light"}`}
      >
        <input
          disabled={isLoading}
          type="file"
          multiple
          accept="image/*"
          onChange={onImageChange}
          className="hidden disabled:cursor-not-allowed disabled:opacity-60"
        />

        <div
          className="
            mb-3
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-accent-light
            text-accent
            transition
            group-hover:scale-105
          "
        >
          <Upload size={19} />
        </div>

        <span className="text-sm font-semibold text-text-primary">
          Upload images
        </span>

        <span className="mt-1 text-xs text-text-muted">
          PNG, JPG, WEBP • multiple files supported
        </span>
      </label>
    </div>
  );
}

export default ImageGallery;
