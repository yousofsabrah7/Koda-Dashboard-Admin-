import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { adminWishlist, adminWishlistStatus } from "../api/wishlistApi";

export const useAdminWishlist = (page, limit) => {
  const query = useQuery({
    queryKey: ["adminWishlist", page, limit],
    queryFn: () => adminWishlist(page, limit),
    enabled: Boolean(page && limit),
  });

  useEffect(() => {
    if (query.isError) {
      const message = query.error?.message || "Something went wrong";

      toast.error(message);
    }
  }, [query.isError, query.error]);

  return query;
};

export const useAdminWishlistStatus = () => {
  const query = useQuery({
    queryKey: ["adminWishlistStatus"],
    queryFn: adminWishlistStatus,
  });
  useEffect(() => {
    if (query.isError) {
      const message = query.error?.message || "Something went wrong";

      toast.error(message);
    }
  }, [query.isError, query.error]);

  return query;
};
