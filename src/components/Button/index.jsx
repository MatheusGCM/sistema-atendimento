import React from "react";
import "./style.css";

const Button = ({ type, color, img }) => {
  return (
    <button className="btn" style={{ backgroundColor: color }}>
      {type}
      {img && (
        <div>
          <img
            src={img}
            alt={img}
            style={{
              width: 40,
              backgroundColor: "white",
              borderRadius: 50,
            }}
          />
        </div>
      )}
    </button>
  );
};

export default Button;
