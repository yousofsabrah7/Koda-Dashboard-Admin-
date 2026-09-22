import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

import Table from "../../components/UI/Table";
import Filter from "../../components/UI/Filter";
import Search from "../../components/UI/Search";
import Pagination from "../../components/UI/Pagination";
import ViewOrder from "../../components/orders/ViewOrder";

import {
  useAllOrders,
  useOrderStatus,
} from "../../services/apiHooks/OrdersHook";

import { orderFilters } from "../../utils/Filters";

const index = () => {
  // =========================
  // State
  // =========================

  const [showFilters, setShowFilters] = useState(false);

  const [showOrder, setShowOrder] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    status: "",
    payment: "",
    method: "",
    from: "",
    to: "",
    sortBy: "",
    sortDir: "",
  });

  const {
    data: ordersData,
    isLoading,
    isError,
  } = useAllOrders(page, 10, filters);

  const { mutate: changeOrderStatus, isPending: isUpdatingStatus } =
    useOrderStatus();
  const columns = [
    {
      key: "order",
      label: "Order",
    },
    {
      key: "customer",
      label: "Customer",
    },
    {
      key: "date",
      label: "Date",
    },
    {
      key: "status",
      label: "Status",
      type: "status",
    },
    {
      key: "payment",
      label: "Payment",
      type: "payment",
    },
    {
      key: "total",
      label: "Total",
      type: "money",
    },
  ];

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    setPage(1);
  };

  // =========================
  // Search
  // =========================

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  // =========================
  // Open Order
  // =========================

  const handleRowClick = (row) => {
    if (!row?.originalOrder) return;

    setSelectedOrder(row.originalOrder);

    requestAnimationFrame(() => {
      setShowOrder(true);
    });
  };

  // =========================
  // Close Order
  // =========================

  const handleCloseOrder = () => {
    setShowOrder(false);

    setTimeout(() => {
      setSelectedOrder(null);
    }, 300);
  };

  const handleStatusChange = (newStatus) => {
    if (!selectedOrder?._id) return;
    changeOrderStatus({
      orderId: selectedOrder._id,
      newStatus,
    });
  };

  const rows =
    ordersData?.orders
      ?.filter((order) => {
        if (!search.trim()) return true;

        const query = search.trim().toLowerCase();

        return (
          order?._id?.toLowerCase().includes(query) ||
          order?.user?.username?.toLowerCase().includes(query) ||
          order?.user?.email?.toLowerCase().includes(query) ||
          order?.status?.toLowerCase().includes(query) ||
          order?.paymentStatus?.toLowerCase().includes(query) ||
          order?.paymentMethod?.toLowerCase().includes(query)
        );
      })
      ?.map((order) => ({
        id: order._id,
        originalOrder: order,
        order: (
          <span className="font-mono text-xs font-medium text-text-primary">
            #{order?._id?.slice(-8).toUpperCase()}
          </span>
        ),

        customer: (
          <div className="flex items-center gap-3">
            <div
              className="
                flex size-9 shrink-0
                items-center justify-center
                rounded-xl
                bg-surface-elevated
                text-sm font-semibold
                text-text-secondary
                ring-1 ring-border-subtle
              "
            >
              {order?.user?.username?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="min-w-0 text-left">
              <p className="truncate text-sm font-medium text-text-primary">
                {order?.user?.username || "Unknown user"}
              </p>

              <p className="truncate text-[11px] text-text-muted">
                {order?.user?.email || "No email"}
              </p>
            </div>
          </div>
        ),

        date: order?.createdAt
          ? new Date(order.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "—",

        status: order?.status || "—",

        payment: {
          status: order?.paymentStatus || "—",
          method: order?.paymentMethod || "—",
        },

        total: order?.totalPrice || 0,
      })) || [];

  return (
    <main className="relative min-h-screen w-full px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-5">
        <div
          className="
            flex w-full
            items-start justify-between
            gap-5
            rounded-3xl
            border border-border-subtle
            bg-surface-elevated
            p-5
            sm:items-center
            md:p-8
          "
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[1px] text-accent">
              Orders Dashboard
            </p>

            <h2 className="text-2xl font-extrabold text-text-primary md:text-3xl">
              Orders
            </h2>
          </div>

          <div
            className="
              rounded-xl
              border border-border-subtle
              flex items-center
              flex-col justify-center
              bg-surface-card
              px-4 py-2.5
            "
          >
            <span className="text-2xl font-semibold text-text-primary">
              {ordersData?.total ?? 0}
            </span>

            <span className="ml-2 text-sm text-text-muted">total orders</span>
          </div>
        </div>
        <div
          className="
            w-full
            rounded-3xl
            border border-border-subtle
            bg-surface-card
            p-5
            md:p-6
          "
        >
          <div className="flex gap-3">
            <div className="min-w-0 flex-1">
              <Search value={search} onChange={handleSearchChange} />
            </div>

            <button
              type="button"
              onClick={() => setShowFilters((prev) => !prev)}
              className={`
                flex size-12 shrink-0
                items-center justify-center
                rounded-xl
                border
                transition
                cursor-pointer

                ${
                  showFilters
                    ? "border-accent bg-accent-light text-accent"
                    : "border-border-subtle bg-surface-card text-text-secondary hover:border-border-strong"
                }
              `}
            >
              <SlidersHorizontal size={18} />
            </button>
          </div>
          <div
            className={`
              overflow-hidden
              transition-all duration-300
              ${
                showFilters
                  ? "mt-4 max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }
            `}
          >
            <Filter
              filters={orderFilters}
              values={filters}
              onChange={handleFilterChange}
              showFilters={showFilters}
            />
          </div>
        </div>

        <Table
          columns={columns}
          rows={rows}
          isLoading={isLoading}
          isError={isError}
          onRowClick={handleRowClick}
        />

        <div className="mb-8 w-full">
          <Pagination
            currentPage={ordersData?.currentPage || page}
            totalPages={ordersData?.totalPages || 1}
            onPageChange={setPage}
          />
        </div>
      </div>
      <ViewOrder
        showOrder={showOrder}
        selectedOrder={selectedOrder}
        setShowOrder={handleCloseOrder}
        order={selectedOrder}
        onStatusChange={handleStatusChange}
        isUpdatingStatus={isUpdatingStatus}
      />
    </main>
  );
};
export default index;
