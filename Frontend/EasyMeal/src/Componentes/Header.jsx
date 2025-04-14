import React from "react";
import "../estilos/Header.css"

const Header = () => {

    return (
        <header className="header flex items-center justify-between p-4">
      <div className="header-content">
        <img
          src="../images/logo.ico"
          alt="EasyMeal Logo"
          className="logo w-12 h-auto" 
        />
      </div>
      <div className="menu-icon text-3xl cursor-pointer">
        ≡
      </div>
    </header>
    )
}

export default Header;