// src/main.jsx (ou o arquivo onde você cria o Root/render)
import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import GlobalStyle, { themeLight, themeDark } from "./styles/global";

function useSystemTheme() {
  const getPref = () =>
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const [mode, setMode] = useState(getPref);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setMode(e.matches ? "dark" : "light");
    mq.addEventListener?.("change", handler);
    // Safari antigo:
    mq.addListener?.(handler);
    return () => {
      mq.removeEventListener?.("change", handler);
      mq.removeListener?.(handler);
    };
  }, []);

  return mode;
}

function Root() {
  const mode = useSystemTheme();
  const theme = useMemo(() => (mode === "dark" ? themeDark : themeLight), [mode]);

  // Define data-theme no html para integração ampla
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme.name);
  }, [theme]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <GlobalStyle />
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
