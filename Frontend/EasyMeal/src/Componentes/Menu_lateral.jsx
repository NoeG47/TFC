import React from "react";

const Menu_lateral = ({Abierto,Cerrado}) => {
    if(!Abierto)
        return null;
    return(
        <>
        <nav>
            <ul>
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Recetas</a></li>
                <li><a href="#">Perfil</a></li>
                <li><a href="#">Cerrar Sesion</a></li>
            </ul>
        </nav>
        </>
        
    )
}
export default Menu_lateral;