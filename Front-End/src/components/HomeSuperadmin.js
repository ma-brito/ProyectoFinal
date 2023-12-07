import React from 'react';
import "./styles.css";
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

export function HomeSuperadmin() {
  const { user, setUser } = useContext(UserContext); // get the user context value
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.permiso !== 3) {
        console.log(user)
    }
  }, [user, navigate]);

  const handleLogout = () => {
    setUser(null); 
    navigate('/login'); 
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registrar" element={<FormularioAdmin/>} />
          <Route path="/veradmins" element={<VerAdmins/>} />
        </Routes>
      </div>
    </>
  );
}
