import {useState, useEffect} from "react";
import {Formulario} from "../components/Formulario";
import {useNavigate} from "react-router-dom";
import React from "react";
import logo from '../imges/logo.jpeg'
import "../css/Login.css"
import TextAnimationJ from "../components/animations/TextAnimationJ";
export const Login = ({ setUser }) => {
    const [user, setUserLocal] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            console.log(user);
            switch(user.permiso) {
                case 0:
                    navigate('/home');
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
            <Formulario setUser={setUserLocal}></Formulario>
            </div>

        </section>
        
    
    )
};

