import { createBrowserRouter } from "react-router";
import { PageLoader } from "./pageLoader";
import { AppLayout } from "./AppLayout";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        lazy: () => import("@/pages/MoviesCatalogPage"),
        hydrateFallbackElement: <PageLoader />,
      },
      {
        path: "/movies",
        lazy: () => import("@/pages/MoviesCatalogPage"),
        hydrateFallbackElement: <PageLoader />,
      },
      {
        path: "/movies/:id",
        lazy: () => import("@/pages/MovieDetailsPage"),
        hydrateFallbackElement: <PageLoader />,
      },
      {
        path: "/collections",
        lazy: () => import("@/pages/CollectionsPage"),
        hydrateFallbackElement: <PageLoader />,
      },
      {
        path: "/watchlist",
        lazy: () => import("@/pages/WatchlistPage"),
        hydrateFallbackElement: <PageLoader />,
      },
      {
        path: "*",
        lazy: () => import("@/pages/NotFoundPage"),
        hydrateFallbackElement: <PageLoader />,
      },
    ],
  },
]);
