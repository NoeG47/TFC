import React from "react";
//import "../estilos/Header.css"

const Header = () => {

    return (
        <header className="w-full flex bg-peach items-center justify-between p-4">
      <div>
        <img
          src="../images/logo.ico"
          alt="EasyMeal Logo"
          className="w-12 md:w-16 lg:w-20 h-auto" 
        />
      </div>
      <div className="text-2xl md:text-3xl lg:text-4xl cursor-pointer">
        ≡
      </div>
    </header>
    )
}

export default Header;