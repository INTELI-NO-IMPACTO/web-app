// src/pages/Profile.jsx
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// 🔹 Base da API atual (ngrok)
const API_BASE = "https://0385330d7be5.ngrok-free.app";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("user_role")?.toLowerCase();
    const token = localStorage.getItem("access_token");

    if (role !== "beneficiario") {
      setLoading(false);
      return;
    }

    if (!token) {
      console.warn("⚠️ Token ausente — redirecionando ao login");
      nav("/login", { replace: true });
      return;
    }

    async function loadProfile() {
      try {
        console.log("🔄 Requisição → /auth/me");

        const res = await fetch(`${API_BASE}/auth/me`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        });

        console.log("📡 Status:", res.status);

        if (res.status === 401 || res.status === 403) {
          console.warn("⚠️ Token inválido — limpando sessão e redirecionando.");
          localStorage.clear();
          nav("/login", { replace: true });
          return;
        }

        if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`);

        const data = await res.json();
        console.log("✅ Dados do perfil:", data);

        setUser({
          id: data.id,
          name: data.name || "—",
          socialName: data.social_name || "",
          pronoun: data.pronoun || "",
          email: data.email || "—",
          role: data.role || "—",
          orgId: data.org_id ?? "—",
          assistenteId: data.assistente_id ?? "—",
          active: data.is_active,
          avatarUrl: data.profile_image_url || "",
        });
      } catch (e) {
        console.error("Erro no loadProfile:", e);
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [nav]);

  function handleLogout() {
    if (window.confirm("Deseja realmente sair?")) {
      localStorage.clear();
      nav("/login", { replace: true });
    }
  }

  if (loading) return <Info>Carregando perfil...</Info>;
  if (err) return <ErrorMsg>Erro: {err}</ErrorMsg>;
  if (!user) return <Info>Nenhum dado encontrado.</Info>;

  return (
    <Page>
      <Container>
        <Header>Perfil</Header>

        <Card>
          <Avatar>
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="Foto do usuário" />
            ) : (
              <span>Sem foto</span>
            )}
          </Avatar>

          <InfoCol>
            <Field>
              <Label>Nome</Label>
              <Value $big>{user.name}</Value>
            </Field>

            <Field>
              <Label>Nome social</Label>
              <Value $muted={!user.socialName}>{user.socialName || "—"}</Value>
            </Field>

            <Field>
              <Label>Pronome</Label>
              <Value $muted={!user.pronoun}>{user.pronoun || "—"}</Value>
            </Field>

            <Field>
              <Label>Email</Label>
              <Value>{user.email}</Value>
            </Field>

            <Field>
              <Label>Papel</Label>
              <Value>{user.role}</Value>
            </Field>

            <Field>
              <Label>Status</Label>
              <Value>{user.active ? "Ativo ✅" : "Inativo ❌"}</Value>
            </Field>

            <Field>
              <Label>Organização ID</Label>
              <Value>{user.orgId}</Value>
            </Field>

            <Field>
              <Label>Assistente ID</Label>
              <Value>{user.assistenteId}</Value>
            </Field>

            <Actions>
              <EditButton to="/profile/edit">Editar</EditButton>
              <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
            </Actions>
          </InfoCol>
        </Card>
      </Container>
    </Page>
  );
}

/* ======================= */
/* ====== ESTILOS ======== */
/* ======================= */

const Info = styled.p`
  text-align: center;
  padding: 2rem;
  opacity: 0.8;
`;

const ErrorMsg = styled.p`
  text-align: center;
  padding: 1rem;
  color: #d32f2f;
`;

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

const Card = styled.section`
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 15px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 18px;
  padding: 18px 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Avatar = styled.div`
  display: grid;
  place-items: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  background: ${({ theme }) =>
    theme.name === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"};
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0;
`;

const Label = styled.span`
  font-weight: 700;
  margin: 0;
  color: ${({ theme }) => theme.colors.heading};
`;

const Value = styled.p`
  font-size: ${({ $big }) => ($big ? "1.1rem" : "1.02rem")};
  line-height: 1.3;
  margin-top: 0;
  opacity: ${({ $muted }) => ($muted ? 0.7 : 0.95)};
  word-break: break-word;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`;

const EditButton = styled(Link)`
  display: inline-block;
  padding: 0.3rem 1.1rem;
  border-radius: 12px;
  font-weight: 500;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) =>
    theme.name === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"};
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 0.2s, background 0.2s, color 0.2s, transform 0.12s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }
`;

const LogoutButton = styled.button`
  padding: 0.3rem 1.1rem;
  border-radius: 12px;
  font-weight: 500;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) =>
    theme.name === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, color 0.2s, transform 0.12s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.error || "#d32f2f"};
    color: ${({ theme }) => theme.colors.error || "#d32f2f"};
    transform: translateY(-1px);
  }
`;
