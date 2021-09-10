import React from "react";
import { User } from "../../../Pages/06-Dashboard/Dashboard";
import "./AdminBoard.scss";
import LeftVerticalTitle from "../LeftVerticalTitle/LeftVerticalTitle";
import AdminProjectDisplay from "./AdminProjectDisplay";

interface ProfileProps {
  user: User;
}

const AdminBoard: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="admin-page-container">
      <LeftVerticalTitle title="Admin Panel" />
      <AdminProjectDisplay />
    </div>
  );
};

export default AdminBoard;
