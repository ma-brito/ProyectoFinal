
import { UserContext } from '../App'; 
import React, { useState } from "react";
import axios from "axios";
import '../css/Formulario.css'
import TextAnimationI from "./animations/TextAnimationI";
import TextAnimationR from "./animations/TextAnimationR";
import { useContext } from 'react';
import  Button  from "@mui/material/Button";
export function Formulario() {
  const { setUser } = useContext(UserContext); // get the setUser function from UserContext
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email === "" || contraseña === "") {
      setError("Por favor, completa todos los campos.");
      return;
    }
    setError("");

    try {
      let response;
      if (isRegistering) {
        response = await axios.post("http://localhost:5000/registrar", {
          email: email,
          nombre: nombre,
          password: contraseña,
          permiso: 0, // Todos los usuarios registrados tendrán permiso 0
        });
      } else {
        response = await axios.post("http://localhost:5000/login", {
          nombre: nombre,
          email: email,
          password: contraseña,
          permiso: 0, 

        });
      }

      if (response && response.status === 200) {  
        console.log(isRegistering ? "Usuario registrado" : "Usuario logueado");
        setUser({
          idUsuario : response.data.idUsuario,
          email: response.data.email,
          nombre: response.data.nombre,
          permiso: response.data.permiso,
        });
      }
    } catch (error) {
      if (error.response && error.response.status) {
        if (error.response.status === 401) {
          setError(isRegistering ? "Usuario ya registrado" : "Correo o contraseña incorrectos");
        } else if (error.response.status === 402) {
          setError("Contraseña incorrecta");
        } else {
          setError("Ocurrió un error. Por favor, inténtalo de nuevo más tarde.");
        }
      } else {
        setError("Ocurrió un error. Por favor, inténtalo de nuevo más tarde.");
      }
    }
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setError("");
  };

  return (
    <section>
      
      <h1 className="titulo" >{isRegistering ? <TextAnimationR />  :  <TextAnimationI />  }</h1>

      <form className="formulario" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        {isRegistering && (
          <div className="form-group">
            <label htmlFor="nombre">Nombre de Usuario:</label>
            <input
              type="text"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="contrasena">Contraseña:</label>
          <input
            type="password"
            value={contraseña}
            onChange={(event) => setContraseña(event.target.value)}
          />
        </div>

        <Button type="submit" color='success' variant="contained">
               {isRegistering ? "Registrar" : "Iniciar Sesión"}
        </Button>

        
      </form>

      <p>{error}</p>

      <p>
        {isRegistering
          ? "¿Ya registrado? "
          : "¿Aún no estás registrado? "}
        
        <Button type="button" onClick={toggleForm}>
          {isRegistering ? "Iniciar Sesión" : "Registrar"}
        </Button>
       
      </p>
    </section>
  );
}
