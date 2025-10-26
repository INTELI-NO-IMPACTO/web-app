import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

/**
 * Provedor de autenticação global.
 * - Guarda o usuário logado e o token JWT.
 * - Permite login, logout e persistência entre reloads.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // carregar usuário salvo no localStorage ao iniciar
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser({ ...JSON.parse(storedUser), token });
    }
  }, []);

  // login com token e info básica do usuário
  const login = (token, info) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(info));
    setUser({ ...info, token });
  };

  // logout e limpeza total
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const isAuthenticated = !!user?.token;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook para acessar o contexto de autenticação.
 * Exemplo:
 * const { user, login, logout, isAuthenticated } = useAuth();
 */
export const useAuth = () => useContext(AuthContext);
