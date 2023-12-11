import React from 'react'
import {Routes, Route,} from 'react-router-dom';
import {FormularioAdmin} from './FormularioAdmin';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import NavbarAdmin from './NavbarAdmin';
import { Home } from './Home';
import { FormularioTorneo } from './FormularioTorneo';
import { VerTorneos } from './VerTorneos';
import { useContext } from 'react';
import { UserContext } from '../App'; 

export function HomeAdmin() {
  const { user, setUser } = useContext(UserContext); // get the user context value
  const navigate = useNavigate();

  useEffect(() => {
      if (!user || user.permiso !== 1) {
        navigate('/login');
      }
  }, [user, navigate]);

  return (
    <>
      <NavbarAdmin />
      <div className="container">
        <Routes>
        <Route path="/" element={<Home setUser={setUser} />} />
          <Route path="/registrartorneo" element={<FormularioTorneo />} /> 
          <Route path="/vertorneos" element={<VerTorneos/>} />
        </Routes>
      </div>
    </>
  )
}

