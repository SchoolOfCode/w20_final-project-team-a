import React from "react";
import "./Dashboard.scss"
import { useHistory } from "react-router-dom";
import AdminBoard from "../../Components/ReactComponents/AdminBoard/AdminBoard";
import EditProfile from "../../Components/ReactComponents/EditProfile/EditProfile";
// import Loading from "../../Components/ReactComponents/Loading/Loading";

type DashboardProps = {
  loginStatus:boolean,
  currentUser:any,
};

export interface User {
  _id: string;
  email: string;
  displayName: string;
  cohort?: string;
  githubUrl?: string;
  photo?: string;
  statement?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  personalWebsite?: string;
  location?: string;
  role: string;
  projects?: string[];
}

const Dashboard: React.FC<DashboardProps> = ({ loginStatus, currentUser}) => {


  const history = useHistory();
  if (!currentUser || loginStatus === false) history.push("/login");

  return (
    <>
      {currentUser.role === "admin" && <AdminBoard />}
      {currentUser.displayName && currentUser.role !== "admin" && <EditProfile user={currentUser}/>}
    </>
  )

};

export default Dashboard;
