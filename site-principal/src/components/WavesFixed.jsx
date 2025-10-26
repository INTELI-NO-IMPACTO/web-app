// src/components/WavesFixed.jsx
import styled from "styled-components";

const Side = styled.svg`
  position: fixed;
  top: 0;
  width: 20dvw;
  height: 100vh;
  pointer-events: none;
  opacity: ${({ theme }) => (theme?.name === "dark" ? 0.28 : 0.45)};
  z-index: 5;

  &.left { left: 0; }
  &.right { right: 0; transform: scaleX(-1); transform-origin: center; }
`;

export default function WavesFixed() {
  // se a a pagina for /articles/id, nao renderizar as ondas
  

  return (
    <>
      <Side
        className="left"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
        focusable="false"
      >
        {/* Azul */}
        <path
          d="M0,0 C15,18 12,35 0,50 L0,100 L22,100 C40,80 34,60 20,42 C10,29 7,14 0,0 Z"
          fill="#4285F4"
        />
        {/* Vermelho */}
        <path
          d="M0,15 C10,28 20,45 12,60 C8,68 5,77 0,85 L0,100 L10,100 C22,90 28,78 26,64 C24,49 14,32 0,15 Z"
          fill="#EA4335"
          opacity="0.9"
        />
        {/* Amarelo */}
        <path
          d="M0,35 C8,45 16,56 18,66 C20,76 15,88 8,100 L0,100 L0,75 C3,67 5,58 3,48 C2,43 1,39 0,35 Z"
          fill="#FBBC05"
          opacity="0.9"
        />
        {/* Verde */}
        <path
          d="M0,55 C6,63 10,72 11,80 C12,87 10,94 7,100 L0,100 L0,82 C2,74 2,64 0,55 Z"
          fill="#34A853"
          opacity="0.9"
        />
      </Side>

      <Side
        className="right"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
        focusable="false"
      >
        {/* Azul (espelhado via scaleX(-1) no CSS) */}
        <path
          d="M0,0 C15,18 12,35 0,50 L0,100 L22,100 C40,80 34,60 20,42 C10,29 7,14 0,0 Z"
          fill="#4285F4"
        />
        <path
          d="M0,15 C10,28 20,45 12,60 C8,68 5,77 0,85 L0,100 L10,100 C22,90 28,78 26,64 C24,49 14,32 0,15 Z"
          fill="#EA4335"
          opacity="0.9"
        />
        <path
          d="M0,35 C8,45 16,56 18,66 C20,76 15,88 8,100 L0,100 L0,75 C3,67 5,58 3,48 C2,43 1,39 0,35 Z"
          fill="#FBBC05"
          opacity="0.9"
        />
        <path
          d="M0,55 C6,63 10,72 11,80 C12,87 10,94 7,100 L0,100 L0,82 C2,74 2,64 0,55 Z"
          fill="#34A853"
          opacity="0.9"
        />
      </Side>
    </>
  );
}
