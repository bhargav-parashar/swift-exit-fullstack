import Header from "./components/Header/Header.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import IsLoggedInContext from "./components/Context/IsLoggedInContext.js";

export const config = {
  endpoint: `https://swift-exit-backend.onrender.com/api`,
  authorization: import.meta.env.VITE_AUTHORIZATION
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );
  const [isLogoutClicked, setIsLogoutClicked ] = useState(false);

  return (
    <>
      <CssBaseline />
      <IsLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn,isLogoutClicked, setIsLogoutClicked}}>
        <Header />
        <Outlet />
      </IsLoggedInContext.Provider>
    </>
  );
}

export default App;
