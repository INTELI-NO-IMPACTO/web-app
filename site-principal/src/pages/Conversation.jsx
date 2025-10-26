// src/pages/Conversation.jsx
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

/* ================== layout base ================== */

const Page = styled.main`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem 0;
`;

const Container = styled.section`
  width: min(700px, 94%);
  margin: 0 auto;
`;

const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
`;

const HeaderTitle = styled.h1`
  font-size: clamp(1.2rem, 2.2vw, 1.5rem);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.heading};
  margin: 0;
`;


/* ================== chat layout ================== */

const ChatCard = styled.section`
  display: grid;
  grid-template-rows: 1fr auto;
  height: clamp(590px, 70vh, 820px);
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 18px;
  padding: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  overflow: hidden;
`;

const Messages = styled.div`
  overflow: auto;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const DayDivider = styled.div`
  align-self: center;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) =>
    theme.name === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  padding: 0.15rem 0.6rem;
  margin: 4px 0 2px;
`;

/* ================== mensagens ================== */

const Row = styled.div`
  display: grid;
  grid-template-columns: ${({ $from }) =>
    $from === "me" ? "1fr auto" : "auto 1fr"};
  align-items: end;
  gap: 8px;
`;

const Avatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 999px;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  background: ${({ theme }) =>
    theme.name === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"};
  display: ${({ $hide }) => ($hide ? "none" : "grid")};
  place-items: center;
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Bubble = styled.div`
  max-width: ${({ $from }) => ($from === "me" ? "88%" : "78%")};
  min-width: 40px;
  justify-self: ${({ $from }) => ($from === "me" ? "end" : "start")};
  padding: 0.85rem 1.1rem;
  line-height: 1.5;
  font-size: 1rem;

  color: ${({ theme, $from }) =>
    $from === "me" ? theme.colors.onPrimary : theme.colors.text};
  background: ${({ theme, $from }) =>
    $from === "me" ? theme.colors.primary : theme.colors.surfaceElevated};

  border-radius: ${({ $from }) =>
    $from === "me" ? "18px 18px 6px 18px" : "18px 18px 18px 6px"};
  border: 1px solid
    ${({ theme, $from }) =>
      $from === "me" ? "transparent" : theme.colors.border};
  word-break: break-word;
  white-space: pre-wrap;
  transition: all 0.15s ease-in-out;
`;

const Typing = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
  margin-left: 36px;
  animation: blink 1.4s infinite;
  @keyframes blink {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }
`;

/* ================== composer ================== */

const Composer = styled.form`
  display: grid;
  padding: 10px 2px 2px;
`;

const ComposerBox = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) =>
    theme.name === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"};
  border-radius: 999px;
  padding: 6px;
`;

const Input = styled.input`
  height: 42px;
  border: none;
  outline: none;
  padding: 0 12px;
  border-radius: 999px;
  color: ${({ theme }) => theme.colors.text};
  background: transparent;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Send = styled.button`
  height: 42px;
  min-width: 48px;
  padding: 0 12px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-weight: 700;
  border: 1px solid transparent;
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

/* ================== componente ================== */

export default function Conversation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [assistantTyping, setAssistantTyping] = useState(false);
  const [creatingChat, setCreatingChat] = useState(false);
  const endRef = useRef(null);

  const USER_ID = localStorage.getItem("user_id") || "";
  const token = localStorage.getItem("access_token");

  // 🔹 Cria um session_id único (hash) e guarda no localStorage
  const [sessionId] = useState(() => {
    const key = `session_${id || "global"}`;
    const existing = localStorage.getItem(key);
    if (existing) return existing;
    const newId = Math.random().toString(36).substring(2, 10);
    localStorage.setItem(key, newId);
    return newId;
  });

  // 🔹 Carrega histórico do chat existente
  useEffect(() => {
    if (!id || id === "new") {
      setLoading(false);
      return;
    }

    async function fetchHistory() {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/chat/history/${id}?limit=50`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );

        if (!res.ok) throw new Error("Erro ao carregar histórico");
        const data = await res.json();

        const formatted =
          data.messages?.map((m, idx) => ({
            id: idx,
            from: m.role === "user" ? "me" : "other",
            text: m.content,
          })) ?? [];

        setMessages(formatted);
      } catch (err) {
        console.error("Erro ao buscar histórico:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, [id, token]);

  // 🔹 Scroll automático
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, assistantTyping]);


  // 🔹 Envia mensagem
  const onSend = async (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value || sending || !USER_ID) return;

    const newMsg = { id: Date.now(), from: "me", text: value };
    setMessages((prev) => [...prev, newMsg]);
    setText("");
    setSending(true);
    setAssistantTyping(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: value,
          user_id: USER_ID,
          session_id: sessionId,
        }),
      });

      if (!res.ok) throw new Error("Erro ao enviar mensagem");
      const data = await res.json();

      await new Promise((r) => setTimeout(r, 400));

      const botMsg = {
        id: Date.now() + 1,
        from: "other",
        text: data.response || "Sem resposta do servidor.",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 99, from: "other", text: "❌ Erro ao obter resposta." },
      ]);
    } finally {
      setAssistantTyping(false);
      setSending(false);
    }
  };

  if (loading)
    return (
      <Page>
        <Container>
          <p>Carregando conversa...</p>
        </Container>
      </Page>
    );

  return (
    <Page>
      <Container>
        <HeaderBox>
          <HeaderTitle>Conversa</HeaderTitle>
        </HeaderBox>

        <ChatCard>
          <Messages>
            <DayDivider>Hoje</DayDivider>

            {messages.map((m) => (
              <Row key={m.id} $from={m.from}>
                {m.from === "me" ? <span /> : <Avatar>•</Avatar>}
                <div>
                  <Bubble $from={m.from}>{m.text}</Bubble>
                </div>
              </Row>
            ))}

            {assistantTyping && (
              <Row $from="other">
                <Avatar>•</Avatar>
                <Typing>Assistente está digitando...</Typing>
              </Row>
            )}

            <div ref={endRef} />
          </Messages>

          <Composer onSubmit={onSend}>
            <ComposerBox>
              <Input
                aria-label="Mensagem"
                placeholder={
                  sending ? "Aguardando resposta..." : "Digite sua mensagem…"
                }
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={sending}
              />
              <Send type="submit" aria-label="Enviar" disabled={sending}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </Send>
            </ComposerBox>
          </Composer>
        </ChatCard>
      </Container>
    </Page>
  );
}
