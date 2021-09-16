import React from "react";
import "./AdminBoard.scss";
import LeftVerticalTitle from "../LeftVerticalTitle/LeftVerticalTitle";
import AdminProjectDisplay from "./AdminProjectDisplay";
import HorizontalCircuit from "../HorizontalCircuit/HorizontalCircuit";


const AdminBoard = () => {
  return (
    <div className="admin-page-container">
      <LeftVerticalTitle title="Admin Panel" />
      <HorizontalCircuit className="admin-horizontal-line"/>
      <AdminProjectDisplay />
    </div>
  );
};

export default AdminBoard;
