import { Suspense } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { PageLoader } from "./PageLoader";
import { Film } from "lucide-react";
import { ThemeToggle, useThemeSync } from "@/features/theme-toggle";

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  `rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-brand-soft text-brand"
      : "text-secondary hover:bg-surface hover:text-primary"
  }`;

export const AppLayout = () => {
  useThemeSync();
  return (
    <div className="bg-canvas text-primary flex min-h-screen flex-col transition-colors duration-200">
      <header className="bg-header-glass border-border-subtle sticky top-0 z-40 h-16 w-full border-b backdrop-blur-md">
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link to="/movies" className="flex shrink-0 items-center gap-2.5">
            <Film size={24} className="text-brand" />
            <span className="text-lg font-bold tracking-tight">
              Movie Explorer
            </span>
          </Link>
          <nav
            className="flex items-center gap-1 sm:gap-2"
            aria-label="Main navigation"
          >
            <NavLink to="/movies" className={navLinkClassName}>
              Movies
            </NavLink>
            <NavLink to="/collections" className={navLinkClassName}>
              Collections
            </NavLink>
            <NavLink to="/watchlist" className={navLinkClassName}>
              Watchlist
            </NavLink>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
