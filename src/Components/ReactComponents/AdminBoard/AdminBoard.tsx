import React from "react";
import "./AdminBoard.scss";
import LeftVerticalTitle from "../LeftVerticalTitle/LeftVerticalTitle";
import AdminProjectDisplay from "./AdminProjectDisplay";


const AdminBoard = () => {
  return (
    <div className="admin-page-container">
      <LeftVerticalTitle title="Admin Panel" />
      <AdminProjectDisplay />
    </div>
  );
};

export default AdminBoard;
