import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from 'react-modal';

Modal.setAppElement('#root'); // This line is important for accessibility purposes

export const VerAdmins = () => {
    const [admins, setAdmins] = useState([]);
    const [adminToEdit, setAdminToEdit] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const getAdmins = async () => {
        const response = await axios.get('http://localhost:5000/admins');
        setAdmins(response.data);
    };

    const deleteAdmin = async (email) => {
        console.log(email);
        await axios.post('http://localhost:5000/admins', { 
            email: email
        });
        getAdmins();
    };

    const editAdmin = (admin) => {
        setAdminToEdit(admin);
        setIsEditing(true);
    };

    const updateAdmin = async (event) => {
        event.preventDefault();
        console.log(adminToEdit.id);
        console.log(adminToEdit);
        await axios.put('http://localhost:5000/adminedit', {
            id: adminToEdit.id,
            new_data: adminToEdit
        });
        setIsEditing(false);
        getAdmins();
    };

    const handleInputChange = (event) => {
        setAdminToEdit({
            ...adminToEdit,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        getAdmins();
    }, []);

    return (
        <div>
            <h1>Lista de admins</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Contraseña</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => {
                        return (
                            <tr key={admin.idUsuario}>
                                <td>{admin.nombre}</td>
                                <td>{admin.email}</td>
                                <td>{admin.password}</td>
                                <td>
                                    <button onClick={() => editAdmin(admin)}>Editar</button>
                                </td>
                                <td>
                                    <button onClick={() => deleteAdmin(admin.email)}>Eliminar</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Modal 
                isOpen={isEditing} 
                onRequestClose={() => setIsEditing(false)}
                overlayClassName="modal-overlay"
                className="modal-content"
                >
                <h2>Editar Admin</h2>
                {adminToEdit && (
                    <form onSubmit={updateAdmin} className="modal-form">
                    <label>
                        Nombre:
                        <input type="text" name="nombre" value={adminToEdit.nombre} onChange={handleInputChange} className="modal-input" />
                    </label>
                    <label>
                        Correo:
                        <input type="text" name="email" value={adminToEdit.email} onChange={handleInputChange} className="modal-input" />
                    </label>
                    <label>
                        Contraseña:
                        <input type="password" name="password" value={adminToEdit.password} onChange={handleInputChange} className="modal-input" />
                    </label>
                    <button type="submit" className="modal-button">Actualizar</button>
                    </form>
                )}
                <button onClick={() => setIsEditing(false)} className="modal-button">Cancelar</button>
                </Modal>

    </div>
  );
};