import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectRole, selectIsAuthorize } from "../redux/services/authSlice";

import { useProfile } from "../services/apiHooks/authHook";

const RequireAdmin = () => {
  const role = useSelector(selectRole);
  const isAuthorize = useSelector(selectIsAuthorize);

  const { data, isLoading, isFetching, isError } = useProfile();

  if (isLoading || isFetching) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="size-15 animate-spin rounded-full border-6 border-color-accent border-r-transparent" />
      </div>
    );
  }

  if (data?.success) {
    if (role !== "admin") {
      return <Navigate to="/" replace />;
    }

    return <Outlet />;
  }

  if (isError && !isAuthorize) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthorize) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

export default RequireAdmin;
