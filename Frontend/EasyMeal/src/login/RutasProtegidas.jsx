import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const RutaProtegida = ({ children }) => {
  const { usuario } = useAuth();
  
  return usuario ? children : <Navigate to="/" />;
};

export default RutaProtegida;
