// src/pages/Articles.jsx
import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import fotoArt from "../assets/fotoart.jpg";
import { listArticles } from "../lib/api";

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

export default function Articles() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const role = localStorage.getItem("user_role")?.toLowerCase();
  const token = localStorage.getItem("access_token");

  const fmtDate = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("pt-BR", { timeZone: "America/Recife" });
    } catch {
      return "";
    }
  };

  const firstTag = (tags) => {
    if (!tags) return "";
    const t = String(tags).split(",").map((s) => s.trim()).filter(Boolean)[0];
    return t ? t.charAt(0).toUpperCase() + t.slice(1) : "";
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
    return text.length > 220 ? text.slice(0, 220) + "…" : text;
  };

  const isValidImg = (src) => {
    if (!src || src === "string") return false;
    try { new URL(src); return true; } catch { return false; }
  };

  useEffect(() => {
    async function load() {
      setLoading(true);
      setErr(null);
      try {
        const data = await listArticles({ page: 1, page_size: 20 });
        const mapped =
          (data?.articles ?? []).map((a) => ({
            id: a.id,
            title: a.title,
            date: fmtDate(a.created_at ?? a.updated_at ?? Date.now()),
            tag: firstTag(a.tags),
            excerpt: excerptFromMd(a.body_md),
            image: isValidImg(a.link_image) ? a.link_image : fotoArt,
          })) ?? [];
        setItems(mapped);
      } catch (e) {
        setErr(e.message || "Erro ao carregar artigos");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const emptyHint = useMemo(
    () => (!loading && !err && items.length === 0),
    [loading, err, items.length]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErr(null);

    const form = e.target;
    const formData = new FormData(form);

    try {
      const res = await fetch(`${API_BASE}/articles`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
        mode: "cors"
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Falha ao criar artigo: ${errText}`);
      }

      form.reset();
      setShowModal(false);
      window.location.reload();
    } catch (e) {
      setErr(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Page>
      <ContentMask>
        <Container>
          <HeaderRow>
            <SectionHeader>Artigos</SectionHeader>
            {role !== "beneficiario" && (
              <AddButton onClick={() => setShowModal(true)}>+ Adicionar</AddButton>
            )}
          </HeaderRow>

          {loading && <Info>Carregando…</Info>}
          {err && <ErrorBox>{err}</ErrorBox>}
          {emptyHint && <Info>Não há artigos para mostrar.</Info>}

          {!loading && !err && items.length > 0 && (
            <List>
              {items.map((it) => (
                <ArticleCard href={`/articles/${it.id}`} key={`art-${it.id}`}>
                  <Thumb>
                    <img
                      src={it.image}
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

      {showModal && (
        <ModalOverlay>
          <ModalBox>
            <h2>Novo Artigo</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Título
                <input name="title" required minLength={3} />
              </label>
              <label>
                Tags (separadas por vírgula)
                <input name="tags" required />
              </label>
              <label>
                Conteúdo (Markdown)
                <textarea name="body_md" rows={5} required />
              </label>
              <label>
                Imagem (opcional)
                <input type="file" name="file" accept="image/*" />
              </label>

              <ButtonsRow>
                <Cancel type="button" onClick={() => setShowModal(false)}>
                  Cancelar
                </Cancel>
                <Submit disabled={submitting}>
                  {submitting ? "Enviando..." : "Publicar"}
                </Submit>
              </ButtonsRow>
            </form>
          </ModalBox>
        </ModalOverlay>
      )}

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

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Header = styled.h1`
  font-size: clamp(1.2rem, 2.2vw, 1.5rem);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.heading};
`;

const AddButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  padding: 0.5rem 0.9rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
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

const List = styled.div`
  display: grid;
  gap: 18px;
`;

const ArticleCard = styled.a`
  display: grid;
  grid-template-columns: 140px 1fr;
  text-decoration: none;
  height: 150px;
  color: inherit;
  background: ${({ theme }) => theme.colors.surface};
  background-cover: cover;
  background-position: center;
  background-repeat: no-repeat;
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
  background: ${({ theme }) =>
    theme.name === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
  justify-content: space-between;
  gap: 12px;
`;

const Title = styled.h3`
  font-size: clamp(1rem, 2.1vw, 1.2rem);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.heading};
`;

const Tag = styled.span`
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid
    ${({ theme }) =>
      theme.name === "dark"
        ? "rgba(10,132,255,0.28)"
        : "rgba(10,132,255,0.22)"};
`;

const SectionHeader = styled.h1`
  width: 700px;
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


const Date = styled.p`
  font-size: 0.92rem;
  opacity: 0.75;
`;

const Excerpt = styled.p`
  font-size: 0.95rem;
  line-height: 1.55;
  opacity: 0.9;
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

/* ===== Modal ===== */

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const ModalBox = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 16px;
  padding: 1.5rem;
  width: min(90%, 480px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);

  h2 { text-align: center; margin-bottom: 1rem; }

  form { display: flex; flex-direction: column; gap: 0.9rem; }

  input, textarea {
    width: 100%;
    padding: 0.6rem;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 0.95rem;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  label { display: flex; flex-direction: column; font-weight: 600; gap: 4px; }
`;

const ButtonsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const Cancel = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
`;

const Submit = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;
