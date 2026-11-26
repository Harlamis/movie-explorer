import { useThemeStore } from "./useThemeStore";

import { useEffect } from "react";

export const useThemeSync = () => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    root.classList.add(theme);
  }, [theme]);
};
