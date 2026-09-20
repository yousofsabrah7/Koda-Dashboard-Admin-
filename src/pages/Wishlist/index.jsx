import { Heart, Package, ShoppingBag, TrendingUp } from "lucide-react";
import { useState } from "react";

import {
  useAdminWishlist,
  useAdminWishlistStatus,
} from "../../services/apiHooks/wishlistHook";

import Table from "../../components/UI/Table";
import Pagination from "../../components/UI/Pagination";

import {
  StatCard,
  ProductPreview,
  TopProductCard,
  TopProductsSkeleton,
  EmptyState,
  formatDate,
} from "../../Components/wishlist/components";
export default function Wishlists() {
  const [page, setPage] = useState(1);

  const limit = 10;

  const { data: wishlistData, isLoading: isWishlistLoading } = useAdminWishlist(
    page,
    limit,
  );

  const { data: statsData, isLoading: isStatsLoading } =
    useAdminWishlistStatus();

  const wishlists = wishlistData?.wishlists ?? [];

  const statistics = statsData?.statistics ?? {};

  const totalWishlists = statistics.totalWishlists ?? 0;

  const totalWishlistProducts = statistics.totalWishlistProducts ?? 0;

  const averageProducts =
    totalWishlists > 0
      ? (totalWishlistProducts / totalWishlists).toFixed(1)
      : "0";

  const topProducts = statistics.topProducts ?? [];

  const columns = [
    {
      key: "wishlist",
      label: "Wishlist",
    },
    {
      key: "user",
      label: "User",
    },
    {
      key: "products",
      label: "Products",
    },
    {
      key: "preview",
      label: "Preview",
    },
    {
      key: "createdAt",
      label: "Created",
    },
    {
      key: "updatedAt",
      label: "Updated",
    },
  ];

  const rows = wishlists.map((wishlist) => ({
    id: wishlist._id,

    wishlist: (
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent-light text-accent">
          <Heart size={17} />
        </div>

        <div className="min-w-0">
          <p className="font-mono text-xs font-medium text-text-primary">
            #{wishlist._id?.slice(-8).toUpperCase()}
          </p>

          <p className="mt-0.5 text-[10px] text-text-muted">Wishlist</p>
        </div>
      </div>
    ),

    user: (
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-surface-elevated text-sm font-semibold text-text-secondary ring-1 ring-border-subtle">
          {wishlist.user?.username?.charAt(0)?.toUpperCase() || "?"}
        </div>

        <div className="min-w-0 text-left">
          <p className="max-w-[180px] truncate text-sm font-medium text-text-primary">
            {wishlist.user?.username || "Unknown user"}
          </p>

          <p className="max-w-[200px] truncate text-[11px] text-text-muted">
            {wishlist.user?.email || "User unavailable"}
          </p>
        </div>
      </div>
    ),

    products: (
      <div className="flex items-center gap-2">
        <Package size={15} className="text-text-muted" />

        <span className="font-semibold text-text-primary">
          {wishlist.products?.length ?? 0}
        </span>

        <span className="text-xs text-text-muted">items</span>
      </div>
    ),

    preview: <ProductPreview products={wishlist.products ?? []} />,

    createdAt: formatDate(wishlist.createdAt),

    updatedAt: formatDate(wishlist.updatedAt),
  }));

  return (
    <main className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-5">
        <div className="flex w-full flex-col justify-between gap-5 rounded-3xl border border-border-subtle bg-surface-elevated p-5 sm:flex-row sm:items-center md:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[1px] text-accent">
              Wishlist Dashboard
            </p>

            <div className="mt-1 flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-accent-light text-accent">
                <Heart size={21} />
              </div>

              <h2 className="text-2xl font-extrabold text-text-primary md:text-3xl">
                Wishlists
              </h2>
            </div>

            <p className="mt-2 max-w-xl text-sm text-text-secondary">
              Monitor customer wishlists and discover which products customers
              are interested in.
            </p>
          </div>

          <div className="rounded-2xl border border-border-subtle bg-surface-card px-5 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-[1.2px] text-text-muted">
              Total Wishlists
            </p>

            <p className="mt-1 text-2xl font-bold tabular-nums text-text-primary">
              {totalWishlists}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            icon={Heart}
            label="Total Wishlists"
            value={totalWishlists}
            description="Created wishlists"
            isLoading={isStatsLoading}
          />

          <StatCard
            icon={ShoppingBag}
            label="Saved Products"
            value={totalWishlistProducts}
            description="Products saved in wishlists"
            isLoading={isStatsLoading}
          />

          <StatCard
            icon={TrendingUp}
            label="Average Products"
            value={averageProducts}
            description="Products per wishlist"
            isLoading={isStatsLoading}
          />
        </div>
        <section className="overflow-hidden rounded-3xl border border-border-subtle bg-surface-card">
          <div className="flex flex-col gap-3 border-b border-border-subtle p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[1px] text-accent">
                Customer Interest
              </p>

              <h3 className="mt-1 text-lg font-bold text-text-primary">
                Top Wishlist Products
              </h3>

              <p className="mt-1 text-xs text-text-muted">
                Products customers add to their wishlists most often.
              </p>
            </div>

            <div className="flex size-10 items-center justify-center rounded-xl bg-accent-light text-accent">
              <TrendingUp size={18} />
            </div>
          </div>

          <div className="p-5 md:p-6">
            {isStatsLoading ? (
              <TopProductsSkeleton />
            ) : topProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {topProducts.map((product, index) => (
                  <TopProductCard
                    key={product.productId || product._id}
                    product={product}
                    rank={index + 1}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Package}
                title="No wishlist products"
                description="There are no products to display yet."
              />
            )}
          </div>
        </section>
        <section className="w-full">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[1px] text-accent">
                Customer Wishlists
              </p>

              <h3 className="mt-1 text-lg font-bold text-text-primary">
                All Wishlists
              </h3>
            </div>

            <div className="rounded-xl border border-border-subtle bg-surface-card px-3 py-2">
              <span className="text-xs text-text-muted">Page</span>

              <span className="ml-1.5 text-sm font-semibold text-text-primary">
                {wishlistData?.currentPage ?? page}
              </span>

              <span className="mx-1 text-text-muted">/</span>

              <span className="text-sm font-semibold text-text-primary">
                {wishlistData?.totalPages ?? 1}
              </span>
            </div>
          </div>

          <Table columns={columns} rows={rows} isLoading={isWishlistLoading} />
        </section>
        <div className="mb-8 w-full">
          <Pagination
            currentPage={wishlistData?.currentPage || page}
            totalPages={wishlistData?.totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </main>
  );
}
