import React from 'react'
import {Routes, Route} from 'react-router-dom';
import {FormularioAdmin} from './FormularioAdmin';

export function HomeAdmin({user, setUser}) {
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/fadmin" element={<FormularioAdmin />} />
        </Routes>
      </div>
    </>
  )
}

