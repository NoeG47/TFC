import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
//La línea de abajo solo se usa para colores
import "../src/styles/index.scss";
import App from "./App.jsx";
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./login/AuthProvider";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
