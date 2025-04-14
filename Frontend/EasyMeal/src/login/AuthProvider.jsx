import React, { createContext, useContext, useState } from 'react';
//import UseStateStorage from '../servicioStorage/UseStateStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //const [user, setUser] = UseStateStorage("usuario",null);
  
  const [user, setUser] = useState(() => {
    // Recuperar usuario desde localStorage si existe
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  });

  // guardar en localStorage la ssion
  const login = (userData) => {
    setUser(userData);
    //para convertirlo en cadena json JSON.stringify
    localStorage.setItem('user', JSON.stringify(userData)); 
  };
  const loginNoLogeada = (userData) => setUser(userData);


  // Eliminar del almacenamiento
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout,loginNoLogeada }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
