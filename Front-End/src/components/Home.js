//import usenavigate
import { useNavigate } from 'react-router-dom';
export function Home({user, setUser}){

    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null); 
        navigate('/login'); 
    }

    return(
        <div>
            <h1>Bienvenido</h1>
            <h2>{user && user.nombre}</h2>
            <button onClick={handleLogout}>Cerrar sesion</button>
        </div>
    )
}
