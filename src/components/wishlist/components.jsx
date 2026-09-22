import { Heart, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const StatCard = ({
  icon: Icon,
  label,
  value,
  description,
  isLoading,
}) => {
  return (
    <div className="group rounded-2xl border border-border-subtle bg-surface-card p-5 transition-all duration-200 hover:border-border-strong hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[1px] text-text-muted">
            {label}
          </p>

          {isLoading ? (
            <div className="mt-3 h-8 w-20 animate-pulse rounded-lg bg-surface-elevated" />
          ) : (
            <p className="mt-2 text-2xl font-bold tabular-nums text-text-primary">
              {value}
            </p>
          )}

          <p className="mt-1 text-xs text-text-muted">{description}</p>
        </div>

        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-light text-accent transition-transform duration-200 group-hover:scale-105">
          <Icon size={18} />
        </div>
      </div>
    </div>
  );
};

export const ProductPreview = ({ products = [] }) => {
  if (!products.length) {
    return <span className="text-xs text-text-muted">No products</span>;
  }

  const previewProducts = products.slice(0, 3);

  return (
    <div className="flex items-center">
      {previewProducts.map((product, index) => {
        const image = product.images?.[0]?.url;

        return (
          <div
            key={`${product._id}-${index}`}
            className={`
              relative size-9 overflow-hidden rounded-lg
              border-2 border-surface-card
              bg-surface-elevated
              ${index !== 0 ? "-ml-2" : ""}
            `}
            title={product.name}
          >
            {image ? (
              <img
                src={image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-text-muted">
                <Package size={14} />
              </div>
            )}
          </div>
        );
      })}

      {products.length > 3 && (
        <div className="-ml-2 flex size-9 items-center justify-center rounded-lg border-2 border-surface-card bg-surface-elevated text-[10px] font-semibold text-text-secondary">
          +{products.length - 3}
        </div>
      )}
    </div>
  );
};

export const TopProductCard = ({ product, rank }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/products/view/${product.productId}`)}
      className="flex items-center gap-4 rounded-2xl cursor-pointer border border-border-subtle bg-surface-base p-3 transition-all duration-200 hover:border-border-strong hover:bg-surface-elevated"
    >
      <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-surface-elevated">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-text-muted">
            <Package size={18} />
          </div>
        )}

        <span className="absolute left-1 top-1 flex size-5 items-center justify-center rounded-md bg-surface-card/90 text-[9px] font-bold text-text-primary shadow-sm">
          #{rank}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-text-primary">
          {product.name}
        </p>

        <div className="mt-1 flex items-center gap-1.5">
          <Heart size={12} className="text-accent" fill="currentColor" />

          <span className="text-xs text-text-secondary">{product.count}</span>

          <span className="text-xs text-text-muted">
            {product.count === 1 ? "wishlist" : "wishlists"}
          </span>
        </div>
      </div>
    </div>
  );
};

export const TopProductsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 rounded-2xl border border-border-subtle p-3"
        >
          <div className="size-14 animate-pulse rounded-xl bg-surface-elevated" />

          <div className="flex-1">
            <div className="h-3 w-3/4 animate-pulse rounded bg-surface-elevated" />

            <div className="mt-2 h-2.5 w-1/3 animate-pulse rounded bg-surface-elevated" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const EmptyState = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="flex size-12 items-center justify-center rounded-2xl bg-surface-elevated text-text-muted">
        <Icon size={20} />
      </div>

      <h4 className="mt-3 text-sm font-semibold text-text-primary">{title}</h4>

      <p className="mt-1 text-xs text-text-muted">{description}</p>
    </div>
  );
};

export const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
