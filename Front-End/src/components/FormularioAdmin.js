import React, { useState } from "react";
import axios from "axios";

export function FormularioAdmin({  }) {
    const [email, setEmail] = useState(""); 
    const [nombre, setNombre] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [permiso, setPermiso] = useState(1);
    const [error, setError] = useState("");
    const[mensaje, setMensaje] = useState("");
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (nombre === "" || contraseña === "" || nombre === "") {
        setError(true);
        return;
      }
      setError(false);
  
      try {
        const response = await axios.post("http://localhost:5000/registrar", {
          email: email,
          password: contraseña,
          permiso : 1,
          nombre : nombre,
        });
  
        if (response.status === 200) {
          console.log("Admin registrado");
          setMensaje("Admin registrado");
        }
      } catch (error) {
        if (error.response.status === 401) {
          console.log("Este correo no está registrado");
          setError("Este correo no está registrado");
        }else {
          console.log("Error desconocido");
          setError("Hubo un errror con el servidor. Lo sentimos, intenta más tarde");
        }
      }
    }
  
    return (
      <section>
      <h1>Registrar</h1>
  
      <form className="formulario" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="usuario">Email:</label>
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
          />
        </div>
        <button>Registrar Admin</button>
      </form>
      <p>{mensaje}</p>
      <p>{error}</p>
    </section>
  );
  }
  
  
  
  
  
  