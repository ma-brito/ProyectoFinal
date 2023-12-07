import {useState, useEffect} from "react";
import {Formulario} from "../components/Formulario";
import {useNavigate} from "react-router-dom";
import React from "react";
import logo from '../imges/logo.jpeg'
import "../css/Login.css"
import { useContext } from 'react';
import { UserContext } from '../App'; 
import TextAnimationJ from "../components/animations/TextAnimationJ";

export const Login = () => {


    const navigate = useNavigate();
const { user, setUser } = useContext(UserContext); 


    useEffect(() => {
        if (user) {
            console.log(user);
            switch(user.permiso) {
                case 0:
                    navigate('/homeuser');
                    break;
                case 1:
                    navigate('/homeAdmin');
                    break;
                case 3:
                    navigate('/homeSuperadmin');
                    break;
                default:
                    navigate('/login');
            }
        }
    }, [user, navigate]);

    return (
        
        <section className='login1'>
            <div className="juega">
                <TextAnimationJ></TextAnimationJ>
            </div>
            
            <div className='box'>
            <img src={logo}></img>
            </div>
            
            <div>
            <Formulario ></Formulario>
            </div>

        </section>
        
    
    )
};
