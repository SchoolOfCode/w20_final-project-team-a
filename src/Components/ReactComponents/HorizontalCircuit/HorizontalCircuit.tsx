import React from "react";
import "./HorizontalCircuit.scss";

const HorizontalCircuit = ({ className }: any) => {
  return (
    <div className={"circuit-container " + className}>
      <div className="circuit-line"></div>
      <div className="circuit-end"></div>
    </div>
  );
};

export default HorizontalCircuit;
