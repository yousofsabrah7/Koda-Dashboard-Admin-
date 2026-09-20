import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  selectToken,
  setAdmin,
  setAuthorize,
  setLogin,
  setLogout,
  setProfile,
  setRole,
} from "../../redux/services/authSlice";
import {
  changeUserRole,
  getProfile,
  loginUser,
  logoutUser,
} from "../api/authApi";
import { useEffect } from "react";

const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
};
export const getAuthToken = () => localStorage.getItem("token");

export const useLogin = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      if (response?.user?.role !== "admin") {
        toast.error("User not has access to dashboard");
      } else {
        const token = response?.token;
        if (token) {
          setAuthToken(token);
        }
        queryClient.invalidateQueries({
          queryKey: ["profile"],
        });
        dispatch(setLogin(response));
        toast.success("Welcome back! Logged in successfully.");
      }
    },
    onError: (error) => {
      const message =
        error?.message || "Login failed. Please check your email and password.";
      toast.error(message);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.clear();
      setAuthToken(null);
      dispatch(setLogout());
      toast.success("Logged out successfully.");
    },
    onError: (error) => {
      queryClient.clear();
      setAuthToken(null);
      const message = error?.message || "An error occurred during logout.";
      toast.error(message);
    },
  });
};

export const useProfile = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const query = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: !!token,
  });
  useEffect(() => {
    if (query.isSuccess) {
      dispatch(setProfile(query.data));
    }
  }, [query.isSuccess, query.data, dispatch]);

  useEffect(() => {
    if (query.isError) {
      const message = query.error?.message || "Something went wrong";
      dispatch(setAuthorize(query.error?.response?.status));
      toast.error(query.error?.response?.status === 401 ? null : message);
    }
  }, [query.isError, query.error, dispatch, token]);
  return query;
};

export const useChangeRole = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: changeUserRole,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      dispatch(setRole(response.user.role));
      toast.success("User role updated successfully.");
    },
    onError: (error) => {
      const message =
        error?.message || "Failed to update user role. Check your permissions.";
      toast.error(message);
    },
  });
};
