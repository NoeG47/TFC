import Inicio from "./Componentes/Inicio"
import { Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import Header from "./Componentes/Header";
import Footer from "./Componentes/Footer";
import Registrar from "./Componentes/Registrar";
import Pagina404 from "./Componentes/Pagina404";
import Ingredientes from "./Componentes/Ingredientes";

function App() {
  return (
    <>
      <Header />{/*Elemento común para todos los componentes*/}
      <div className="min-h-screen inset-x-0 top-0 bg-white flex flex-col items-center justify-between">
        <Routes>
        
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Inicio />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="*" element={<Pagina404/>}/>
          <Route path="/ingredientes" element={<Ingredientes />} />

        </Routes>

        <Footer />{/*Elemento común para todos los componentes*/}
      </div>
    </>
  );
}

export default App;
