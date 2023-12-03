import React, { useState, useEffect } from "react";
import axios from "axios";

export const VerTorneos = () => {
    const [torneos, setTorneos] = useState([]);
    const [torneoToEdit, setTorneoToEdit] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const getTorneos = async () => {
        const response = await axios.get('http://localhost:5000/torneos');
        setTorneos(response.data);
    };

    const deleteTorneo = async (email) => {
        console.log(email);
        await axios.post('http://localhost:5000/torneosdel', { 
            id: email
        });
        getTorneos();
    };

    const editTorneo = (torneo) => {
        setTorneoToEdit(torneo);
        setIsEditing(true);
    };

    const updateTorneo = async (event) => {
        event.preventDefault();
        console.log(torneoToEdit.id);
        console.log(torneoToEdit);
        await axios.put('http://localhost:5000/torneoedit', {
            id: torneoToEdit.id,
            new_data: torneoToEdit
        });
        setIsEditing(false);
        getTorneos();
    };

    const handleInputChange = (event) => {
        setTorneoToEdit({
            ...torneoToEdit,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        getTorneos();
    }, []);

    return (
        <div>
            <h1>Lista de torneos</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Juego</th>
                        <th>Consola</th>
                        <th>Participantes</th>
                        <th>Fecha de inicio</th>
                        <th>Fecha de fin</th>
                        <th>Imagen</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {torneos.map((torneo) => {
                        return (
                            <tr key={torneo.id}>
                                <td>{torneo.nombre}</td>
                                <td>{torneo.juego}</td>
                                <td>{torneo.consola}</td>
                                <td>{torneo.numParticipantes}</td>
                                <td>{torneo.fechaInicio}</td>
                                <td>{torneo.fechaFin}</td>
                                <td><img src={torneo.imagen} alt="Imagen del torneo" /></td>
                                <td>
                                    <button onClick={() => editTorneo(torneo)}>Editar</button>
                                </td>
                                <td>
                                    <button onClick={() => deleteTorneo(torneo.id)}>Eliminar</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {isEditing && (
                <form onSubmit={updateTorneo}>
                    <label>
                        Nombre:
                        <input type="text" name="nombre" value={torneoToEdit.nombre} onChange={handleInputChange} />
                    </label>
                    <label>
                        Juego:
                        <input type="text" name="juego" value={torneoToEdit.juego} onChange={handleInputChange} />
                    </label>
                    <label>
                        Consola:
                        <input type="text" name="consola" value={torneoToEdit.consola} onChange={handleInputChange} />
                    </label>
                    <label>
                        Participantes:
                        <input type="number" name="numParticipantes" value={torneoToEdit.numParticipantes} onChange={handleInputChange} />
                    </label>
                    <label>
                        Fecha de inicio:
                        <input type="date" name="fechaInicio" value={torneoToEdit.fechaInicio} onChange={handleInputChange} />
                    </label>
                    <label>
                        Fecha de fin:
                        <input type="date" name="fechaFin" value={torneoToEdit.fechaFin} onChange={handleInputChange} />
                    </label>
                    <label>
                        Imagen:
                        <input type="file" name="imagen" onChange={handleInputChange} />
                    </label>
                    <button type="submit">Actualizar</button>
                    <button onClick={() => setIsEditing(false)}>Cancelar</button>
                </form>
            )}
        </div>
    );
};
