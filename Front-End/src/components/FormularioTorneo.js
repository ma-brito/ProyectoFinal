import React, { useState } from "react";
import axios from "axios";

export function FormularioTorneo() {
    const [nombre, setNombre] = useState("");
    const [juego, setJuego] = useState("");
    const [consola, setConsola] = useState("");
    const [numParticipantes, setNumParticipantes] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [imagen, setImagen] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (nombre === "" || juego === "" || consola === "" || numParticipantes === "" || fechaInicio === "" || fechaFin === "" || imagen === null) {
            setError("Por favor, rellene todos los campos.");
            return;
        }
        setError("");

        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("juego", juego);
        formData.append("consola", consola);
        formData.append("numParticipantes", numParticipantes);
        formData.append("fechaInicio", fechaInicio);
        formData.append("fechaFin", fechaFin);
        formData.append("imagen", imagen);

        try {
            const response = await axios.post("http://localhost:5000/torneos", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (response.status === 200) {
                console.log("Torneo registrado");
                setMensaje("Torneo registrado");
            }
        } catch (error) {
            console.log("Error desconocido");
            setError("Hubo un error con el servidor. Lo sentimos, intenta más tarde");
        }
    }

    const handleImageChange = (event) => {
        setImagen(event.target.files[0]);
    };

    return (
        <section>
            <h1>Registrar Torneo</h1>

            <form className="formulario" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre del Torneo:</label>
                    <input type="text" value={nombre} onChange={(event) => setNombre(event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="juego">Juego:</label>
                    <input type="text" value={juego} onChange={(event) => setJuego(event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="consola">Consola:</label>
                    <input type="text" value={consola} onChange={(event) => setConsola(event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="numParticipantes">Número de Participantes:</label>
                    <input type="number" value={numParticipantes} onChange={(event) => setNumParticipantes(event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="fechaInicio">Fecha de Inicio:</label>
                    <input type="date" value={fechaInicio} onChange={(event) => setFechaInicio(event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="fechaFin">Fecha de Fin:</label>
                    <input type="date" value={fechaFin} onChange={(event) => setFechaFin(event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="imagen">Imagen Representativa:</label>
                    <input type="file" onChange={handleImageChange} />
                </div>
                <button>Registrar Torneo</button>
            </form>
            <p>{mensaje}</p>
            <p>{error}</p>
        </section>
    );
}
