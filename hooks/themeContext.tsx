// themeContext.tsx
import { colors } from "@/constants/color";
import React, { createContext, ReactNode, useContext, useState } from "react";

type ThemeType = "light" | "dark";

interface ThemeContextProps {
  theme: ThemeType;
  colors: typeof colors.light | typeof colors.dark;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  colors: colors.light,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors: theme === "light" ? colors.light : colors.dark,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
