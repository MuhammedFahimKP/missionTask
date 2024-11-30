import { lazy, Suspense } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";

const Singin = lazy(() => import("@/components/Forms/SigninForm"));
const CustomForm = lazy(() => import("@/components/Forms/CustomForm"));
const Empolyee = lazy(() => import("@/pages/Empolyee"));

const routes: RouteObject[] = [
  {
    path: "",
    element: (
      <Suspense>
        <Empolyee />
      </Suspense>
    ),
  },

  {
    path: "/signin/",
    element: (
      <Suspense>
        <Singin />
      </Suspense>
    ),
  },
  {
    path: "forms/",
    element: (
      <Suspense>
        <CustomForm />
      </Suspense>
    ),
  },
];

const router = createBrowserRouter(routes);
const { navigate } = router;

export { navigate };
export default router;
