import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Login} from './pages/Login';
import {Home} from './components/Home';
import { HomeAdmin } from './components/HomeAdmin.js';
import {HomeSuperadmin} from './components/HomeSuperadmin'; // Import HomeSuper component

function App(){
    const [user, setUser] = useState(null); // Define user state here

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>} /> 
                <Route path="/home/*" element={<Home user={user} setUser={setUser} />} />
                <Route path="/homeAdmin/*" element={<HomeAdmin user={user} setUser={setUser} />} /> 
                <Route path="/homeSuper/*" element={<HomeSuperadmin user={user} setUser={setUser} />} /> 
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;

