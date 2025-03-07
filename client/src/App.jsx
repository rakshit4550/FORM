import React from "react";
import Register from "./components/auth/Register";
import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import ForgetPassword from "./components/auth/ForgetPassword";
import VeryFyotp from "./components/auth/VeryFyotp";
import Update from "./components/auth/Update";
import Super from "./components/Super";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forget/password" element={<ForgetPassword />} />
      <Route element={<Super />}>
        <Route path="/otp/verify" element={<VeryFyotp />} />
        <Route path="/password/verify" element={<Update />} />
      </Route>
      <Route />
    </Routes>
  );
};

export default App;
