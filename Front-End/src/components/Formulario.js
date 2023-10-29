import "./Formulario.css"
import { useState} from "react";

export function Formulario({setUser}) {
    const [nombre, setNombre] = useState("")
    const [contrseña, setContraseña] = useState("")
    const [error, setError] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        if (nombre === "" || contrseña === "") {
            setError(true)
            return
        }
        setError(false)

        setUser([nombre])
    }
    return (
        <section>
            <h1>Login</h1>

            <form
                className="formulario"
                onSubmit={handleSubmit}
            >
                <label htmlFor="usuario">Usuario:</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={event => setNombre(event.target.value)}
                />
                <label htmlFor="contrasena">Contraseña:</label>
                <input
                    type="password"
                    value={contrseña}
                    onChange={event => setContraseña(event.target.value)}
                />
                <button>Iniciar sesion</button>
            </form>
            {error && <p>Todos los campos son obligatorios</p>}
        </section>

    )
}
