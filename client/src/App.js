import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  } from "react-router-dom";
import Pet from "./pages/home/Pet"
import Articles from "./pages/Articles/Articles";
import EditPet from "./pages/EditPet/EditPet";
import PetInfo from "./pages/PetInfo/PetInfo"
import Calendar from "./pages/Calendar/Calendar";
import Login from "./pages/login/Login"
import Register from "./pages/Register/Register"
import { Cookies } from "react-cookie";
import jwt from 'jwt-decode';
import { useState, useEffect } from "react";
import axios from 'axios';
import { get } from "mongoose";


function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async() => {
      try {
        const response = await axios.get('http://localhost:3009/users', {
          signal: controller.signal
        })
        isMounted && setUser(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    getUsers();
    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])


  /*function handleLogin(token) {
    setCookie("userRegistered", token, { path: "/" });
  }*/

  return (
      <BrowserRouter>
        <Routes>
                <Route path="/home" element={<Pet />} />
                <Route path="/login" element={<Login />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/petprofile/:petid" element={<PetInfo />} />
                <Route path="/petprofile/:petid/vaccine" element={<PetInfo />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/register" element={<Register />} />
                <Route path="/appointment/:appid" element={<Calendar />} />

        </Routes>
    </BrowserRouter>
  );
}

export default App;
