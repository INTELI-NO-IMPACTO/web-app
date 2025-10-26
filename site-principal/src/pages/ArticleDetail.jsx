import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import fotoArt from "../assets/fotoart.jpg";

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setErr(null);

      try {
        const res = await fetch(`${API_BASE}/articles/${id}`, {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "any",
          },
        });

        if (!res.ok) throw new Error(`Erro ao buscar artigo: ${res.status}`);
        const data = await res.json();
        setArticle(data);

        if (data.link_doc) {
          const mdRes = await fetch(data.link_doc);
          if (!mdRes.ok) throw new Error("Erro ao buscar markdown.");
          const mdText = await mdRes.text();
          setContent(mdText);
        } else {
          setContent(data.body_md || "");
        }
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  const handleSave = async () => {
    if (!article) return;
    setSaving(true);
    setErr(null);

    try {
      const oldPath = article.link_doc?.replace(
        "https://tbpjrztrenxvijvesxcs.supabase.co/storage/v1/object/public/knowledge-base/",
        ""
      );

      // 1️⃣ Deletar arquivo antigo do Supabase (se existir)
      if (oldPath) {
        await fetch(`${API_BASE}/storage?destination_path=${encodeURIComponent(oldPath)}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      // 2️⃣ Criar novo arquivo temporário com o conteúdo atualizado
      const newBlob = new Blob([content], { type: "text/markdown" });
      const formData = new FormData();
      const newPath = `articles/${article.slug || article.id}/article_${Date.now()}.md`;
      formData.append("destination_path", newPath);
      formData.append("file", newBlob);

      const uploadRes = await fetch(`${API_BASE}/storage`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("Erro ao enviar arquivo para Supabase.");
      const uploadedUrl = await uploadRes.text();

      // 3️⃣ Atualizar artigo com novo link_doc
      const updateRes = await fetch(`${API_BASE}/articles/${article.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: article.title,
          body_md: content,
          tags: article.tags,
          link_doc: uploadedUrl,
          link_image: article.link_image,
          status: article.status || "draft",
        }),
      });

      if (!updateRes.ok) throw new Error("Erro ao atualizar artigo.");
      const updated = await updateRes.json();
      setArticle(updated);
      setEditMode(false);
      alert("✅ Artigo atualizado com sucesso!");
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Info>Carregando artigo...</Info>;
  if (err) return <ErrorMsg>Erro: {err}</ErrorMsg>;
  if (!article) return <Info>Artigo não encontrado.</Info>;

  const heroImage = article.link_image || fotoArt;
  const date = new Date(article.created_at).toLocaleDateString("pt-BR", {
    timeZone: "America/Recife",
  });

  return (
    <Page>
      <Hero>
        <img src={heroImage} alt={`Capa do artigo ${article.title}`} />
      </Hero>

      <Container>
        <TitleMain>{article.title}</TitleMain>
        <Meta>
          <span>Autor ID: {article.author_id}</span>•<span>{date}</span>
        </Meta>

        <Actions>
          <EditBtn onClick={() => setEditMode(true)}>✏️ Editar</EditBtn>
        </Actions>

        <Divider />

        <MarkdownWrapper>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </MarkdownWrapper>
      </Container>

      {editMode && (
        <ModalOverlay>
          <ModalBox>
            <h2>Editar Artigo</h2>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={18}
            />
            <ButtonsRow>
              <Cancel onClick={() => setEditMode(false)}>Cancelar</Cancel>
              <Submit onClick={handleSave} disabled={saving}>
                {saving ? "Salvando..." : "Salvar Alterações"}
              </Submit>
            </ButtonsRow>
          </ModalBox>
        </ModalOverlay>
      )}
    </Page>
  );
}

/* ========== styled components ========== */

const Info = styled.p`
  text-align: center;
  padding: 2rem;
  opacity: 0.8;
`;

const ErrorMsg = styled.p`
  text-align: center;
  padding: 2rem;
  color: #d32f2f;
`;

const Page = styled.main`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding-bottom: 3rem;
`;

const Container = styled.section`
  width: min(700px, 94%);
  margin: 0 auto;
  padding-top: 320px;
`;

const Hero = styled.figure`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 300px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: ${({ theme }) =>
    theme.name === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"};
  margin: 0 0 1.2rem;
`;

const TitleMain = styled.h1`
  font-size: clamp(1.4rem, 2.8vw, 1.8rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.heading};
  margin: 0 0 0.4rem;
`;

const Meta = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 0.25rem 0 0.8rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

const EditBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  font-weight: 600;
  cursor: pointer;
`;

const MarkdownWrapper = styled.div`
  p {
    font-size: 1.02rem;
    line-height: 1.7;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalBox = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 16px;
  padding: 1.5rem;
  width: min(90%, 600px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  textarea {
    width: 100%;
    min-height: 400px;
    font-family: monospace;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: 0.75rem;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
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
