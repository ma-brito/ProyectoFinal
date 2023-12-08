import { Link, useMatch, useResolvedPath } from "react-router-dom"
import React from "react"
export default function NavbarUsuario() {
  return (
    <nav className="nav">
      <Link to="/homeuser" className="site-title">
        GameChallengerNet
      </Link>
      <ul>
        <CustomLink to="/homeuser/verperfil">Ver Perfil</CustomLink>
        <CustomLink to="/homeuser/registrarsetorneos">Registrarse a Torneos</CustomLink>
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