import { Link, useMatch, useResolvedPath } from "react-router-dom"
import React, { useContext } from "react"
import { UserContext } from '../App'; 
import { useNavigate } from 'react-router-dom';

export default function NavbarUsuario() {
  const { user, setUser } = useContext(UserContext); 
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); 
    navigate('/login'); 
  }

  return (
    <nav className="nav">
      <Link to="/homeuser" className="site-title">
        GameChallengerNet
      </Link>
      <ul>
        <CustomLink to="/homeuser/verperfil">Ver Perfil</CustomLink>
        <CustomLink to="/homeuser/registrarsetorneos">Registrarse a Torneos</CustomLink>
        <CustomLink to="/login" onClick={handleLogout}>Cerrar Sesión</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
