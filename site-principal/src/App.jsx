// src/App.jsx
import styled from "styled-components";
import { useLocation, matchPath } from "react-router-dom";
import BottomNav from "./components/BottomNav/BottomNav";
import Router from "./router.jsx";
import WavesFixed from "./components/WavesFixed";
import VLibras from "./components/VLibras";

const Root = styled.div`
  min-height: 100dvh;
  position: relative;
  background: ${({ theme }) => theme.colors.background};
`;

const Content = styled.div`
  position: relative;
  z-index: 1; /* garante conteúdo acima das ondas (ondas usam z-index:0) */
`;

export default function App() {
  const { pathname } = useLocation();
  const hideWaves = !!matchPath({ path: "/articles/:id", end: true }, pathname);
  const hideBottomNav = !!matchPath({ path: "/login", end: true }, pathname) || !!matchPath({ path: "/register", end: true }, pathname);

  return (
    <Root>
      {!hideWaves && <WavesFixed />}
      <Content>
        <VLibras />
        <Router />
        {!hideBottomNav && <BottomNav />}
      </Content>
    </Root>
  );
}

