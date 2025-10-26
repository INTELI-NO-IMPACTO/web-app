import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { meReq } from "../lib/api"; // importa a função que faz /auth/me

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const redirectTo = loc.state?.from || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      // 1️⃣ Faz login -> tokens armazenados
      await login({ email, password });

      // 2️⃣ Chama /auth/me com o token bearer para pegar os dados do usuário
      const user = await meReq();

      // 3️⃣ Armazena o role (e opcionalmente o ID/email se quiser)
      if (user?.role) localStorage.setItem("user_role", user.role);
      if (user?.id) localStorage.setItem("user_id", user.id);
      if (user?.email) localStorage.setItem("user_email", user.email);

      // 4️⃣ Redireciona
      nav(redirectTo, { replace: true });
    } catch (e2) {
      console.error("Login error:", e2);
      setErr(e2.message || "Falha no login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Wrap>
      <Card as="form" onSubmit={onSubmit}>
        <h1>Entrar</h1>
        <label>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </label>
        <label>
          Senha
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </label>
        {err && <ErrorMsg>{err}</ErrorMsg>}
        <button disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <Small>
          Ainda não tem conta?{" "}
          <StyledLink to="/register">Cadastre-se</StyledLink>
        </Small>
      </Card>
    </Wrap>
  );
}

/* ===== estilos ===== */

const Wrap = styled.main`
  min-height: 100dvh;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.background};
`;

const Card = styled.div`
  width: min(420px, 90%);
  display: grid;
  gap: 12px;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);

  h1 {
    margin: 0 0 6px;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.heading};
  }

  label {
    display: grid;
    gap: 6px;
    font-size: 0.95rem;
  }

  input {
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    border-radius: 10px;
    padding: 10px;
  }

  button {
    margin-top: 6px;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    cursor: pointer;
    font-weight: 600;
  }
`;

const ErrorMsg = styled.div`
  color: ${({ theme }) => theme.colors.danger ?? "#e5484d"};
  font-size: 0.9rem;
`;

const Small = styled.p`
  margin: 6px 0 0;
  font-size: 0.9rem;
  opacity: 0.9;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;
