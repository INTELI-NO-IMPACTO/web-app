// src/styles/global.jsx
import { createGlobalStyle } from "styled-components";

/**
 * Princípios aplicados (Apple HIG):
 * - Tipografia legível: SF system stack, tamanhos confortáveis e line-height generoso
 * - Contraste e legibilidade: cores de texto equilibradas em claro/escuro
 * - Foco visível: anel azul iOS (#0A84FF) com offset
 * - Superfícies e cantos suaves: radius 12–14px, sombras sutis
 * - Movimento mínimo: respeita prefers-reduced-motion
 * - Integração com color-scheme para selects/scrollbars nativos
 */

export const themeLight = {
  name: "light",
  colors: {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    surfaceElevated: "#F2F2F7",    // iOS secondary system background (light)
    text: "#1C1C1E",               // label primary
    textSecondary: "#6C6C70",      // label secondary
    heading: "#000000",
    icons: "#3A3A3C",
    border: "#D1D1D6",             // separator
    borderHover: "#B9BBC1",

    primary: "#0A84FF",            // iOS system blue
    primaryHover: "#0A7AEC",
    onPrimary: "#FFFFFF",

    link: "#0A84FF",
    linkHover: "#0066CC",

    focus: "#0A84FF",

    scrollbar: "#C7C7CC",
    scrollbarHover: "#AEAEB2",
    scrollbarTrack: "transparent",

    success: "#34C759",
    warning: "#FF9F0A",
    danger:  "#FF3B30",
  },
  radii: {
    sm: "10px",
    md: "12px",
    lg: "14px",
    pill: "999px",
  },
  shadows: {
    card: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
    cardHover: "0 6px 18px rgba(0,0,0,0.12)",
    button: "0 1px 2px rgba(0,0,0,0.08)",
    buttonHover: "0 4px 12px rgba(10,132,255,0.18)",
    input: "0 0 0 0 transparent",
    inputFocus: "0 0 0 3px rgba(10,132,255,0.15)",
  },
};

export const themeDark = {
  name: "dark",
  colors: {
    background: "#000000",
    surface: "#1C1C1E",            // iOS system background (dark)
    surfaceElevated: "#2C2C2E",    // iOS secondary system background (dark)
    text: "#E5E5EA",
    textSecondary: "#8E8E93",
    heading: "#FFFFFF",
    icons: "#B0B0B6",
    border: "#3A3A3C",
    borderHover: "#5A5A5E",

    primary: "#0A84FF",
    primaryHover: "#2F95FF",
    onPrimary: "#FFFFFF",

    link: "#0A84FF",
    linkHover: "#3EA0FF",

    focus: "#0A84FF",

    scrollbar: "#3A3A3C",
    scrollbarHover: "#4A4A4D",
    scrollbarTrack: "transparent",

    success: "#30D158",
    warning: "#FFD60A",
    danger:  "#FF453A",
  },
  radii: {
    sm: "10px",
    md: "12px",
    lg: "14px",
    pill: "999px",
  },
  shadows: {
    card: "0 2px 8px rgba(0,0,0,0.35)",
    cardHover: "0 10px 28px rgba(0,0,0,0.45)",
    button: "0 1px 2px rgba(0,0,0,0.35)",
    buttonHover: "0 6px 18px rgba(10,132,255,0.22)",
    input: "0 0 0 0 transparent",
    inputFocus: "0 0 0 3px rgba(10,132,255,0.25)",
  },
};

const GlobalStyle = createGlobalStyle`
  /* Box model consistente */
  *, *::before, *::after { box-sizing: border-box; }

  /* Suporte nativo a temas (inputs/scrollbars) */
  :root { color-scheme: ${({ theme }) => (theme.name === "dark" ? "dark" : "light")}; }

  html {
    font-size: 100%;
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
  }

  /* Tipografia estilo iOS (SF system stack) */
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

  /* Títulos com hierarquia clara (HIG) */
  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.heading};
    font-weight: 700;
    letter-spacing: -0.015em;
    margin: 0 0 .75rem 0;
    line-height: 1.25;
  }
  h1 { font-size: 2rem; }   /* ~32px */
  h2 { font-size: 1.625rem; } /* ~26px */
  h3 { font-size: 1.375rem; } /* ~22px */

  p { margin: 0 0 1rem 0; }

  /* Links */
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

  /* Botões estilo iOS: suaves, arredondados, com realce discreto */
  button {
    font: inherit;
    cursor: pointer;
    border: none;
    border-radius: ${({ theme }) => theme.radii.pill};
    padding: .7rem 1.25rem;
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
  button:active { transform: scale(0.98); }
  button:disabled { opacity: .55; cursor: not-allowed; }

  button:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }

  /* Campos de formulário */
  input, textarea, select {
    font: inherit;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.md};
    padding: .75rem 1rem;
    width: 100%;
    transition: border-color .2s ease, background .2s ease, box-shadow .2s ease;
    box-shadow: ${({ theme }) => theme.shadows.input};
    outline: none;
  }
  input::placeholder, textarea::placeholder { color: ${({ theme }) => theme.colors.textSecondary}; }
  input:hover, textarea:hover, select:hover { border-color: ${({ theme }) => theme.colors.borderHover}; }
  input:focus, textarea:focus, select:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surfaceElevated};
    box-shadow: ${({ theme }) => theme.shadows.inputFocus};
  }

  /* Cards estilo iOS */
  .card {
    background: ${({ theme }) => theme.colors.surface};
    border-radius: ${({ theme }) => theme.radii.lg};
    padding: 1.25rem;
    box-shadow: ${({ theme }) => theme.shadows.card};
    transition: box-shadow .2s ease, transform .06s ease;
  }
  .card:hover { box-shadow: ${({ theme }) => theme.shadows.cardHover}; }

  /* Acessibilidade: screen reader only */
  .sr-only {
    position: absolute !important;
    width: 1px; height: 1px;
    margin: -1px; border: 0; padding: 0;
    white-space: nowrap; clip-path: inset(50%); clip: rect(0 0 0 0); overflow: hidden;
  }

  /* Scrollbar discreta */
  ::-webkit-scrollbar { width: 10px; }
  ::-webkit-scrollbar-track { background: ${({ theme }) => theme.colors.scrollbarTrack}; }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.scrollbar};
    border-radius: 10px;
    border: 2px solid ${({ theme }) => theme.colors.scrollbarTrack};
  }
  ::-webkit-scrollbar-thumb:hover { background: ${({ theme }) => theme.colors.scrollbarHover}; }

  /* Animações suaves e respeito a reduced motion */
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-in { animation: fadeInUp .35s ease; }

  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
  }

  /* Responsividade base */
  @media (max-width: 768px) {
    body { font-size: 0.97rem; }
    h1 { font-size: 1.75rem; }
    h2 { font-size: 1.5rem; }
    h3 { font-size: 1.25rem; }
    button { padding: .65rem 1rem; }
  }
`;

export default GlobalStyle;
