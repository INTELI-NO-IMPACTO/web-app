// src/pages/ArticleDetail.jsx
import { useMemo } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/* ========== layout base (seguindo o design system do app) ========== */

const Page = styled.main`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem 0 2rem;
`;

const Container = styled.section`
  width: min(700px, 94%);
  margin: 0 auto;
  padding-top: 320px;
  z-index: 10;
`;

const Hero = styled.figure`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 300px;
  margin: 0;
  background: ${({ theme }) =>
    theme.name === "dark"
      ? "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))"
      : "linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02))"};
  background-size: cover;
  background-position: center;
  border: none;
  overflow: hidden;
  display: grid;
  place-items: center;

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
    theme.name === "dark"
      ? "rgba(255,255,255,0.1)"
      : "rgba(0,0,0,0.08)"};
  margin: 0 0 1.2rem;
  border-radius: 1px;
`;

const TitleMain = styled.h1`
  font-size: clamp(1.4rem, 2.8vw, 1.8rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.heading};
  margin: 0 0 0.4rem;
  letter-spacing: -0.015em;
`;

const Meta = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 0.25rem 0 0.8rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/* ========== markdown estilizado (usando wrapper seguro) ========== */

const MarkdownWrapper = styled.div`
  h2 {
    font-size: clamp(1.05rem, 2.2vw, 1.25rem);
    font-weight: 600;
    color: ${({ theme }) => theme.colors.heading};
    margin: 1rem 0 0.25rem;
  }

  h3 {
    font-size: clamp(1rem, 2vw, 1.15rem);
    font-weight: 600;
    color: ${({ theme }) => theme.colors.heading};
    margin: 0.8rem 0 0.2rem;
  }

  p {
    font-size: 1.02rem;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 0.9rem;
  }

  strong {
    font-weight: 700;
  }

  em {
    font-style: italic;
  }

  a {
    color: ${({ theme }) => theme.colors.link};
    text-decoration: none;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.linkHover};
  }

  ul,
  ol {
    padding-left: 1.25rem;
    margin: 0 0 0.9rem;
  }

  li {
    margin: 0.2rem 0;
  }

  blockquote {
    margin: 0.6rem 0;
    padding-left: 0.8rem;
    border-left: 3px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", monospace;
    background: ${({ theme }) => theme.colors.surfaceElevated};
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: 0 0.25rem;
    border-radius: 6px;
  }

  pre {
    background: ${({ theme }) => theme.colors.surfaceElevated};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 12px;
    padding: 1rem;
    overflow: auto;
    margin: 0.6rem 0 1rem;
  }

  img {
    max-width: 100%;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    display: block;
    margin: 0.5rem 0;
  }
`;

/* ========== mock markdown para demonstração ========== */

const MOCK_MD = {
  "1": `# Título principal do artigo

![Legenda opcional da imagem](https://picsum.photos/1200/675)

**Autor:** Equipe Editorial  
**Data:** Hoje

## Título principal

Resumo do artigo Resumo do artigo Resumo do artigo Resumo do artigo Resumo do artigo Resumo do artigo.

Corpo do texto com mais detalhes. Você pode trazer contexto, dados e referências. Esse parágrafo é apenas um exemplo para testar o fluxo visual e a legibilidade do layout.

## Título secundário

Resumo do artigo Resumo do artigo Resumo do artigo Resumo do artigo Resumo do artigo Resumo do artigo.

Outro parágrafo com informações complementares, mantendo a hierarquia tipográfica e o ritmo de leitura de acordo com o HIG.

> Uma citação curta para destacar uma ideia.

- Ponto 1
- Ponto 2
- Ponto 3

\`trecho de código\`

\`\`\`js
function ola(){ console.log("Olá!"); }
\`\`\`
`,
};

/* ========== utilitário: extrai metadados do markdown ========== */

function extractMarkdownMeta(md) {
  if (!md) return { title: "Artigo", content: "" };

  const titleMatch = md.match(/^\s*#\s+(.+)\s*$/m);
  const title = titleMatch ? titleMatch[1].trim() : "Artigo";
  let content = titleMatch ? md.replace(titleMatch[0], "").trimStart() : md;

  const imgMatch = content.match(/!\[([^\]]*)\]\(([^)]+)\)/);
  const heroUrl = imgMatch ? imgMatch[2] : "";
  const caption = imgMatch ? imgMatch[1] : "";
  if (imgMatch) content = content.replace(imgMatch[0], "").trimStart();

  const authorMatch = content.match(/\*\*Autor:\*\*\s*(.+)/i);
  const dateMatch = content.match(/\*\*Data:\*\*\s*(.+)/i);
  const author = authorMatch ? authorMatch[1].trim() : "—";
  const date = dateMatch ? dateMatch[1].trim() : "—";

  content = content
    .replace(/\*\*Autor:\*\*.*\n?/i, "")
    .replace(/\*\*Data:\*\*.*\n?/i, "")
    .trimStart();

  return { title, heroUrl, caption, author, date, content };
}

/* ========== componente principal ========== */

export default function ArticleDetail() {
  const { id } = useParams();

  const md = useMemo(() => MOCK_MD[id] ?? Object.values(MOCK_MD)[0], [id]);
  const { title, heroUrl, caption, author, date, content } = useMemo(
    () => extractMarkdownMeta(md),
    [md]
  );

  return (
    <Page>
      <Container>
        {heroUrl && (
          <Hero aria-label="Imagem principal do artigo">
            <img src={heroUrl} alt="" />
            {caption && <figcaption>{caption}</figcaption>}
          </Hero>
        )}

        <Divider />

        <TitleMain>{title}</TitleMain>
        <Meta>
          <span>{author}</span>•<span>{date}</span>
        </Meta>

        <MarkdownWrapper>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </MarkdownWrapper>
      </Container>
    </Page>
  );
}
