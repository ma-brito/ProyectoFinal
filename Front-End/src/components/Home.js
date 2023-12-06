//import usenavigate
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../imges/logo.jpeg";
export function Home({user, setUser}){

    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null); 
        navigate('/login'); 
    }

    return(
        <div>
            <h1>Bienvenido</h1>
            <h2>{user && user.nombre}</h2>
            <img src={logo} alt="Logo de la página" class="logo"></img>
            <button onClick={handleLogout}>Cerrar sesion</button>
        </div>
    )
}
