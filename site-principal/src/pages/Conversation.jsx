// src/pages/Conversation.jsx
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

/* ================== layout base (segue o padrão do Profile.jsx) ================== */

const Page = styled.main`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem 0;
`;

const Container = styled.section`
  width: min(700px, 94%);
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
  margin-bottom: 1rem;
`;

/* ================== chat card ================== */

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
  scrollbar-gutter: stable;
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

/* ================== mensagem ================== */

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
  max-width: 78%;
  justify-self: ${({ $from }) => ($from === "me" ? "end" : "start")};
  padding: 0.7rem 0.9rem;
  line-height: 1.45;
  font-size: 0.98rem;

  color: ${({ theme, $from }) =>
    $from === "me" ? theme.colors.onPrimary : theme.colors.text};
  background: ${({ theme, $from }) =>
    $from === "me" ? theme.colors.primary : theme.colors.surfaceElevated};

  /* cantos assimétricos (bolha iOS) */
  border-radius: ${({ $from }) =>
    $from === "me" ? "18px 18px 6px 18px" : "18px 18px 18px 6px"};
  border: 1px solid
    ${({ theme, $from }) =>
      $from === "me" ? "transparent" : theme.colors.border};
  box-shadow: 0 1px 3px
      ${({ theme }) =>
        theme.name === "dark" ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.06)"},
    inset 0 -1px 0
      ${({ theme, $from }) =>
        $from === "me"
          ? "rgba(255,255,255,0.08)"
          : theme.name === "dark"
          ? "rgba(255,255,255,0.03)"
          : "rgba(0,0,0,0.03)"};
  word-break: break-word;
`;

const Meta = styled.time`
  display: block;
  margin-top: 4px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: ${({ $from }) => ($from === "me" ? "right" : "left")};
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

  &:focus {
    box-shadow: ${({ theme }) => theme.shadows.inputFocus};
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
    box-shadow: none;
    transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: transparent;
    background: transparent;
    color: ${({ theme }) => theme.colors.primaryHover};
    box-shadow: none;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  svg {
    display: block;
  }
`;

/* ================== mock data ================== */

const seed = [
  { id: 1, from: "other", text: "Exemplo chat", time: "09:20" },
  { id: 2, from: "me", text: "Exemplo chat", time: "09:22" },
  { id: 3, from: "other", text: "Exemplo chat", time: "09:25" },
];

/* ================== componente ================== */

export default function Conversation() {
  const [items, setItems] = useState(seed);
  const [text, setText] = useState("");
  const endRef = useRef(null);

  const onSend = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        from: "me",
        text: value,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setText("");
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [items.length]);

  return (
    <Page>
      <Container>
        <Header>Chat</Header>

        <ChatCard role="region" aria-label="Conversa">
          <Messages>
            <DayDivider>Hoje</DayDivider>

            {items.map((m, idx) => {
              const showAvatar = m.from !== "me";
              return (
                <Row key={m.id} $from={m.from}>
                  {m.from === "me" ? <span /> : <Avatar $hide={!showAvatar}>•</Avatar>}

                  <div>
                    <Bubble $from={m.from}>{m.text}</Bubble>
                    <Meta $from={m.from}>{m.time}</Meta>
                  </div>
                </Row>
              );
            })}

            <div ref={endRef} />
          </Messages>

          <Composer onSubmit={onSend}>
            <ComposerBox>
              <Input
                aria-label="Mensagem"
                placeholder="Digite sua mensagem…"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Send type="submit" aria-label="Enviar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
