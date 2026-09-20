import {
  getDashboardStats,
  getOrderStatuses,
  getTopProducts,
  getRecentOrders,
} from "./DashBoardMockData";
import StatCard from "./StatCard";
import OrderStatusCard from "./OrderStatusCard";
import Header from "../UI/Header";
import { useAdminDashboard } from "../../services/apiHooks/OrdersHook";
import RevenueChart from "../Chart/RevenueChart";
import Loading from "../../utils/Loading";
const HomeDashboard = () => {
  // const cardStyles = {
  //     orders: "bg-emerald-400",
  //     pending: "bg-orange-400",
  //     revenue: "bg-pink-500",
  //     monthlySales: "bg-sky-400",
  //     topProduct: "bg-purple-500",
  //     users: "bg-slate-400",
  // };
  const { data, isLoading, isError } = useAdminDashboard();

  const dashboard = data?.dashboard;

  const dashboardStats = getDashboardStats(dashboard);
  const orderStatuses = getOrderStatuses(dashboard);
  const topProducts = getTopProducts(dashboard);
  const recentOrders = getRecentOrders(dashboard);

  if (isLoading) {
    return (
      <Loading page="dashboard" message={"We prepare data of your store"} />
    );
  }

  return (
    <div className="min-h-screen bg-surface-base flex flex-col gap-8 px-8 py-6">
      <Header
        title={"Admin overview"}
        desc={"Real-time commerce health"}
        subtitle={"just Admin"}
      />

      <div className="DashBoardStates grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            type={stat.type}
          />
        ))}
      </div>
      <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-5">
        <RevenueChart data={data?.dashboard?.dailyRevenue || []} />
        <div className="orderStatus  border border-border-subtle bg-surface-card p-5 sm:p-6 lg:p-8 rounded-3xl shadow-xs">
          <div className="top flex flex-row items-center justify-between gap-4">
            <div className="left flex flex-col gap-2">
              <p className="text-accent text-xs md:text-sm uppercase font-mono font-semibold">
                Order status
              </p>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-text-primary">
                Live fulfillment breakdown
              </h2>
            </div>
            <p className="bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 rounded-full py-1 px-3 w-fit font-mono font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Updated from API
            </p>
          </div>

          <div className="mapping grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {orderStatuses.map((status1) => (
              <OrderStatusCard
                key={status1.id}
                status={status1.status}
                count={status1.count}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="topProducts border border-border-subtle bg-surface-card p-5 sm:p-6 lg:p-8 rounded-3xl shadow-xs">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-text-primary">
            Best sellers
          </h2>

          <div className="flex flex-col gap-4 mt-4">
            {topProducts.map((product) => (
              <article
                key={product.id}
                className="border border-border-subtle bg-surface-elevated/60 hover:border-border-strong rounded-3xl flex flex-col sm:flex-row p-4 items-start sm:items-center gap-4 sm:gap-6 transition"
              >
                <img
                  src={product.image}
                  alt=""
                  className="size-14 rounded-2xl object-cover shrink-0 border border-border-subtle"
                />

                <div className="min-w-0 flex-1">
                  <p className="font-semibold break-words text-text-primary">
                    {product.name}
                  </p>

                  <p className="text-sm font-mono sm:text-base text-text-muted">
                    {product.unitsSold} units sold • ${product.revenue}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="w-full border border-border-subtle bg-surface-card p-5 sm:p-6 lg:p-8 rounded-3xl shadow-xs">
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex flex-col">
              <p className="text-accent text-sm uppercase font-mono font-semibold">
                Recent orders
              </p>

              <h2 className="text-xl md:text-2xl font-bold font-display text-text-primary">
                Latest customer activity
              </h2>
            </div>

            <p className="bg-accent-light border border-accent/20 text-xs text-accent rounded-full py-1 px-3 w-fit font-mono font-medium">
              {recentOrders.length} orders
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="border border-border-subtle bg-surface-elevated/60 rounded-3xl flex flex-col md:flex-row md:items-center md:justify-between px-5 py-6 gap-4"
              >
                <div className="min-w-0">
                  <h2 className="font-semibold text-text-primary">
                    {order.customer}
                  </h2>

                  <p className="text-xs font-mono text-text-muted mt-1">
                    {order.product} • {order.date}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 rounded-full py-1 px-3 font-medium">
                    {order.status}
                  </span>

                  <span className="font-mono font-bold text-text-primary">
                    $
                    {Number(order.total).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
