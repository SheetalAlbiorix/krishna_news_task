import React, { createContext, ReactNode, useContext, useState } from "react";
import { Appearance } from "react-native";
import { darkTheme, lightTheme } from "./colors";

type ThemeContextType = {
  isDark: boolean;
  theme: typeof lightTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  theme: lightTheme,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

type Props = { children: ReactNode };

export const ThemeProvider = ({ children }: Props) => {
  const colorScheme = Appearance.getColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === "dark");

  const toggleTheme = () => setIsDark((prev) => !prev);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
