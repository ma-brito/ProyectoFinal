import React from 'react'
import {Routes, Route,} from 'react-router-dom';
import {FormularioAdmin} from './FormularioAdmin';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import NavbarAdmin from './NavbarAdmin';
import { Formulario } from './Formulario';
import { Home } from './Home';
import { FormularioTorneo } from './FormularioTorneo';
import { VerTorneos } from './VerTorneos';

export function HomeAdmin({user, setUser}) {
  const navigate = useNavigate();

  useEffect(() => {
      if (!user || user.permiso !== 1) {
          console.log(user)
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

