import { FormularioAdmin } from "./FormularioAdmin"
export  function Home({user,setUser}){

    const handleLogout = () =>{
        setUser([])
    }
    return(
        <div>
            <h1>Bienvenido</h1>
            <h2>{user.nombre}</h2>
            <button onClick={handleLogout}> Cerrar sesion</button>
        </div>

    )


}