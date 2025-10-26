import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

export default function Chat() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  const USER_ID = localStorage.getItem("user_id") || "1"; // fallback para teste

  // 🔹 Carrega lista de chats do usuário
  useEffect(() => {
    async function loadChats() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/chats/user/${USER_ID}`, {
          headers: { accept: "application/json" },
        });

        if (!res.ok) throw new Error(`Erro ${res.status}`);

        const data = await res.json();

        const parsedChats = data.chats.map((c) => ({
          id: c.id,
          title: c.title || `Chat ${c.id}`,
          date: new Date(c.created_at).toLocaleDateString("pt-BR"),
          status: c.is_active ? "Ativo" : "Finalizado",
        }));

        setChats(parsedChats);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar os chats.");
      } finally {
        setLoading(false);
      }
    }

    loadChats();
  }, [USER_ID]);

  // 🔹 Cria novo chat na API
  const handleNewChat = async () => {
    if (creating) return;
    setCreating(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/chat/0/new?user_id=${USER_ID}`, {
        method: "POST",
        headers: { accept: "application/json" },
      });

      if (!res.ok) throw new Error(`Erro ${res.status}`);
      const data = await res.json();

      if (data?.chat_id) {
        navigate(`/chat/${data.chat_id}`);
      } else {
        alert("Erro inesperado ao criar chat.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao criar novo chat.");
    } finally {
      setCreating(false);
    }
  };

  if (loading) return <Page><Container>Carregando chats...</Container></Page>;
  if (error) return <Page><Container>{error}</Container></Page>;

  return (
    <Page>
      <Container>
        <Header>Chats</Header>

        <NewChatCard
          as="button"
          onClick={handleNewChat}
          disabled={creating}
          aria-label="Criar novo chat"
        >
          {creating ? "Criando..." : "+ Novo chat"}
        </NewChatCard>

        {chats.length === 0 ? (
          <p>Nenhum chat encontrado.</p>
        ) : (
          <List>
            {chats.map((c) => (
              <ChatCard to={`/chat/${c.id}`} key={c.id} aria-label={`Abrir ${c.title}`}>
                <Title>{c.title}</Title>
                <Meta>
                  <DateText>{c.date}</DateText>
                  <Status>{c.status}</Status>
                </Meta>
              </ChatCard>
            ))}
          </List>
        )}
      </Container>
      <BottomFade aria-hidden />
    </Page>
  );
}

/* ============================= */
/* ======= Styled Components ==== */
/* ============================= */

const Page = styled.main`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem 0;
`;

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
  margin-bottom: 1rem;
`;

const NewChatCard = styled.button`
  display: grid;
  place-items: center;
  width: 100%;
  height: 50px;
  margin-bottom: 1.2rem;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  letter-spacing: 0.2px;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, transform 0.12s ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const List = styled.div`
  display: grid;
  gap: 14px;
  align-items: stretch;
`;

const ChatCard = styled(Link)`
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 14px 18px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.12s ease;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }
`;

const Title = styled.h3`
  font-size: clamp(1rem, 2.1vw, 1.15rem);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.heading};
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DateText = styled.span`
  font-size: 0.92rem;
  opacity: 0.8;
`;

const Status = styled.span`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
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
