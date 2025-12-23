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
import PendingUsers from "../pages/Admin/PendingUsers";

const AdminDashboard = lazy(() => import("../pages/Admin/AdminDashboard"));
const Users = lazy(() => import("../pages/Admin/Users"));
const EditUser = lazy(() => import("../pages/Admin/EditUsers"));
const ManageAccounts = lazy(() => import("../pages/Admin/ManageAccounts"));
const AdminSettings = lazy(() => import("../pages/Admin/Settings"));
const Reports = lazy(() => import("../pages/Admin/Reports"));

const LandingPage = lazy(() => import("../pages/LandingPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

const AccountPage = lazy(() => import("../pages/AccountPage"));
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
            <Route path="adminDashboard" element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="users/edit/:id" element={<EditUser />} />
            <Route path="pending-users" element={<PendingUsers />} />
            <Route path="manage-accounts" element={<ManageAccounts />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="reports" element={<Reports />} />

            <Route path="accounts" element={<AccountPage />} />
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
