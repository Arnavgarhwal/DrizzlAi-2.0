import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-xl bg-background/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] overflow-hidden"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.div
            key="moon"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            <Moon className="w-5 h-5" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            <Sun className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};
