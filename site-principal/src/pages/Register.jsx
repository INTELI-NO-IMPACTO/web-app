import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const redirectTo = loc.state?.from || "/";

  const [form, setForm] = useState({
    name: "",
    social_name: "",
    cpf: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validate() {
    if (!form.name.trim()) return "Informe seu nome.";
    if (!form.email.trim()) return "Informe seu e-mail.";
    if (!/.+@.+\..+/.test(form.email)) return "E-mail inválido.";
    if (!form.password) return "Crie uma senha.";
    if (form.password.length < 6) return "A senha deve ter ao menos 6 caracteres.";
    if (form.password !== form.confirm) return "As senhas não coincidem.";
    // CPF e social_name são opcionais no seu backend
    return null;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    const v = validate();
    if (v) { setErr(v); return; }

    setLoading(true);
    try {
      await register({
        name: form.name.trim(),
        social_name: form.social_name.trim() || null,
        cpf: form.cpf.trim() || null,
        email: form.email.trim(),
        password: form.password,
      });
      nav(redirectTo, { replace: true });
    } catch (e2) {
      setErr(e2.message || "Falha no cadastro");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Wrap>
      <Card as="form" onSubmit={onSubmit}>
        <h1>Criar conta</h1>

        <Grid2>
          <label>
            Nome*
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              type="text"
              required
              placeholder="Seu nome completo"
            />
          </label>
          <label>
            Nome social
            <input
              name="social_name"
              value={form.social_name}
              onChange={onChange}
              type="text"
              placeholder="(opcional)"
            />
          </label>
        </Grid2>

        <Grid2>
          <label>
            CPF
            <input
              name="cpf"
              value={form.cpf}
              onChange={onChange}
              type="text"
              inputMode="numeric"
              placeholder="(opcional)"
            />
          </label>
          <label>
            E-mail*
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              type="email"
              required
              placeholder="voce@exemplo.com"
            />
          </label>
        </Grid2>

        <Grid2>
          <label>
            Senha*
            <input
              name="password"
              value={form.password}
              onChange={onChange}
              type="password"
              required
              placeholder="mín. 6 caracteres"
            />
          </label>
          <label>
            Confirmar senha*
            <input
              name="confirm"
              value={form.confirm}
              onChange={onChange}
              type="password"
              required
            />
          </label>
        </Grid2>

        {err && <ErrorMsg>{err}</ErrorMsg>}

        <button disabled={loading || !form.name || !form.email || !form.password || !form.confirm}>
          {loading ? "Criando conta..." : "Cadastrar"}
        </button>

        <Small>
          Já tem conta? <StyledLink to="/login">Entrar</StyledLink>
        </Small>
      </Card>
    </Wrap>
  );
}

/* ===== estilos combinando com o Login ===== */

const Wrap = styled.main`
  min-height: 100dvh;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.background};
`;

const Card = styled.div`
  width: min(600px, 92%);
  display: grid;
  gap: 12px;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);

  h1 { margin: 0 0 6px; font-size: 1.25rem; color: ${({ theme }) => theme.colors.heading}; }
  label { display: grid; gap: 6px; font-size: 0.95rem; }
  input {
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    border-radius: 10px; padding: 10px;
    outline: none;
  }
  button {
    margin-top: 6px; padding: 10px 12px; border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.primary};
    color: white; cursor: pointer; font-weight: 600;
  }
`;

const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
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
