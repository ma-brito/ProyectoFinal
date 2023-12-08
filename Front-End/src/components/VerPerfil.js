
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../App'; 

export function VerPerfil() {
  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user.nombre);
  const [newEmail, setNewEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInputChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const handleNameChange = async (event) => {
    event.preventDefault();
    if (!newName) {
      alert("Datos inválidos");
      return;
    }
    try {
      const response = await axios.put('http://localhost:5000/updateuser', {
        idUsuario: user.idUsuario,
        new_data: { nombre: newName }
      });
      
      if (response.status === 200) {
        console.log("User name updated");
        setUser({ ...user, nombre: newName });
        setIsEditing(false);
      }
    } catch (error) {
      alert("Hay un error con el servidor");
    }
  };

  const handleEmailChange = async (event) => {
    event.preventDefault();
    if (!newEmail) {
      alert("Datos inválidos");
      return;
    }
    try {
      const response = await axios.put('http://localhost:5000/updateuser', {
        idUsuario: user.idUsuario,
        new_data: { email: newEmail }
      });
      if (response.status === 200) {
        console.log("User email updated");
        setUser({ ...user, email: newEmail });
        setIsEditing(false);
      }
    } catch (error) {
      alert("Hay un error con el servidor");
    }
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    if (!currentPassword || newPassword !== confirmPassword) {
      alert("Datos inválidos");
      return;
    }
    try {
      const response = await axios.put('http://localhost:5000/updatepassword', {
        idUsuario: user.idUsuario,
        currentPassword: currentPassword,
        newPassword: newPassword
      });
      if (response.status === 200) {
        console.log("Password updated");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("La contraseña actual no coincide con la registrada");
      } else {
        alert("Hay un error con el servidor");
      }
    }
  };
  

  return (
    <div>
      <h1>Perfil</h1>
      <div>
        <p>Nombre: {user.nombre}</p>
        {isEditing === 'nombre' ? (
          <form onSubmit={handleNameChange}>
            <input type="text" value={newName} onChange={(event) => setNewName(event.target.value)} />
            <button type="submit">Guardar cambios</button>
          </form>
        ) : (
          <button onClick={() => setIsEditing('nombre')}>Editar nombre</button>
        )}
      </div>
      <div>
        <p>Email: {user.email}</p>
        {isEditing === 'email' ? (
          <form onSubmit={handleEmailChange}>
            <input type="text" value={newEmail} onChange={(event) => setNewEmail(event.target.value)} />
            <button type="submit">Guardar cambios</button>
          </form>
        ) : (
          <button onClick={() => setIsEditing('email')}>Editar email</button>
        )}
      </div>
      <div>
        <h2>Cambiar contraseña</h2>
        {isEditing === 'password' ? (
          <form onSubmit={handlePasswordChange}>
            <label>
              Contraseña actual:
              <input type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} />
            </label>
            <label>
              Nueva contraseña:
              <input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
            </label>
            <label>
              Confirmar nueva contraseña:
              <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
            </label>
            <button type="submit">Cambiar contraseña</button>
          </form>
        ) : (
          <button onClick={() => setIsEditing('password')}>Cambiar contraseña</button>
        )}
      </div>
    </div>
  );
}
