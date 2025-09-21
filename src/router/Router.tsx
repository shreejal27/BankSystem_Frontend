import { lazy, Suspense } from "react";
import Layout from "../components/Layout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import AppLayout from "../components/AppLayout";
import ResetPasswordPage from "../pages/ResetPasswordPage";

const LandingPage = lazy(() => import("../pages/LandingPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

const DepositPage = lazy(() => import("../pages/DepositPage"));
const WithdrawPage = lazy(() => import("../pages/WithdrawPage"));
const TransferPage = lazy(() => import("../pages/TransferPage"));
const TransactionHistoryPage = lazy(
  () => import("../pages/TransactionHistoryPage")
);
const AccountProfilePage = lazy(() => import("../pages/AccountProfilePage"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />

        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="deposit" element={<DepositPage />} />
            <Route path="withdraw" element={<WithdrawPage />} />
            <Route path="transfer" element={<TransferPage />} />
            <Route path="transactions" element={<TransactionHistoryPage />} />
            <Route path="profile" element={<AccountProfilePage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </>
  )
);

function Router() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default Router;
