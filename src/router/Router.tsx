import { lazy, Suspense } from "react";
import Layout from "../components/Layout";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const LoginPage = lazy(() => import("../pages/LoginPage"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
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
