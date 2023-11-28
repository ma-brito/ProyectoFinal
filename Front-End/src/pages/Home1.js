import {BrowserRouter, Link, Route} from 'react-router-dom';
import {Home} from "../components/Home.js";

import React from "react";

import {HomeSuper} from "./HomeSuper";
import {RegistroTorneos} from "./RegistroTorneos";
import {VistaTorneos} from "./VistaTorneos";
export const Home1 = () => {
    return (
        <div>
        <BrowserRouter>
            <Navigation />
            <Route Home1 element={<Home1 />} />
            <Route path='/home' element = {<Home1 />} />
            <Route path='/homesuper' element = {<HomeSuper />} />
            <Route path='/regtorneos' element ={<RegistroTorneos />} />
            <Route path='/vertorneos' elemnt = {<VistaTorneos />} />


        </BrowserRouter>



            <Home></Home>

        </div>
    );
};



function Navigation(){
    return <nav>
        <ul>
            <li>
                <Link to='/home'>Home </Link>
            </li>
            <li>
                <Link to='/homesuper'> Home-super </Link>
            </li>
            <li>
                <Link to='/regtorneos'>registro de torneos </Link>
            </li>
            <li>
                <Link to='/vertorneso'>ver torneso </Link>
            </li>



        </ul>





    </nav>
}
