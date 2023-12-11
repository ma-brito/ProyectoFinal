import React from 'react';
import {FormularioAdmin} from './FormularioAdmin';
import { HomeSuper } from '../pages/HomeSuper';
import {Routes, Route, useNavigate, Outlet} from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import Navbar from "./Navbar"
import {useEffect} from 'react';
import { Home } from './Home';
import { VerAdmins } from './VerAdmins';
import { useContext } from 'react';
import { UserContext } from '../App'; 
import NavbarUsuario from './NavbarUsuario';
import { VerPerfil } from './VerPerfil';
import { RegistrarseTorneos } from './RegistrarseTorneos';
import { HomeTorneos } from './HomeTorneos';
export function HomeUsuario() {
  const { user, setUser } = useContext(UserContext); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!user ) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <>
      <NavbarUsuario />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomeTorneos />} />
          <Route path="/verperfil" element={<VerPerfil/>} />
          <Route path="/registrarsetorneos" element={<RegistrarseTorneos/>} />
        </Routes>
      </div>
    </>
  );
}
