import { useEffect, useState } from "react";
import styled from "styled-components";

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
const TOKEN = import.meta.env.VITE_API_TOKEN;

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [metrics, setMetrics] = useState({
    totalBeneficiarios: 0,
    totalArticles: 0,
    totalDonations: 0,
    totalAmount: 0,
    peopleImpacted: 0,
  });

  useEffect(() => {
    async function load() {
      setLoading(true);
      setErr(null);

      try {
        // 1️⃣ Beneficiários
        const benRes = await fetch(`${API_BASE || "https://0385330d7be5.ngrok-free.app"}/beneficiarios?page=1&page_size=1`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${TOKEN}`,
            "ngrok-skip-browser-warning": "any",
          },
        });
        const benData = await benRes.json();
        const totalBeneficiarios = benData.total || benData.users?.length || 0;

        // 2️⃣ Artigos
        const artRes = await fetch(`${API_BASE || "https://0385330d7be5.ngrok-free.app"}/articles?page=1&page_size=1`, {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "any",
          },
        });
        const artData = await artRes.json();
        const totalArticles = artData.total || artData.articles?.length || 0;

        // 3️⃣ Doações
        const donRes = await fetch(`${API_BASE || "https://0385330d7be5.ngrok-free.app"}/donations?page=1&page_size=100`, {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "any",
          },
        });
        const donData = await donRes.json();
        const totalDonations = donData.total || donData.donations?.length || 0;
        const totalAmount = donData.total_amount || 0;
        const peopleImpacted = donData.donations?.reduce(
          (acc, d) => acc + (d.people_impacted || 0),
          0
        );

        // 4️⃣ Métricas da org 1 (fallback para garantir)
        const orgRes = await fetch(`${API_BASE || "https://0385330d7be5.ngrok-free.app"}/metrics/orgs/1`, {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "any",
          },
        });
        const orgData = await orgRes.json();

        setMetrics({
          totalBeneficiarios,
          totalArticles,
          totalDonations,
          totalAmount,
          peopleImpacted: peopleImpacted || orgData.people_impacted || 0,
        });
      } catch (e) {
        console.error(e);
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <Info>Carregando métricas...</Info>;
  if (err) return <ErrorMsg>Erro: {err}</ErrorMsg>;

  return (
    <Page>
      <Header>
        <h1>Dashboard</h1>
        <p>Resumo geral das operações e impacto social</p>
      </Header>

      {/* Valor total doado em destaque */}
      <BigCard>
        <h2>Valor total doado</h2>
        <BigNumber>R$ {metrics.totalAmount.toLocaleString("pt-BR")}</BigNumber>
      </BigCard>

      {/* 2 linhas de 2 colunas */}
      <Grid>
        <Card>
          <Number>{metrics.totalBeneficiarios}</Number>
          <Label>Beneficiários cadastrados</Label>
        </Card>

        <Card>
          <Number>{metrics.totalArticles}</Number>
          <Label>Artigos publicados</Label>
        </Card>

        <Card>
          <Number>{metrics.totalDonations}</Number>
          <Label>Doações registradas</Label>
        </Card>

        <Card>
          <Number>{metrics.peopleImpacted}</Number>
          <Label>Pessoas impactadas</Label>
        </Card>
      </Grid>
    </Page>
  );
};

export default Dashboard;

/* ================= styled components ================= */

const Page = styled.main`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 4vh 0;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: clamp(1.5rem, 3vw, 2rem);
    color: ${({ theme }) => theme.colors.heading};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: 0.5rem;
  }
`;

/* Card grande no topo */
const BigCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2rem;
  text-align: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  width: min(700px, 95%);
  margin: 0 auto 2rem;

  h2 {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 0.4rem;
  }
`;

const BigNumber = styled.p`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const Grid = styled.section`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(2, 1fr);
  width: min(700px, 95%);
  margin: 0 auto;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  }
`;

const Number = styled.h2`
  font-size: clamp(1.6rem, 3vw, 2rem);
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
`;

const Label = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0.5rem 0 0;
`;

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
