// src/pages/Landing.jsx
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useMemo } from "react";

export default function Landing() {
  const articles = useMemo(
    () => [
      { id: "a1", title: "Título do artigo...", date: "20/09/2025", excerpt: "Resumo do artigo Resumo do artigo Resumo do artigo" },
      { id: "a2", title: "Título do artigo...", date: "20/09/2025", excerpt: "Resumo do artigo Resumo do artigo Resumo do artigo" },
      { id: "a3", title: "Título do artigo...", date: "20/09/2025", excerpt: "Resumo do artigo Resumo do artigo Resumo do artigo" },
      { id: "a1", title: "Título do artigo...", date: "20/09/2025", excerpt: "Resumo do artigo Resumo do artigo Resumo do artigo" },
      { id: "a2", title: "Título do artigo...", date: "20/09/2025", excerpt: "Resumo do artigo Resumo do artigo Resumo do artigo" },
      { id: "a3", title: "Título do artigo...", date: "20/09/2025", excerpt: "Resumo do artigo Resumo do artigo Resumo do artigo" },
      { id: "a1", title: "Título do artigo...", date: "20/09/2025", excerpt: "Resumo do artigo Resumo do artigo Resumo do artigo" },
      { id: "a2", title: "Título do artigo...", date: "20/09/2025", excerpt: "Resumo do artigo Resumo do artigo Resumo do artigo" },
      { id: "a3", title: "Título do artigo...", date: "20/09/2025", excerpt: "Resumo do artigo Resumo do artigo Resumo do artigo" },
    ],
    []
  );

  return (
    <Page>
      {/* Wrapper com máscara: após 85vh o conteúdo esvanece até ficar 100% transparente
          (evita “entrar” sob a bottom bar). Ajuste o spread (120px) se quiser um fade maior/menor. */}
      <ContentMask>
        <Container>
          <SectionHeader>Artigos</SectionHeader>

          <Feed>
            {articles.map((a, i) => (
              <ArticleItem to={`/articles/${a.id}`} key={`art-${a.id}-${i}`}>
                <ArticleTitle>{a.title}</ArticleTitle>
                <ArticleMeta>Publicação: {a.date}</ArticleMeta>
                <ArticleExcerpt>{a.excerpt}</ArticleExcerpt>
              </ArticleItem>
            ))}
          </Feed>

          <SectionHeader as="h2">Denúncia</SectionHeader>
          <Panel>
            <SmallText>Você precisa fazer alguma denúncia?</SmallText>
            <SmallText>
              Utilize <Strong>_____________________</Strong> como principal meio de contatar
              uma denúncia segura para você.
            </SmallText>
            <PrimaryButton to="/denuncia">Fazer denúncia</PrimaryButton>
          </Panel>
        </Container>
      </ContentMask>

      {/* Gradiente de segurança “por cima” (sobrepõe levemente o fundo perto da bottom bar).
          Caso sua bottom bar tenha outra altura, ajuste --bottom-bar-h. */}
      <BottomFade aria-hidden />
    </Page>
  );
}

/* ============================= */
/* ======= Styled Components ==== */
/* ============================= */

const Page = styled.main`
  /* Ajuste a altura da bottom bar se necessário */
  --bottom-bar-h: 68px;

  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  /* Espaço final para nada ficar escondido atrás da bottom bar */
  padding: 1rem 0 calc(1rem + var(--bottom-bar-h));
`;

/* 
 * Mascara global de fade:
 * - até 85vh: conteúdo 100% opaco
 * - de 85vh até ~85vh+120px: transição para transparente
 * - após isso: completamente transparente
 */
const ContentMask = styled.div`

`;

const Container = styled.section`
  width: min(700px, 94%);
  margin: 0 auto;
  margin-bottom: 30px;
`;

const SectionHeader = styled.h1`
  text-align: center;
  font-size: clamp(1.2rem, 2.2vw, 1.5rem);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.heading};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 0.6rem 1rem;
  margin-bottom: 14px;
`;

/* ----- Feed de artigos (notícias) ----- */
/* Sem overflow interno! É a página que rola. */
const Feed = styled.div`
  display: grid;
  gap: 14px;
  margin-bottom: 22px;
`;

const ArticleItem = styled(Link)`
  display: block;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  padding: 12px 14px;
  transition: border-color 0.2s ease, transform 0.12s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  }
`;

const ArticleTitle = styled.h3`
  font-size: clamp(0.98rem, 1.9vw, 1.06rem);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.heading};
  margin-bottom: 6px;
`;

const ArticleMeta = styled.p`
  font-size: 0.9rem;
  opacity: 0.75;
  margin-bottom: 6px;
`;

const ArticleExcerpt = styled.p`
  font-size: 0.92rem;
  line-height: 1.5;
  opacity: 0.9;
`;

/* ----- Bloco de denúncia ----- */
const Panel = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SmallText = styled.p`
  font-size: 0.95rem;
  line-height: 1.45;
  opacity: 0.85;
`;

const Strong = styled.span`
  opacity: 1;
  font-weight: 500;
`;

const PrimaryButton = styled(Link)`
  margin-top: 6px;
  display: inline-block;
  text-align: center;
  padding: 0.55rem 0.9rem;
  border-radius: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.onPrimary};
  background: ${({ theme }) => theme.colors.primary};
  border: 1px solid transparent;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
    border-radius: 12px;
  }
`;

/* 
 * Overlay de fade próximo à bottom bar (extra “polimento”).
 * Se sua bottom bar já tem um gradiente próprio, pode remover.
 */
const BottomFade = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 140px;
  pointer-events: none;
  background: linear-gradient(
    to top,
      ${({ theme }) => theme.colors.background} 0%,
      ${({ theme }) => theme.colors.background} 60%,
      rgba(255, 255, 255, 0) 100% 
  ); 
`;
