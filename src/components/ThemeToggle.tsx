import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="nb-border nb-shadow-sm inline-flex h-9 w-9 shrink-0 items-center justify-center bg-background text-lg font-bold transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
    >
      <span aria-hidden>{isDark ? "☀" : "☾"}</span>
    </button>
  );
}

