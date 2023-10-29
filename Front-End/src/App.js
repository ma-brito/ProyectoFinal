import {Formulario} from "./components/Formulario";
import {Home} from "./components/Home";
import {useState} from "react";
import './App.css';
import Logo from "../src/images/logo.jpeg";


function  App(){

  const [user, setUser]= useState([])

  return(

  <body>


      <div className="container">
          <header className='contenedor-logo'>
              <img

                  src={Logo}
                  alt='Logo'
              />



          </header>
        <div className='form-group' >
            {

                !user.length > 0

                    ?<Formulario setUser={setUser}></Formulario>
                    :<Home user={user} setUser={setUser}></Home>
            }


        </div>

      </div>
  </body>
  );

}
export default App