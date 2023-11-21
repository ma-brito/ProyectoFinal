import React, { useState } from "react";
import { FormularioAdmin } from "./FormularioAdmin";

export function HomeSuperadmin({ user, setUser }) {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const handleLogout = () => {
    setUser([]);
  };

  const handleRegistrarClick = () => {
    setShowRegistrationForm(true);
  };

  return (
    <div>
      <h1>Bienvenido</h1>
      <h2>{user}</h2>

      {!showRegistrationForm ? (
        <button onClick={handleRegistrarClick}>Registrar</button>
      ) : (
        <FormularioAdmin />
      )}

      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}
