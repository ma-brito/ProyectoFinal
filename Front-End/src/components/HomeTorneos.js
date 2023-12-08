import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../imges/logo.jpeg'
import { UserContext } from '../App'; 
import axios from 'axios';

export function HomeTorneos(){
    const [torneos, setTorneos] = useState([]);
    const [selectedTorneo, setSelectedTorneo] = useState(null);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");
    const { user, setUser } = useContext(UserContext); 
    console.log(user);
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null); 
        navigate('/login'); 
    }

    useEffect(() => {
        const fetchTorneos = async () => {
          try {
            const response = await axios.get("http://localhost:5000/torneos");
            if (response.status === 200) {
              setTorneos(response.data);
            }
          } catch (error) {
            setError("Hubo un error al obtener los torneos.");
            setTimeout(() => setError(""), 5000); // Limpiar el mensaje de error después de 5 segundos
          }
        };
    
        fetchTorneos();
      }, []);

    return(
        <div>
            <h1>Bienvenido</h1>
            <h2>{user && user.nombre}</h2>
            <h3>Torneos actuales</h3>
            {torneos.map((torneo) => (
                <div key={torneo.idTorneo}>
                    <h2>{torneo.nombre}</h2>
                    <p>{torneo.juego} - {torneo.consola}</p>
                </div>
            ))}
            <button onClick={handleLogout}>Cerrar sesion</button>
        </div>
    )
}
