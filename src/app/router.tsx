import { createBrowserRouter, Navigate } from "react-router";
import { PageLoader } from "./pageLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    hydrateFallbackElement: <PageLoader />,
    lazy: () => import("@/pages/MoviesCatalogPage"),
    element: <Navigate to="/movies" replace />,
  },
  {
    path: "/movies",
    lazy: () => import("@/pages/MoviesCatalogPage"),
    hydrateFallbackElement: <PageLoader />,
  },
  {
    path: "movies/:id",
    lazy: () => import("@/pages/MovieDetailsPage"),
    hydrateFallbackElement: <PageLoader />,
  },
  {
    path: "collections",
    lazy: () => import("@/pages/CollectionsPage"),
    hydrateFallbackElement: <PageLoader />,
  },
  {
    path: "watchlist",
    lazy: () => import("@/pages/WatchlistPage"),
    hydrateFallbackElement: <PageLoader />,
  },
  {
    path: "*",
    lazy: () => import("@/pages/NotFoundPage"),
    hydrateFallbackElement: <PageLoader />,
  },
]);
