import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "./router";

import HomePage from "../pages/Home/Home";
import LoginPage from "../pages/LoginPage/Login";
import { PrivateRoute } from "./PrivateRoute";
import AuthPage from "../pages/AuthPage/AuthPage";

function AppRouter() {
  return (
    <Routes>
      <Route
        path={ROUTES.HOME}
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route path={ROUTES.REGISTER} element={<AuthPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
    </Routes>
  );
}

export default AppRouter;
