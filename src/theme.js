import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { getCookie, setCookie } from "./helpers/cookies/cookies";

// color desing token
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#f6f6f8",
          200: "#eceef1",
          300: "#e3e5eb",
          400: "#d9dde4",
          500: "#d0d4dd",
          600: "#a6aab1",
          700: "#7d7f85",
          800: "#535558",
          900: "#2a2a2c",
        },
        primary: {
          100: "#e0edff",
          200: "#c2dbff",
          300: "#a3cafe",
          400: "#85b8fe",
          500: "#66a6fe",
          600: "#5285cb",
          700: "#3d6498",
          800: "#294266",
          900: "#142133",
        },
        error: "#F44336",
        background: {
          default: "#1E1E2D",
          reversed: "#F2F4F7",
        },
      }
    : {
        grey: {
          100: "#2a2a2c",
          200: "#535558",
          300: "#7d7f85",
          400: "#a6aab1",
          500: "#d0d4dd",
          600: "#d9dde4",
          700: "#e3e5eb",
          800: "#eceef1",
          900: "#f6f6f8",
        },
        primary: {
          100: "#d6e7ff",
          200: "#294266",
          300: "#3d6498",
          400: "#5285cb",
          500: "#66a6fe",
          600: "#85b8fe",
          700: "#a3cafe",
          800: "#c2dbff",
          900: "#e0edff",
        },
        error: "#F44336",
        button: {
          lighter: "#009ef7",
          darker: "#6ea2f5",
        },
        background: {
          default: "#F2F4F7",
          reversed: "#1E1E2D",
        },
      }),
});

//mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            // dark pallete
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.grey[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#1E1E2D",
            },
          }
        : {
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.grey[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#F2F4F7",
            },
          }),
    },
    typography: {
      fontFamily: ["Figtree", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Figtree", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Figtree", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Figtree", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Figtree", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Figtree", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Figtree", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState(() => {
    const savedMode = getCookie("theme");
    if (savedMode) return savedMode;

    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDarkMode ? "dark" : "light";
  });

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => {
          const newMode = prev === "light" ? "dark" : "light";
          setCookie("theme", newMode);
          return newMode;
        }),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
