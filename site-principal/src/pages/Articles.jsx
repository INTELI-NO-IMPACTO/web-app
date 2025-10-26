// src/pages/Articles.jsx
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import fotoArt from "../assets/fotoart.jpg";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export default function Articles() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // helpers
  const fmtDate = (iso) => {
    try {
      const d = new Date(iso);
      // dd/mm/yyyy (BR)
      return d.toLocaleDateString("pt-BR", { timeZone: "America/Recife" });
    } catch {
      return "";
    }
  };

  const firstTag = (tags) => {
    if (!tags) return "";
    const t = String(tags)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)[0];
    return t ? t.charAt(0).toUpperCase() + t.slice(1) : "";
  };

  // bem simples só pra não vir markdown bruto gigante
  const excerptFromMd = (md) => {
    if (!md) return "";
    const text = md
      .replace(/`{1,3}[\s\S]*?`{1,3}/g, "") // code blocks/inline
      .replace(/!\[[^\]]*\]\([^)]+\)/g, "") // imagens
      .replace(/\[[^\]]*\]\([^)]+\)/g, "") // links
      .replace(/[#*_>~-]/g, "") // sinais markdown comuns
      .replace(/\s+/g, " ")
      .trim();
    return text.length > 220 ? text.slice(0, 220) + "…" : text;
  };

  useEffect(() => {
    const ac = new AbortController();

    async function load() {
      setLoading(true);
      setErr(null);
      try {
        const url = `${API_BASE}/articles?page=1&page_size=20`;
        const res = await fetch(url, {
          method: "GET",
          signal: ac.signal,
          // inclua credentials se sua API usa cookie de sessão:
          // credentials: "include",
        });
        if (!res.ok) {
          throw new Error(`Falha ao buscar artigos (${res.status})`);
        }
        const data = await res.json();
        const mapped =
          (data?.articles ?? []).map((a) => ({
            id: a.id,
            title: a.title,
            date: fmtDate(a.created_at ?? a.updated_at ?? Date.now()),
            tag: firstTag(a.tags),
            excerpt: excerptFromMd(a.body_md),
            image: a.link_image || null,
          })) ?? [];
        setItems(mapped);
      } catch (e) {
        if (e.name !== "AbortError") setErr(e.message || "Erro ao carregar artigos");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => ac.abort();
  }, []);

  const emptyHint = useMemo(
    () => (!loading && !err && items.length === 0),
    [loading, err, items.length]
  );

  return (
    <Page>
      <ContentMask>
        <Container>
          <Header>Artigos</Header>

          {loading && <Info>Carregando…</Info>}
          {err && <ErrorBox>{err}</ErrorBox>}
          {emptyHint && <Info>Não há artigos para mostrar.</Info>}

          {!loading && !err && items.length > 0 && (
            <List>
              {items.map((it) => (
                <ArticleCard to={`/articles/${it.id}`} key={`art-${it.id}`}>
                  <Thumb>
                    <img
                      src={it.image || fotoArt}
                      alt={`Capa de ${it.title}`}
                      loading="lazy"
                    />
                  </Thumb>

                  <Content>
                    <RowTop>
                      <Title>{it.title}</Title>
                      {it.tag && <Tag>{it.tag}</Tag>}
                    </RowTop>

                    <Date>Publicação: {it.date}</Date>
                    <Excerpt>{it.excerpt}</Excerpt>
                  </Content>
                </ArticleCard>
              ))}
            </List>
          )}
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
  width: min(700px, 92%);
  margin: 0 auto;
`;

const Header = styled.h1`
  text-align: center;
  font-size: clamp(1.2rem, 2.2vw, 1.5rem);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.heading};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 0.75rem 1rem;
  margin-bottom: 14px;
`;

const Info = styled.p`
  text-align: center;
  opacity: 0.8;
  padding: 1rem 0.5rem;
`;

const ErrorBox = styled.p`
  text-align: center;
  color: #b00020;
  background: rgba(176,0,32,0.08);
  border: 1px solid rgba(176,0,32,0.25);
  border-radius: 10px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
`;

const List = styled.div`
  display: grid;
  gap: 18px;
`;

const ArticleCard = styled(Link)`
  display: grid;
  grid-template-columns: 140px 1fr;
  width: 100%;
  min-height: 180px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.12s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 6px 18px rgba(0,0,0,0.08);
    transform: translateY(-1px);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Thumb = styled.div`
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  min-height: 130px;
  background: ${({ theme }) =>
    theme.name === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 560px) {
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const Content = styled.div`
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const RowTop = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  justify-content: space-between;
`;

const Title = styled.h3`
  font-size: clamp(1rem, 2.1vw, 1.2rem);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.heading};
  margin-right: 12px;
`;

const Tag = styled.span`
  flex-shrink: 0;
  align-self: flex-start;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) =>
    theme.name === "dark" ? "rgba(10,132,255,0.14)" : "rgba(10,132,255,0.10)"};
  border: 1px solid
    ${({ theme }) =>
      theme.name === "dark" ? "rgba(10,132,255,0.28)" : "rgba(10,132,255,0.22)"};
`;

const Date = styled.p`
  font-size: 0.92rem;
  opacity: 0.75;
`;

const Excerpt = styled.p`
  font-size: 0.95rem;
  line-height: 1.55;
  opacity: 0.9;
  color: ${({ theme }) => theme.colors.text};
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
