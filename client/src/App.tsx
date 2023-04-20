import './App.css';
import { Login } from './main_pages/Login';
import { Register } from './main_pages/Register';
import { CalendarPage } from './main_pages/CalendarPage';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import setAuthToken from "./auth";
import PropsIdUser from './components/props/PropsIdUser';

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [idOfLoggedUser, setIdOfUser] = useState(new PropsIdUser(1));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);


  const toggleForm = (formName:string) => {
    setCurrentForm(formName);
  }

  function logedUser(id:number) {
    setIdOfUser(new PropsIdUser(id));
    let num = '' + id;
    localStorage.setItem('id', num);

  }

  function stringToIntId(myString: string | null) {
    if (myString !== null) {
      setIdOfUser(new PropsIdUser(parseInt(myString)));
    } else {
      setIdOfUser(new PropsIdUser(1));
     }
  }

  useEffect(() => {
    // Check for token to keep user logged in
    if (localStorage.getItem("jwtToken")) {
      // Set auth token header auth
      const token = localStorage.getItem("jwtToken");
      setAuthToken(token!);
      // Decode token and get user info and exp
      setIsAuthenticated(true);
    }
    stringToIntId(localStorage.getItem('id'));
    console.log(localStorage.getItem('id'));
    console.log(localStorage.id);
  }, []);
 

  return (
    <BrowserRouter>
    <div className="App">
      {
        <Routes>
        <Route path="/login" element={isAuthenticated ? <CalendarPage {...idOfLoggedUser}/> : <Login logedUser={logedUser}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/calendar" element={<CalendarPage {...idOfLoggedUser}/>} />

        </Routes>
        /*
        currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> :
        currentForm === 'register' ? <Register onFormSwitch={toggleForm}/> :
        <CalendarComp onFormSwitch={toggleForm}/>


         currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> :
        <Register onFormSwitch={toggleForm}/>

        */
        }
    </div>
    </BrowserRouter>
  );
}

export default App;
