import React from "react";
import {
  selectIsAuthorize,
  selectRole,
  setProfile,
} from "../redux/services/authSlice";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useProfile } from "../services/apiHooks/authHook";

const RequireAdmin = () => {
  const role = useSelector(selectRole);
  const isAuthorize = useSelector(selectIsAuthorize);
  const { isLoading, data, error } = useProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="size-15 border-6 border-color-accent border-r-transparent rounded-full animate-spin"></span>
      </div>
    );
  } else if (!data?.success && error && (role !== "admin" || !isAuthorize)) {
    return <Navigate to="/login" replace />;
  } else if (error?.statusCode === 401) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RequireAdmin;
