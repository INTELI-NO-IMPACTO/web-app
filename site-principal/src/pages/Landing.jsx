import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { listArticles } from "../lib/api";
import fotoArt from "../assets/fotoart.jpg";

export default function Landing() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // helpers
  const fmtDate = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("pt-BR", { timeZone: "America/Recife" });
    } catch {
      return "";
    }
  };

  const excerptFromMd = (md) => {
    if (!md) return "";
    const text = md
      .replace(/`{1,3}[\s\S]*?`{1,3}/g, "")
      .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
      .replace(/\[[^\]]*\]\([^)]+\)/g, "")
      .replace(/[#*_>~-]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    return text.length > 180 ? text.slice(0, 180) + "…" : text;
  };

  useEffect(() => {
    async function load() {
      setLoading(true);
      setErr(null);
      try {
        const data = await listArticles();
        const mapped =
          (data?.articles ?? []).map((a) => ({
            id: a.id,
            title: a.title,
            date: fmtDate(a.created_at ?? a.updated_at ?? Date.now()),
            excerpt: excerptFromMd(a.body_md),
            image: a.link_image || fotoArt,
          })) ?? [];
        setArticles(mapped.slice(0, 6)); // mostra só os 6 mais recentes
      } catch (e) {
        setErr(e.message || "Erro ao carregar artigos");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const emptyHint = useMemo(
    () => (!loading && !err && articles.length === 0),
    [loading, err, articles.length]
  );

  return (
    <Page>
      <ContentMask>
        <Container>
          <SectionHeader>Artigos</SectionHeader>

          {loading && <Info>Carregando…</Info>}
          {err && <ErrorBox>{err}</ErrorBox>}
          {emptyHint && <Info>Nenhum artigo disponível.</Info>}

          {!loading && !err && articles.length > 0 && (
            <Feed>
              {articles.map((a) => (
                <ArticleItem to={`/articles/${a.id}`} key={`art-${a.id}`}>
                  <Thumb>
                    <img
                      src={a.image}
                      alt={`Capa do artigo ${a.title}`}
                      loading="lazy"
                    />
                  </Thumb>
                  <ArticleContent>
                    <ArticleTitle>{a.title}</ArticleTitle>
                    <ArticleMeta>Publicação: {a.date}</ArticleMeta>
                    <ArticleExcerpt>{a.excerpt}</ArticleExcerpt>
                  </ArticleContent>
                </ArticleItem>
              ))}
            </Feed>
          )}

          <SectionHeader as="h2">Denúncia</SectionHeader>
          <Panel>
            <SmallText>Você precisa fazer alguma denúncia?</SmallText>
            <SmallText>
              Utilize <Strong>_____________________</Strong> como principal meio
              de contatar uma denúncia segura para você.
            </SmallText>
            <PrimaryButton to='https://wa.me/1133113556'>Fazer denúncia</PrimaryButton>
          </Panel>
        </Container>
      </ContentMask>

      <BottomFade aria-hidden />
    </Page>
  );
}

/* ============================= */
/* ======= Styled Components ==== */
/* ============================= */

const Page = styled.main`
  --bottom-bar-h: 68px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem 0 calc(1rem + var(--bottom-bar-h));
`;

const ContentMask = styled.div``;

const Container = styled.section`
  width: min(700px, 94%);
  margin: 0 auto 30px;
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

const Feed = styled.div`
  display: grid;
  gap: 14px;
  margin-bottom: 22px;
`;

const ArticleItem = styled(Link)`
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 12px;
  height: 150px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, transform 0.12s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Thumb = styled.div`
  background: ${({ theme }) =>
    theme.name === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ArticleContent = styled.div`
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ArticleTitle = styled.h3`
  font-size: clamp(0.98rem, 1.9vw, 1.06rem);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.heading};
`;

const ArticleMeta = styled.p`
  font-size: 0.9rem;
  opacity: 0.75;
`;

const ArticleExcerpt = styled.p`
  font-size: 0.92rem;
  line-height: 1.5;
  opacity: 0.9;
`;

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
`;

const Info = styled.p`
  text-align: center;
  opacity: 0.8;
  padding: 1rem 0.5rem;
`;

const ErrorBox = styled.p`
  text-align: center;
  color: #b00020;
  background: rgba(176, 0, 32, 0.08);
  border: 1px solid rgba(176, 0, 32, 0.25);
  border-radius: 10px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
`;

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
