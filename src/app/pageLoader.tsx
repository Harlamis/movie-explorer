import { Suspense } from "react";
import { Spinner } from "@heroui/react";
export const PageLoader = ({ children }: { children?: React.ReactNode }) => (
  <Suspense
    fallback={
      <div className="flex w-full items-center justify-center h-full">
        <Spinner size="lg" color="accent" aria-label="Loading..." />
      </div>
    }
  >
    {children}
  </Suspense>
);
