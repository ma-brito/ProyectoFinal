
import React, { useState, useContext, useRef } from 'react';
import axios from 'axios';
import { UserContext } from '../App';
import "../css/VerPerfil.css";
import pfpic from '../imges/default-profile-pic.jpg';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function VerPerfil() {
  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user.nombre);
  const [newEmail, setNewEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const fileInput = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/userdata', { params: { idUsuario: user.idUsuario } });
      const userData = response.data;

      if (userData.profilePicture) {
        
        const newProfileImage = `http://localhost:5000/images/${userData.profilePicture}`;
        setProfileImage(newProfileImage);
        setUser({ ...user, profilePicture: newProfileImage });
      } else {
        setProfileImage(pfpic);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmMessage = '¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.';
    if (!window.confirm(confirmMessage)) {
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/usuariosdel', { 
        idUsuario: user.idUsuario
    });
      if (response.status === 200) {
        setUser(null);
        navigate('/login');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };
  
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('imagen', file);
    formData.append('idUsuario', user.idUsuario);
  
    try {
      const response = await axios.put('http://localhost:5000/updateprofilepic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);
      if (response.data.success) {
        setProfileImage(URL.createObjectURL(file));
        console.log(profileImage);
        setUser({ ...user, profilePicture: response.data.profilePicture });
        alert('Imagen de perfil actualizada exitosamente.');
      } else {
        alert('Hubo un error al actualizar la imagen de perfil.');
      }
    } catch (error) {
      console.error('Error al subir la imagen de perfil:', error);
    }
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
      if (error.response && error.response.status === 400) {
        alert("Invalid email format");
      } else {
        alert("Hay un error con el servidor");
      }
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
    <div className="profile-container">
      <div className="profile-pic">
        <img src={profileImage || pfpic} alt="Profile" />
        <input type="file" onChange={handleImageChange} style={{ display: 'none' }} ref={fileInput} />
        <button onClick={() => fileInput.current.click()}>Subir foto de perfil</button>
      </div>
      <div className="profile-info-box">
      <div className="profile-info">
        <h1>Tus Datos</h1>
        <div>
          <h2>Nombre: {user.nombre}</h2>
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
          <h2>Email: {user.email}</h2>
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
        <button onClick={handleDeleteAccount}>Eliminar Cuenta</button>
      </div>
      </div>
    </div>
  );
}  