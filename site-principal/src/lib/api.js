// src/lib/api.js
// Base URL do backend (ngrok em dev, por ex.)
export const API_URL = "https://0385330d7be5.ngrok-free.app".replace(/\/+$/, "");

const LS_ACCESS = "access_token";
const LS_REFRESH = "refresh_token";

// ============= Storage de tokens =============
export const tokenStore = {
  get access() { return localStorage.getItem(LS_ACCESS); },
  set access(v) { v ? localStorage.setItem(LS_ACCESS, v) : localStorage.removeItem(LS_ACCESS); },
  get refresh() { return localStorage.getItem(LS_REFRESH); },
  set refresh(v) { v ? localStorage.setItem(LS_REFRESH, v) : localStorage.removeItem(LS_REFRESH); },
  clear() { localStorage.removeItem(LS_ACCESS); localStorage.removeItem(LS_REFRESH); }
};

// ============= Helpers gerais =============
function joinUrl(base, path) {
  if (!path) return base;
  if (/^https?:\/\//i.test(path)) return path; // já é absoluta
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

// Só tenta JSON se for realmente JSON
async function safeJson(res) {
  const ct = res.headers.get("content-type") || "";
  const isJson = ct.includes("application/json") || ct.includes("+json");
  if (!isJson) return null;
  try { return await res.json(); } catch { return null; }
}

// Monta uma mensagem de erro legível (inclui preview do body)
async function buildHttpError(res) {
  // Primeiro tenta JSON
  const j = await safeJson(res);
  if (j) {
    if (j.detail) {
      if (typeof j.detail === "string") return j.detail;
      if (Array.isArray(j.detail)) return j.detail.map(d => d.msg || d.detail || JSON.stringify(d)).join(" | ");
      return JSON.stringify(j.detail);
    }
    if (j.message) return j.message;
    return JSON.stringify(j);
  }

  // Depois tenta texto (HTML, etc.)
  let text = "";
  try { text = await res.text(); } catch {}
  const preview = text ? text.slice(0, 300) : "";
  const hint = preview.trim().startsWith("<") ? " (parece HTML – verifique URL/proxy/CORS/ngrok)" : "";
  return `${res.status} ${res.statusText}${hint}${preview ? ` — body: ${preview}` : ""}`;
}

// ============= Refresh automático =============
async function tryRefreshAccessToken() {
  const refreshToken = tokenStore.refresh;
  if (!refreshToken) return null;

  let res;
  try {
    res = await fetch(joinUrl(API_URL, "/auth/refresh"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        // evita a página de aviso do ngrok
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({ refresh_token: refreshToken })
    });
  } catch (e) {
    // falha de rede no refresh => tokens inválidos/sem rede
    return null;
  }

  if (!res.ok) return null;

  const data = await safeJson(res);
  if (!data?.access_token) return null;

  tokenStore.access = data.access_token;
  return data.access_token;
}

// ============= fetch com Bearer + retry em 401 =============
export async function apiFetch(path, options = {}) {
  const url = joinUrl(API_URL, path);
  const headers = new Headers(options.headers || {});

  // Em ngrok, esse header pula a página de aviso
  if (!headers.has("ngrok-skip-browser-warning")) {
    headers.set("ngrok-skip-browser-warning", "true");
  }

  // Content-Type só quando tem body não-FormData
  if (!headers.has("Content-Type") && options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (!headers.has("Accept")) headers.set("Accept", "application/json");

  // Bearer se houver token
  const token = tokenStore.access;
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let res;
  try {
    res = await fetch(url, { ...options, headers });
  } catch (e) {
    throw new Error(`Falha de rede: ${e.message}. Verifique VITE_API_BASE_URL e CORS.`);
  }

  // Tenta 1x refresh em 401
  if (res.status === 401) {
    const newToken = await tryRefreshAccessToken();
    if (newToken) {
      headers.set("Authorization", `Bearer ${newToken}`);
      try {
        res = await fetch(url, { ...options, headers });
      } catch (e) {
        throw new Error(`Falha de rede após refresh: ${e.message}`);
      }
    }
  }

  return res;
}

// ============= Endpoints de Auth =============
export async function loginReq({ email, password }) {
  let res;
  try {
    res = await fetch(joinUrl(API_URL, "/auth/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({ email, password })
    });
  } catch (e) {
    throw new Error(`Falha de rede: ${e.message}. Verifique VITE_API_BASE_URL e CORS.`);
  }

  if (!res.ok) throw new Error(await buildHttpError(res));

  const data = await safeJson(res);
  if (!data?.access_token || !data?.refresh_token) {
    throw new Error("Resposta inesperada do /auth/login (sem JSON válido).");
  }

  tokenStore.access = data.access_token;
  tokenStore.refresh = data.refresh_token;
  return data;
}

export async function registerReq(payload) {
  const res = await fetch(joinUrl(API_URL, "/auth/register"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(await buildHttpError(res));

  const data = await safeJson(res);
  if (!data?.access_token || !data?.refresh_token) {
    throw new Error("Resposta inesperada do /auth/register (sem JSON válido).");
  }

  tokenStore.access = data.access_token;
  tokenStore.refresh = data.refresh_token;
  return data;
}

export async function meReq() {
  const res = await apiFetch("/auth/me");
  if (!res.ok) throw new Error(await buildHttpError(res));

  const data = await safeJson(res);
  if (!data) throw new Error("Resposta inesperada do /auth/me (não é JSON).");
  return data;
}

export async function logoutReq() {
  const refresh = tokenStore.refresh;
  try {
    // Seu backend exige refresh_token e usuário autenticado
    const res = await apiFetch("/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refresh })
    });
    // mesmo se der 401/204, limpamos os tokens
    if (!res.ok) {
      // apenas para log/local — não blocar logout
      console.warn("Logout HTTP não-200:", await buildHttpError(res));
    }
  } catch (e) {
    console.warn("Falha no logout (rede):", e);
  } finally {
    tokenStore.clear();
  }
}

// ============= Endpoints de Artigos =============

export async function listArticles() {
  const res = await apiFetch("/articles", { method: "GET" });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function getArticle(id) {
  const res = await apiFetch(`/articles/${id}`, { method: "GET" });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

// (apenas para papéis != beneficiário)
export async function createArticle(formData) {
  const res = await apiFetch("/articles", {
    method: "POST",
    body: formData, // FormData (não usa JSON.stringify)
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

