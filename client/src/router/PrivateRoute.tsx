import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "./router";

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("accessToken");
  const isAuth = Boolean(token);

  return isAuth ? children : <Navigate to={ROUTES.LOGIN} replace />;
}
