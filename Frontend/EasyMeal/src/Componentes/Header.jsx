import React from "react";
import { useState } from "react";
import Menu_lateral from "./Menu_lateral";

const Header = () => {
  //variables para abrir el menu
  const [Menu_abierto, setMenu_abierto] = useState(false);

  const AbrirMenu = () => {
    setMenu_abierto(!Menu_abierto)
  }

  const CerrarMenu = () => {
    setMenu_abierto(false)
  }
  return (
    <>
    <header className="w-full flex bg-peach items-center justify-between p-4">
      <div>
        <img
          src="../images/logo.ico"
          alt="EasyMeal Logo"
          className="w-12 md:w-16 lg:w-20 h-auto"
        />
      </div>
      <div className="text-2xl md:text-3xl lg:text-4xl cursor-pointer"  
      onClick={AbrirMenu}
      >
        ≡
      </div>
    </header>

    {/*llamamos al componente del menu_lateral */}
    <Menu_lateral Abierto={Menu_abierto} Cerrado={CerrarMenu}/>

    </>
    
    
  )
}

export default Header;