import React from "react";
import "./style.css";

const Button = ({ name, img, onClick }) => {
  return (
    <button className="btn" onClick={onClick} >
      <div>
        <p>{img}</p>
        <h1>{name}</h1>
      </div>
    </button>
  );
};

export default Button;
