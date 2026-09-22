const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};
const dashboardStatsConfig = [
    {
        id: 1,
        title: "Total Orders",
        subtitle: "All orders received",
        type: "orders",
        getValue: (dashboard) => dashboard.orders?.total ?? 0,
    },
    {
        id: 2,
        title: "Pending Orders",
        subtitle: "Awaiting action",
        type: "pending",
        getValue: (dashboard) => dashboard.orders?.pending ?? 0,
    },
    {
        id: 3,
        title: "Revenue",
        subtitle: "Total gross revenue",
        type: "revenue",
        isMoney: true,
        getValue: (dashboard) => dashboard.revenue?.total ?? 0,
    },
    {
        id: 4,
        title: "This Month",
        subtitle: "Monthly sales target",
        type: "monthlySales",
        isMoney: true,
        getValue: (dashboard) => dashboard.revenue?.thisMonth ?? 0,
    },
    {
        id: 5,
        title: "Top Product",
        subtitle: "Best seller",
        type: "topProduct",
        getValue: (dashboard) =>
            dashboard.topProducts?.[0]?.name ?? "No product",
    },
    {
        id: 6,
        title: "Users",
        subtitle: "Registered customers",
        type: "users",
        getValue: (dashboard) => dashboard.totalCustomers ?? 0,
    },
];

export const getDashboardStats = (dashboard) => {
    if (!dashboard) return [];

    return dashboardStatsConfig.map((stat) => {
        const value = stat.getValue(dashboard);

        return {
            ...stat,
            value: stat.isMoney
                ? `$${Number(value).toLocaleString()}`
                : value,
        };
    });
};

// =========================
// Order Status
// =========================

export const getOrderStatuses = (dashboard) => {
    return (
        dashboard?.ordersByStatus?.map((item) => ({
            id: item._id,
            status: item._id,
            count: item.count,
        })) ?? []
    );
};

// =========================
// Top Products
// =========================

export const getTopProducts = (dashboard) => {
    return (
        dashboard?.topProducts?.map((product) => ({
            id: product._id,
            name: product.name,
            image: product.image,
            unitsSold: product.totalSold,
            revenue: product.revenue,
        })) ?? []
    );
};


// =========================
// Recent Orders
// =========================

export const getRecentOrders = (dashboard) => {
    return (
        dashboard?.recentOrders?.map((order) => ({
            id: order._id,
            customer: order.shippingAddress?.fullName ?? "Customer",
            product: order.items?.[0]?.name ?? "No product",
            date: formatDate(order.createdAt),
            status: order.status,
            total: order.totalPrice,
        })) ?? []
    );
};