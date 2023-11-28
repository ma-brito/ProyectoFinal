import {useState} from "react";
import {Formulario} from "../components/Formulario";

export const Login = () => {
    const [user, setUser]=useState(null)

    //asigno valor de usuario dentro logiado
    const login =() => {
        //peticiones hechas al back de validaciones

        setUser({
            id: 1,
            name:"John"
        })
    }

    //asignamos valor de usuario que sale
    const logout = () =>setUser(null)
    return (


        <div>
            <Formulario></Formulario>
            {
                user ? (
                    <button onClick={logout}>Logout</button>
                ): (
                    <button onClick={login}>Login</button>
                )

            }


        </div>
    )
};

