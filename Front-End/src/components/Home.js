//import usenavigate
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../imges/logo.jpeg'
import { useContext } from 'react';
import { UserContext } from '../App'; 
import { useEffect } from 'react';
export function Home(){
    const { user, setUser } = useContext(UserContext); 
    console.log(user);
    const navigate = useNavigate();



    return(
        <div>
            <h1>Bienvenido</h1>
            <h2>{user && user.nombre}</h2>
            <img src={logo} alt="Logo de la página" class="logo"></img>
        </div>
    )
}
