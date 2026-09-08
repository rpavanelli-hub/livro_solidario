import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('ls_usuario');
    const token = localStorage.getItem('ls_token');
    if (usuarioSalvo && token) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
    setCarregando(false);
  }, []);

  function login(usuarioLogado, token) {
    localStorage.setItem('ls_usuario', JSON.stringify(usuarioLogado));
    localStorage.setItem('ls_token', token);
    setUsuario(usuarioLogado);
  }

  function logout() {
    localStorage.removeItem('ls_usuario');
    localStorage.removeItem('ls_token');
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, carregando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
