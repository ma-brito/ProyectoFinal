import {useState, useEffect} from "react";
import {Formulario} from "../components/Formulario";
import {useNavigate} from "react-router-dom";

export const Login = ({ setUser }) => {
    const [user, setUserLocal] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            switch(user.permiso) {
                case 0:
                    navigate('/home');
                    break;
                case 1:
                    navigate('/homeAdmin');
                    break;
                case 3:
                    navigate('/homeSuper');
                    break;
                default:
                    navigate('/login');
            }
        }
    }, [user, navigate]);

    return (
        <div>
            <Formulario setUser={setUserLocal}></Formulario>
        </div>
    )
};

