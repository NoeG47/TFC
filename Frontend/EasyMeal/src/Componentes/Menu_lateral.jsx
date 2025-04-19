import React from "react";

const Menu_lateral = ({ Abierto, Cerrado }) => {
    if (!Abierto)
        return null;
    return (
        <>
            {/* Fondo oscuro cuando está abierto el menú lateral oscuro para el fondo */}
            <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={Cerrado}></div>

            <nav className="flex flex-col fixed top-0 right-0 h-full bg-white shadow-lg z-50 w-50">
                {/*dejar espacio entre los enlaces hasta el div final */}
                <ul className="flex-grow text-2xl"> 
                    <div className="font-bold text-right bg-peach h-23 sm:h-19.5 md:h-24 lg:h-28" onClick={Cerrado}>
                        <a className="flex flex-col p-6 text-4xl">×</a></div>
                    <li className="p-4"><a href="/">Inicio</a></li>
                    <li className="pl-4 pb-2"><a href="#">Recetas</a></li>
                    <li className="pl-4 pb-2 pt-2"><a href="#">Perfil</a></li>
                    <li className="pl-4 pb-2 pt-2"><a href="#">Cerrar Sesion</a></li>

                </ul>
                <div className="bg-peach h-20 sm:h-20 md:h-21 lg:h-24"></div>
            </nav>
        </>

    )
}
export default Menu_lateral;