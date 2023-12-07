import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Login} from './pages/Login';
import {Home} from './components/Home';
import { HomeAdmin } from './components/HomeAdmin.js';
import {HomeSuperadmin} from './components/HomeSuperadmin'; 
import { HomeUsuario } from './components/HomeUsuario.js';

// create a user context object
export const UserContext = React.createContext();

// create a custom provider component that takes the user state and setter as props
const UserProvider = ({ user, setUser, children }) => {
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// wrap your app component with the user provider component and pass the user state and setter as props
export default function App() {
  const [user, setUser] = useState(null);

  return (
    <UserProvider user={user} setUser={setUser}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home/*" element={<HomeUsuario />} />
        <Route path="/homeAdmin/*" element={<HomeAdmin />} />
        <Route path="/homeSuperadmin/*" element={<HomeSuperadmin />} />

        <Route path="/" element={<Login />} />
      </Routes>
    </UserProvider>
  );
}
