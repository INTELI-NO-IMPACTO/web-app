// src/pages/Profile.jsx
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Profile() {
  // mock – troque pelos dados reais da API
  const user = {
    name: "Nome completo da pessoa",
    socialName: "Nome social da pessoa",
    birth: "20/10/2025",
    cpfMasked: "XXX.XXX.XXX-XX",
    notes:
      "Aasjdkjsnlaçkn askdfnjdsklfsdjk sadkjlfhjsdak fosjdsd kjfbashdbflhas uidsabfkb sda Aasjdkjsnlaçkn askdfnjdsklfsdjk sadkjlfhjsdak fosjdsd",
    avatarUrl: null,
  };

  return (
    <Page>
      <Container>
        <Header>Perfil</Header>

        <Card>
          <Avatar>
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="Foto do usuário" />
            ) : (
              <span>Foto opcional</span>
            )}
          </Avatar>

          <InfoCol>
            <Field>
              <Label>Nome</Label>
              <Value big>{user.name}</Value>
            </Field>

            <Field>
              <Label>Nascimento</Label>
              <Value>{user.birth}</Value>
            </Field>

            <Field>
              <Label>Nome social (Opcional)</Label>
              <Value muted={!user.socialName}>{user.socialName || "—"}</Value>
            </Field>

            <Field>
              <Label>CPF</Label>
              <Value>{user.cpfMasked}</Value>
            </Field>

            <Field>
              <Label>Observações (Opcional)</Label>
              <Value multiline muted={!user.notes}>{user.notes || "—"}</Value>
            </Field>

            <Actions>
              <EditButton to="/profile/edit">Editar</EditButton>
            </Actions>
          </InfoCol>
        </Card>
      </Container>
    </Page>
  );
}

/* ============ styles ============ */

const Page = styled.main`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem 00;
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
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);

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

  img {
    width: 100%;
    height: 100%;
    border-radius: 999px;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 720px) {
    justify-self: center;
  }
`;

const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 10px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.heading};
`;

const Value = styled.p`
  font-size: ${({ big }) => (big ? "1.1rem" : "1.02rem")};
  line-height: ${({ multiline }) => (multiline ? 1.55 : 1.3)};
  opacity: ${({ muted }) => (muted ? 0.7 : 0.95)};
  word-break: break-word;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 4px;
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
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease, transform 0.12s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }
`;
