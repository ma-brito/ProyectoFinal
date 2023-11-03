import React, { useState } from "react";
import axios from "axios";

export function Formulario({ setUser }) {
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (nombre === "" || contraseña === "") {
      setError(true);
      return;
    }
    setError(false);

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: nombre, // Envía el nombre como el email
        password: contraseña,
      });

      if (response.status === 200) {
        console.log("Usuario logueado");
        setUser(nombre);
      }
    } catch (error) {
      if (error.response.status === 401) {
        console.log("Este correo no está registrado");
        setError("Este correo no está registrado");
      }else if (error.response.status === 402) {
        console.log("Contraseña incorrecta");
        setError("Contraseña incorrecta");
      }else {
        console.log("Error desconocido");
        setError("Hubo un errror con el servidor. Lo sentimos, intenta más tarde");
      }
    }
  }

  return (
    <section>
    <h1>Login</h1>

    <form className="formulario" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="usuario">Usuario:</label>
        <input
          type="text"
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="contrasena">Contraseña:</label>
        <input
          type="password"
          value={contraseña}
          onChange={(event) => setContraseña(event.target.value)}
        />
      </div>
      <button>Iniciar sesión</button>
    </form>
    <p>{error}</p>
  </section>
);
}





