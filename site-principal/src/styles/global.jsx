// src/styles/global.jsx
import { createGlobalStyle } from "styled-components";

/**
 * Tema refinado com base na paleta:
 * Roxo profundo (#400E75), violeta (#AD28D4), magenta (#B52AC7),
 * dourado suave (#F5BF66) e tons neutros.
 *
 * Filosofia: neutro e legível, com acentos personalizados.
 * Evita poluição visual, mantém foco no conteúdo.
 */

export const themeLight = {
  name: "light",
  colors: {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    surfaceElevated: "#F8F6FB",     // leve nuance lilás
    text: "#1C1C1E",
    textSecondary: "#6C6C70",
    heading: "#2E0C58",             // roxo discreto
    icons: "#3A3A3C",
    border: "#E1E1E6",
    borderHover: "#C8C8CF",

    primary: "#AD28D4",             // violeta como cor de ação
    primaryHover: "#B52AC7",
    onPrimary: "#FFFFFF",

    link: "#AD28D4",
    linkHover: "#9021AD",

    focus: "#F5BF66",               // foco dourado para contraste quente

    scrollbar: "#D3D3D8",
    scrollbarHover: "#BEBEC3",
    scrollbarTrack: "transparent",

    success: "#2ECC71",
    warning: "#F5BF66",
    danger: "#E63946",
  },
  radii: {
    sm: "8px",
    md: "10px",
    lg: "12px",
    pill: "999px",
  },
  shadows: {
    card: "0 1px 3px rgba(0,0,0,0.05)",
    cardHover: "0 4px 12px rgba(173,40,212,0.08)",
    button: "0 1px 2px rgba(0,0,0,0.08)",
    buttonHover: "0 4px 10px rgba(173,40,212,0.15)",
    input: "0 0 0 0 transparent",
    inputFocus: "0 0 0 3px rgba(245,191,102,0.25)",
  },
};

export const themeDark = {
  name: "dark",
  colors: {
    background: "#0E0E11",
    surface: "#18181B",
    surfaceElevated: "#232326",
    text: "#E5E5EA",
    textSecondary: "#9C9CA3",
    heading: "#F5BF66",
    icons: "#B0B0B6",
    border: "#2F2F33",
    borderHover: "#4A4A50",

    primary: "#B52AC7",
    primaryHover: "#AD28D4",
    onPrimary: "#FFFFFF",

    link: "#B52AC7",
    linkHover: "#F5BF66",

    focus: "#F5BF66",

    scrollbar: "#3A3A3C",
    scrollbarHover: "#4A4A4D",
    scrollbarTrack: "transparent",

    success: "#30D158",
    warning: "#F5BF66",
    danger: "#FF453A",
  },
  radii: {
    sm: "8px",
    md: "10px",
    lg: "12px",
    pill: "999px",
  },
  shadows: {
    card: "0 2px 8px rgba(0,0,0,0.3)",
    cardHover: "0 6px 20px rgba(181,42,199,0.18)",
    button: "0 1px 2px rgba(0,0,0,0.3)",
    buttonHover: "0 4px 14px rgba(173,40,212,0.25)",
    input: "0 0 0 0 transparent",
    inputFocus: "0 0 0 3px rgba(245,191,102,0.2)",
  },
};

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }

  :root { color-scheme: ${({ theme }) => (theme.name === "dark" ? "dark" : "light")}; }

  html {
    font-size: 100%;
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
  }

  [vw] {
  z-index: 99999 !important;
  position: fixed !important;
  }

  [vw-access-button] {
    z-index: 999999 !important;
    position: fixed !important;
    bottom: 20px !important;
    right: 20px !important;
  }

  body {
    margin: 0;
    font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display",
      "Segoe UI", Roboto, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-weight: 400;
    line-height: 1.6;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color .25s ease, color .25s ease;
  }

  h1, h2, h3 {
    color: ${({ theme }) => theme.colors.heading};
    font-weight: 700;
    margin: 0 0 .75rem 0;
    line-height: 1.25;
    letter-spacing: -0.015em;
  }
  h1 { font-size: 2rem; }
  h2 { font-size: 1.625rem; }
  h3 { font-size: 1.375rem; }

  a {
    color: ${({ theme }) => theme.colors.link};
    text-decoration: none;
    transition: color .2s ease;
  }
  a:hover { color: ${({ theme }) => theme.colors.linkHover}; }
  a:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
    border-radius: 6px;
  }

  button {
    font: inherit;
    cursor: pointer;
    border: none;
    border-radius: ${({ theme }) => theme.radii.pill};
    padding: .65rem 1.15rem;
    font-weight: 600;
    font-size: .95rem;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onPrimary};
    box-shadow: ${({ theme }) => theme.shadows.button};
    transition: transform .06s ease, box-shadow .2s ease, background .2s ease;
  }
  button:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    box-shadow: ${({ theme }) => theme.shadows.buttonHover};
  }
  button:active { transform: scale(0.985); }
  button:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }

  .card {
    background: ${({ theme }) => theme.colors.surface};
    border-radius: ${({ theme }) => theme.radii.lg};
    padding: 1.25rem;
    box-shadow: ${({ theme }) => theme.shadows.card};
    transition: box-shadow .25s ease;
  }
  .card:hover { box-shadow: ${({ theme }) => theme.shadows.cardHover}; }
`;

export default GlobalStyle;
