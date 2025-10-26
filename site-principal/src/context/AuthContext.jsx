// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginReq, registerReq, meReq, logoutReq, tokenStore } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true);

  // carrega usuário se já há tokens no localStorage
  useEffect(() => {
    (async () => {
      try {
        if (tokenStore.access || tokenStore.refresh) {
          const u = await meReq();
          setUser(u);
        }
      } catch {
        // tokens inválidos/expirados
      } finally {
        setBooting(false);
      }
    })();
  }, []);

  async function login({ email, password }) {
    await loginReq({ email, password });
    const u = await meReq();
    setUser(u);
    return u;
  }

  async function register(payload) {
    await registerReq(payload);
    const u = await meReq();
    setUser(u);
    return u;
  }

  async function logout() {
    await logoutReq();
    setUser(null);
  }

  const value = useMemo(
    () => ({ user, setUser, booting, login, register, logout, isAuthenticated: !!user }),
    [user, booting]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return ctx;
}
