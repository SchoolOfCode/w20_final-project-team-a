import React from "react";
import "./Dashboard.scss"
import { useHistory } from "react-router-dom";
import AdminBoard from "../../Components/ReactComponents/AdminBoard/AdminBoard";
import EditProfile from "../../Components/ReactComponents/EditProfile/EditProfile";

type DashboardProps = {
  setCurrentUser: (value:any)=>void,
  loginStatus:boolean,
  currentUser:any,
  setLoginStatus:(value:boolean)=>void
};

const Dashboard: React.FC<DashboardProps> = ({ setCurrentUser, loginStatus, currentUser, setLoginStatus}) => {
  
  // const [currentUserData, setCurrentUserData] = useState<any>({});

  const history = useHistory();
  if (!currentUser || loginStatus === false) history.push("/login");

  return (
    <>
      {currentUser.role === "admin" && <AdminBoard />}
      {currentUser.displayName && currentUser.role !== "admin" && 
        <EditProfile 
          user={currentUser}
          setLoginStatus={ setLoginStatus}
          setCurrentUser={setCurrentUser}
        />}
    </>
  )

};

export default Dashboard;
