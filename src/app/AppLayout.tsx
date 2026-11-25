import { Suspense } from "react";
import { Outlet } from "react-router";
import { PageLoader } from "./PageLoader";

export const AppLayout = () => {
  return (
    <div>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};
