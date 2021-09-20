import React, {useState, useEffect} from "react";
import axios from "axios";
import { API_URL } from "../../config";
import "./Dashboard.scss"
import { useHistory } from "react-router-dom";
import AdminBoard from "../../Components/ReactComponents/AdminBoard/AdminBoard";
import EditProfile from "../../Components/ReactComponents/EditProfile/EditProfile";

type DashboardProps = {
  loginStatus:boolean,
  currentUser:any,
  setLoginStatus:(value:boolean)=>void
};

const Dashboard: React.FC<DashboardProps> = ({ loginStatus, currentUser, setLoginStatus}) => {
  
  const [currentUserData, setCurrentUserData] = useState<any>({});

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authCheck = await axios.get(API_URL + "auth/check", {
          withCredentials: true,
        });
        const isLoggedIn = await authCheck.data.success;
        if (await isLoggedIn) {
          setLoginStatus(true);
          setCurrentUserData(authCheck.data.user);
        } else {
          setLoginStatus(false);
        }
      } catch (err) {
        let errorMessage =
          "An error occurred. Please refresh the page and try again.";
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        console.log(errorMessage);
      }
    };
    checkAuth();
  }, [setLoginStatus]);

  const history = useHistory();
  if (!currentUser || loginStatus === false) history.push("/login");

  return (
    <>
      {currentUser.role === "admin" && <AdminBoard />}
      {currentUser.displayName && currentUser.role !== "admin" && 
        <EditProfile 
          user={currentUserData}
          setLoginStatus={ setLoginStatus}
        />}
    </>
  )

};

export default Dashboard;
