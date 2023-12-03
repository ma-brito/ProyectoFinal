import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Login} from './pages/Login';
import {Home} from './components/Home';
import { HomeAdmin } from './components/HomeAdmin.js';
import {HomeSuperadmin} from './components/HomeSuperadmin'; 

function App(){
    const [user, setUser] = useState(null); 

    return (
            <Routes>
                <Route path="/login" element={<Login/>} /> 
                <Route path="/home/*" element={<Home user={user} setUser={setUser} />} />
                <Route path="/homeAdmin/*" element={<HomeAdmin user={user} setUser={setUser} />} /> 
                <Route path="/homeSuperadmin/*" element={<HomeSuperadmin user={user} setUser={setUser} />} />

                <Route path="/" element={<Login />} />
            </Routes>
    );
}

export default App;

