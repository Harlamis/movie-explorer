import { Button } from "@heroui/react";
import { useThemeStore } from "../model/useThemeStore";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  return (
    <Button
      isIconOnly
      onPress={toggleTheme}
      variant="tertiary"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
};
