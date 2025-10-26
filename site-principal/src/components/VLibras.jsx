// src/components/VLibras.jsx
import { useEffect } from "react";

export default function VLibras() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.onload = () => new window.VLibras.Widget("https://vlibras.gov.br/app");
    document.body.appendChild(script);

    // Correção de posicionamento
    const style = document.createElement("style");
    style.textContent = `
      [vw], [vw-access-button] {
        position: fixed !important;
        z-index: 999999 !important;
      }
      [vw-access-button] {
        bottom: 20px !important;
        right: 20px !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return <div vw className="enabled"><div vw-access-button /><div vw-plugin-wrapper /></div>;
}
