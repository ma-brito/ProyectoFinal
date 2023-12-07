import {useState, useEffect} from "react";
import {Formulario} from "../components/Formulario";
import {useNavigate} from "react-router-dom";
import React from "react";
import "../css/Login.css"
import { useContext } from 'react';
import { UserContext } from '../App'; 

export const Login = () => {
    const navigate = useNavigate();
const { user, setUser } = useContext(UserContext); 

useEffect(() => {
  if (user) {
    console.log(user);
    switch (user.permiso) {
      case 0:
        navigate("/home");
        break;
      case 1:
        navigate("/homeAdmin");
        break;
      case 3:
        navigate("/homeSuperadmin");
        break;
      default:
        navigate("/login");
    }
  }
}, [user, navigate]);

return (
  <div>
    <Formulario setUser={setUser}></Formulario>
  </div>
);
}
