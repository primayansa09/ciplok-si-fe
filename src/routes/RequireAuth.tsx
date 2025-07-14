import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const RequireAuth: React.FC = () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
