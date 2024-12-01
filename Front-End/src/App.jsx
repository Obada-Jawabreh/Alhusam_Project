import { useState } from "react";
import "./App.css";
import { Route, BrowserRouter, Routes, useLocation } from "react-router-dom";
import SignUp from "./pages/SiginUp/SignUp.jsx";
import Login from "./pages/Login/Login.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
