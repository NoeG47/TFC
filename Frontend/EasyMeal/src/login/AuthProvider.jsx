import React, { createContext, useContext, useState,useEffect } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);

// Componente proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const updateUsuario = (nuevoUsuario) => {
    setUsuario(nuevoUsuario);
  };
  useEffect(() => {
    const usuarioGuardado = sessionStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const login = (usuario) => {
    setUsuario(usuario);
    sessionStorage.setItem("usuario", JSON.stringify(usuario)); // 💾
  };

  const logout = () => {
    setUsuario(null);
    sessionStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout,updateUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};
