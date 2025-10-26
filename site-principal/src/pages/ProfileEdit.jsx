import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const API_BASE = "https://0385330d7be5.ngrok-free.app";

export default function ProfileEdit() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    social_name: "",
    pronoun: "",
    cpf: "",
    profile_image: null, // agora incluímos o campo
  });
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const token = localStorage.getItem("access_token");

  // 🔹 Carrega dados do usuário logado
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch(`${API_BASE}/auth/me`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (res.status === 401 || res.status === 403) {
          localStorage.clear();
          nav("/login", { replace: true });
          return;
        }

        if (!res.ok) throw new Error(`Erro ${res.status}`);

        const data = await res.json();
        setUser(data);
        setForm({
          name: data.name || "",
          social_name: data.social_name || "",
          pronoun: data.pronoun || "",
          cpf: data.cpf || "",
          profile_image: null,
        });
        setPreview(data.profile_image_url || null);
      } catch (e) {
        console.error(e);
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [nav, token]);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  // 🔹 Trata upload da imagem
  function handleImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((f) => ({ ...f, profile_image: reader.result.split(",")[1] })); // envia só o base64
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  // 🔹 Envia PATCH
  async function handleSubmit(e) {
    e.preventDefault();
    if (!user?.id) return;
    setSaving(true);
    setErr(null);

    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          name: form.name || null,
          social_name: form.social_name || null,
          pronoun: form.pronoun || null,
          cpf: form.cpf || null,
          profile_image: form.profile_image || null,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Erro ao atualizar: ${text}`);
      }

      const updated = await res.json();
      console.log("✅ Atualizado:", updated);
      alert("Perfil atualizado com sucesso!");
      nav("/profile");
    } catch (e) {
      console.error(e);
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <Info>Carregando dados...</Info>;
  if (err) return <ErrorMsg>Erro: {err}</ErrorMsg>;
  if (!user) return <Info>Nenhum dado encontrado.</Info>;

  return (
    <Page>
      <Container>
        <Header>Editar Perfil</Header>

        <Form onSubmit={handleSubmit}>
          <Field>
            <Label>Nome completo</Label>
            <Input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Digite seu nome"
              required
            />
          </Field>

          <Field>
            <Label>Nome social</Label>
            <Input
              name="social_name"
              type="text"
              value={form.social_name}
              onChange={handleChange}
              placeholder="Digite seu nome social"
            />
          </Field>

          <Field>
            <Label>Pronome</Label>
            <Input
              name="pronoun"
              type="text"
              value={form.pronoun}
              onChange={handleChange}
              placeholder="Ex: Ela/Dela, Ele/Dele..."
            />
          </Field>

          <Field>
            <Label>CPF</Label>
            <Input
              name="cpf"
              type="text"
              value={form.cpf}
              onChange={handleChange}
              placeholder="Digite seu CPF"
            />
          </Field>

          <Field>
            <Label>Imagem de perfil</Label>
            <Input type="file" accept="image/*" onChange={handleImage} />
            {preview && <ImgPreview src={preview} alt="Prévia" />}
          </Field>

          <Actions>
            <BackButton type="button" onClick={() => nav("/profile")}>
              Cancelar
            </BackButton>
            <SaveButton type="submit" disabled={saving}>
              {saving ? "Salvando..." : "Salvar alterações"}
            </SaveButton>
          </Actions>
        </Form>
      </Container>
    </Page>
  );
}

/* ====== ESTILOS ====== */
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 18px;
  padding: 22px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.heading};
`;

const Input = styled.input`
  height: 42px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0 12px;
  background: ${({ theme }) =>
    theme.name === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)"};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ImgPreview = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-top: 0.5rem;
  object-fit: cover;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`;

const SaveButton = styled.button`
  padding: 0.45rem 1.2rem;
  border-radius: 12px;
  font-weight: 600;
  border: none;
  color: ${({ theme }) => theme.colors.onPrimary};
  background: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-1px);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const BackButton = styled.button`
  padding: 0.45rem 1.2rem;
  border-radius: 12px;
  font-weight: 500;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: color 0.2s ease, transform 0.1s ease;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }
`;
