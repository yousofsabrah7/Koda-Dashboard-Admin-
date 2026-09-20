export const orderFilters = [
  {
    name: "status",
    label: "Order Status",
    placeholder: "Order Status",
    options: [
      { value: "pending", label: "Pending" },
      { value: "processing", label: "Processing" },
      { value: "confirmed", label: "Confirmed" },
      { value: "shipped", label: "Shipped" },
      { value: "delivered", label: "Delivered" },
      { value: "cancelled", label: "Cancelled" },
      { value: "returned", label: "Returned" },
    ],
  },
  {
    name: "paymentStatus",
    label: "Payment",
    placeholder: "Payment Status",
    options: [
      { value: "pending", label: "Pending" },
      { value: "paid", label: "Paid" },
      { value: "failed", label: "Failed" },
      { value: "refunded", label: "Refunded" },
    ],
  },
  {
    name: "sortBy",
    label: "Sort By",
    options: [
      { value: "createdAt", label: "Created At" },
      { value: "updatedAt", label: "Updated At" },
      { value: "totalPrice", label: "Total Price" },
    ],
  },
  {
    name: "sortDir",
    label: "Sort Direction",
    options: [
      { value: "desc", label: "Newest" },
      { value: "asc", label: "Oldest" },
    ],
  },
];

export const productFilters = [
  {
    name: "category",
    label: "Category",
    options: [],
  },
  {
    name: "brand",
    label: "Brand",
    options: [],
  },
  {
    name: "minPrice",
    label: "Min Price",
    type: "number",
    placeholder: "Min Price",
  },
  {
    name: "maxPrice",
    label: "Max Price",
    type: "number",
    placeholder: "Max Price",
  },
  {
    name: "sort",
    label: "Sort",
    options: [
      { value: "price_asc", label: "Price: Low → High" },
      { value: "price_desc", label: "Price: High → Low" },
      { value: "rating", label: "Rating" },
    ],
  },
];
