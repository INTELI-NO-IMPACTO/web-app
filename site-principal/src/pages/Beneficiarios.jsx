import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiSearch, BiEdit, BiChevronLeft, BiChevronRight, BiLogOut } from "react-icons/bi";

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "https://0385330d7be5.ngrok-free.app").replace(/\/+$/, "");
const TOKEN =
  import.meta.env.VITE_API_TOKEN ||
  localStorage.getItem("auth_token") ||
  "";

function authHeaders(json = true) {
  const headers = {
    Accept: "application/json",
    "ngrok-skip-browser-warning": "any",
  };
  if (json) headers["Content-Type"] = "application/json";
  if (TOKEN) headers["Authorization"] = `Bearer ${TOKEN}`;
  return headers;
}

const PAGE_SIZE_DEFAULT = 10;

const Beneficiarios = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("user_role")?.toLowerCase() || "";
  const userId = Number(localStorage.getItem("user_id") || 0);
  const isBeneficiario = role === "beneficiario";

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_DEFAULT);
  const [search, setSearch] = useState("");
  const [onlyMine, setOnlyMine] = useState(!isBeneficiario);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveErr, setSaveErr] = useState(null);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize]);

  // 🔹 Função de logout
  const handleLogout = () => {
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_id");
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  useEffect(() => {
    let abort = false;
    async function load() {
      setLoading(true);
      setErr(null);
      try {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("page_size", String(pageSize));
        if (search.trim()) params.set("search", search.trim());
        if (onlyMine && userId) params.set("assistente_id", String(userId));

        const url = `${API_BASE}/beneficiarios?${params.toString()}`;
        const res = await fetch(url, { headers: authHeaders(false) });
        if (!res.ok) throw new Error(`Erro ao listar beneficiários: ${res.status}`);
        const data = await res.json();
        if (abort) return;

        setRows(Array.isArray(data.users) ? data.users : []);
        setTotal(Number(data.total || 0));
      } catch (e) {
        if (!abort) setErr(e.message || "Falha ao carregar beneficiários.");
      } finally {
        if (!abort) setLoading(false);
      }
    }
    load();
    return () => {
      abort = true;
    };
  }, [page, pageSize, search, onlyMine, userId]);

  async function saveEdit() {
    if (!editing?.id) return;
    setSaving(true);
    setSaveErr(null);
    try {
      const payload = {
        email: editing.email,
        name: editing.name,
        social_name: editing.social_name || null,
        pronoun: editing.pronoun || null,
        cpf: editing.cpf || null,
        is_active: Boolean(editing.is_active),
        assistente_id: role === "assistente" ? userId : editing.assistente_id ?? null,
        org_id: editing.org_id ?? null,
      };

      const res = await fetch(`${API_BASE}/beneficiarios/${editing.id}`, {
        method: "PUT",
        headers: authHeaders(true),
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Erro ao salvar (status ${res.status})`);
      const updated = await res.json();
      setRows((prev) => prev.map((r) => (r.id === editing.id ? { ...r, ...updated } : r)));
      setEditing(null);
    } catch (e) {
      setSaveErr(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Page>
      <Header>
        <div className="title">
          <h1>Beneficiários</h1>
          <p>Gerencie os perfis vinculados e atualize informações com segurança.</p>
        </div>
        <LogoutButton onClick={handleLogout}>
          <BiLogOut size={20} />
          Sair
        </LogoutButton>
      </Header>

      <Toolbar>
        <SearchBox>
          <BiSearch size={18} />
          <input
            placeholder="Buscar por nome, email ou CPF…"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
        </SearchBox>

        {!isBeneficiario && (
          <OnlyMine>
            <input
              type="checkbox"
              checked={onlyMine}
              onChange={(e) => {
                setPage(1);
                setOnlyMine(e.target.checked);
              }}
            />
            <label>Apenas meus</label>
          </OnlyMine>
        )}
      </Toolbar>

      {loading ? (
        <Info>Carregando beneficiários…</Info>
      ) : err ? (
        <ErrorMsg>{err}</ErrorMsg>
      ) : rows.length === 0 ? (
        <Info>Nenhum beneficiário encontrado.</Info>
      ) : (
        <List>
          {rows.map((b) => (
            <Card key={b.id}>
              <Top>
                <h3>{b.name}</h3>
                <EditBtn onClick={() => setEditing(b)}>
                  <BiEdit size={18} />
                  Editar
                </EditBtn>
              </Top>
              <SmallText>ID: {b.id}</SmallText>
              <Field><strong>Email:</strong> {b.email}</Field>
              {b.social_name && <Field><strong>Nome social:</strong> {b.social_name}</Field>}
              {b.pronoun && <Field><strong>Pronome:</strong> {b.pronoun}</Field>}
              {b.cpf && <Field><strong>CPF:</strong> {b.cpf}</Field>}
              <Field><strong>Assistente ID:</strong> {b.assistente_id ?? "—"}</Field>
              <Field><strong>Org ID:</strong> {b.org_id ?? "—"}</Field>
              <Field><strong>Status:</strong> {b.is_active ? "Ativo ✅" : "Inativo ❌"}</Field>
            </Card>
          ))}
        </List>
      )}

      <Pagination>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>
          <BiChevronLeft /> Anterior
        </button>
        <span>Página {page} de {totalPages}</span>
        <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>
          Próxima <BiChevronRight />
        </button>
      </Pagination>

      {editing && (
        <ModalBackdrop onClick={() => setEditing(null)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <h3>Editar {editing.name}</h3>
            <Form>
              <label>Nome</label>
              <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              <label>Nome social</label>
              <input value={editing.social_name || ""} onChange={(e) => setEditing({ ...editing, social_name: e.target.value })} />
              <label>Pronome</label>
              <input value={editing.pronoun || ""} onChange={(e) => setEditing({ ...editing, pronoun: e.target.value })} />
              <label>CPF</label>
              <input value={editing.cpf || ""} onChange={(e) => setEditing({ ...editing, cpf: e.target.value })} />
              <label>Status</label>
              <select
                value={editing.is_active ? "1" : "0"}
                onChange={(e) => setEditing({ ...editing, is_active: e.target.value === "1" })}
              >
                <option value="1">Ativo</option>
                <option value="0">Inativo</option>
              </select>

              {saveErr && <ErrorMsg>{saveErr}</ErrorMsg>}

              <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end", marginTop: "1rem" }}>
                <button onClick={() => setEditing(null)} className="ghost">Cancelar</button>
                <button onClick={saveEdit} disabled={saving}>{saving ? "Salvando..." : "Salvar"}</button>
              </div>
            </Form>
          </Modal>
        </ModalBackdrop>
      )}
    </Page>
  );
};

export default Beneficiarios;

/* ==================== styled ==================== */

const Page = styled.main`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
  padding: 2rem 1rem 6rem;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  text-align: left;
  width: min(800px, 95%);
  margin-inline: auto;

  .title {
    h1 {
      font-size: clamp(1.3rem, 3vw, 1.8rem);
      color: ${({ theme }) => theme.colors.heading};
      margin: 0;
    }
    p {
      color: ${({ theme }) => theme.colors.textSecondary};
      margin: 0.25rem 0 0;
    }
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: #fff;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto 1rem;
  width: min(800px, 95%);
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 10px;
  padding: 0.55rem 0.8rem;
  width: 60%;
  input {
    border: none;
    outline: none;
    flex: 1;
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const OnlyMine = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: min(800px, 95%);
  margin: 0 auto;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  padding: 1.2rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;

  h3 {
    margin: 0;
    color: ${({ theme }) => theme.colors.heading};
  }
`;

const Field = styled.p`
  margin: 0.2rem 0;
  font-size: 0.95rem;
`;

const SmallText = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const EditBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceElevated};
  border-radius: 8px;
  padding: 0.3rem 0.6rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Pagination = styled.div`
  width: min(800px, 95%);
  margin: 1.5rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.textSecondary};

  button {
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.surface};
    border-radius: 8px;
    padding: 0.4rem 0.7rem;
    cursor: pointer;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.4);
  display: grid;
  place-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1.5rem;
  width: min(420px, 90vw);
  box-shadow: 0 10px 25px rgba(0,0,0,.2);
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  input, select {
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    padding: 0.5rem 0.7rem;
    background: ${({ theme }) => theme.colors.surfaceElevated};
    color: ${({ theme }) => theme.colors.text};
  }

  button {
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    padding: 0.5rem 0.9rem;
    cursor: pointer;
  }

  .ghost {
    background: transparent;
  }
`;

const Info = styled.p`
  text-align: center;
  padding: 2rem;
  opacity: 0.8;
`;

const ErrorMsg = styled.p`
  color: #d32f2f;
  text-align: center;
`;
