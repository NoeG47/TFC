import React from "react";

const Menu_lateral = ({ Abierto, Cerrado }) => {
    if (!Abierto)
        return null;
    return (
        <>
            <nav className="flex flex-col fixed top-0 right-0 h-full bg-white shadow-lg z-50 w-50">
                <ul>
                    <div className="font-bold text-right bg-peach h-19.5 sm:h-19.5 md:h-24 lg:h-28" onClick={Cerrado}><a className="flex flex-col p-6">X</a></div>
                    <li className="p-4"><a href="/">Inicio</a></li>
                    <li className="pl-4 pb-2"><a href="#">Recetas</a></li>
                    <li className="pl-4 pb-2 pt-2"><a href="#">Perfil</a></li>
                    <li className="pl-4 pb-2 pt-2"><a href="#">Cerrar Sesion</a></li>
                </ul>
            </nav>
        </>

    )
}
export default Menu_lateral;