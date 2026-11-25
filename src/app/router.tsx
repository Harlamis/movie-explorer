import { createBrowserRouter, Navigate } from "react-router";
import { PageLoader } from "./PageLoader";
import { AppLayout } from "./AppLayout";

export const router = createBrowserRouter([
  {
    hydrateFallbackElement: <PageLoader />,
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={"/movies"} replace />,
      },
      {
        path: "movies",
        lazy: () => import("@/pages/MoviesCatalogPage"),
      },
      {
        path: "movies/:movieId",
        lazy: () => import("@/pages/MovieDetailsPage"),
      },
      {
        path: "collections",
        lazy: () => import("@/pages/CollectionsPage"),
      },
      {
        path: "watchlist",
        lazy: () => import("@/pages/WatchlistPage"),
      },
      {
        path: "*",
        lazy: () => import("@/pages/NotFoundPage"),
      },
    ],
  },
]);
