import React from "react";
import "./Dashboard.scss"
import { useHistory } from "react-router-dom";
import AdminBoard from "../../Components/ReactComponents/AdminBoard/AdminBoard";
import EditProfile from "../../Components/ReactComponents/EditProfile/EditProfile";

type DashboardProps = {
  loginStatus:boolean,
  currentUser:any,
};

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
