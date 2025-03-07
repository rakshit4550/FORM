import React from "react";
import "./Buttontologin.css";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Buttontologin = () => {
  const navigate = useNavigate();
  const navigatehandler = () => {
    navigate("/login");
  };
  return (
    <div className="back_to_logingui" onClick={navigatehandler}>
      <FaLongArrowAltLeft />
      <p>Buttontologin</p>
    </div>
  );
};

export default Buttontologin;
