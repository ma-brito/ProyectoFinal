import { Link, useMatch, useResolvedPath } from "react-router-dom"
import React from "react"
import { FaGamepad } from "react-icons/fa";

export default function NavbarAdmin() {
  return (
    <nav className="nav">
      <Link to="/homeAdmin" className="site-title">
        GameChallengerNet
      </Link>
      <ul>
        <CustomLink to="/homeAdmin/registrartorneo">Registrar Torneo</CustomLink>
        <CustomLink to="/homeAdmin/vertorneos">Ver Torneos</CustomLink>
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