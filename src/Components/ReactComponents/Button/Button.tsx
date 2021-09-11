import React from "react";
import "./Button.scss";

const Button = ({ title }: any, { onClick }: any) => {
  <div>
    <button type="button" className="button-component" onClick={onClick}>
      {title}
    </button>
  </div>;
};

export default Button;
