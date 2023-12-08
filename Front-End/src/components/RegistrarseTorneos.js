import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from '../App'; 

export function RegistrarseTorneos() {
  const { user, setUser } = useContext(UserContext);
  const [torneos, setTorneos] = useState([]);
  const [selectedTorneo, setSelectedTorneo] = useState(null);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

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

  const handleRegister = async (torneo) => {
    console.log(torneo);
    try {
      const response = await axios.post("http://localhost:5000/registrartorneo", {
        idUsuario: user.idUsuario,
        idTorneo: torneo.id,
      });

      if (response.status === 200) {
        console.log("Usuario registrado al torneo");
        setMensaje("Usuario registrado al torneo");
        setTimeout(() => setMensaje(""), 5000); // Limpiar el mensaje después de 5 segundos
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("El usuario ya está registrado en este torneo");
        setError("El usuario ya está registrado en este torneo");
      } else {
        console.log("Error desconocido");
        setError("Hubo un error con el servidor. Lo sentimos, intenta más tarde");
      }
      setTimeout(() => setError(""), 5000); // Limpiar el mensaje de error después de 5 segundos
    }
  };

  const handleConfirm = (torneo) => {
    const confirmMessage = `¿Seguro que quieres inscribirte al torneo ${torneo.nombre}?`;
    if (window.confirm(confirmMessage)) {
      handleRegister(torneo);
    }
  };

  const handleDetails = (torneo) => {
    setSelectedTorneo(torneo);
    const details = `
      Juego: ${torneo.juego}
      Consola: ${torneo.consola}
      Número de Participantes: ${torneo.numParticipantes}
      Fecha de Inicio: ${torneo.fechaInicio}
      Fecha de Fin: ${torneo.fechaFin}
    `;
    alert(details);
  };

  return (
    <section>
      <h1>Registrar a Torneo</h1>

      {torneos.map((torneo) => (
        <div key={torneo.idTorneo}>
          <img src={torneo.imagen} alt={torneo.nombre} />
          <h2>{torneo.nombre}</h2>
          <p>{torneo.juego} - {torneo.consola}</p>
          <button onClick={() => handleDetails(torneo)}>Ver detalles</button>
          <button onClick={() => handleConfirm(torneo)}>Registrarse</button>
        </div>
      ))}

      <p>{mensaje}</p>
      <p>{error}</p>
    </section>
  );
}
