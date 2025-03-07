import React from "react";
import "./buttone.css";

const Button = ({ onclick, type, children }) => {
  return (
    <button className="ui_button" onClick={onclick} type={type}>
      {children}
    </button>
  );
};

export default Button;
