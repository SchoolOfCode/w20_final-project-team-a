import React, { useState,useEffect } from "react";
import "./App.scss";

import Navbar from "./Components/ReactComponents/Navbar/Navbar";
import Homepage from "./Pages/00-Homepage/Homepage";
import ProjectsShowcase from "./Pages/01-Showcase/Showcase";
import Bootcampers from "./Pages/02-Bootcampers/Bootcampers";
import BootcamperProfile from "./Pages/02-Bootcampers/02-Bootcampers-Individual/BootcamperProfile";
import Dashboard from "./Pages/06-Dashboard/Dashboard";
import ShowcaseProfile from "./Pages/01-Showcase/showcase-individual/ShowcaseProfile";
import Signup from "./Pages/04-User/04-Signup/Signup";
import Submit from "./Pages/05-Submit/Submit";
import Login from "./Pages/04-User/04-Login/Login";

import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import { API_URL } from "./config";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>({})

  useEffect(() => {
    const checkAuth = async() =>{
      try{
        const authCheck = await axios.get(API_URL + "auth/check",{
          withCredentials: true})
        const isLoggedIn = await authCheck.data.success
        if (await isLoggedIn){
          setLoginStatus(true)
          setCurrentUser(authCheck.data.user)
        }else{
          setLoginStatus(false)
        }
        }catch(err){
          let errorMessage = "An error occurred. Please refresh the page and try again.";
          if (err instanceof Error) {
            errorMessage = err.message;
          }
          console.log(errorMessage)
        }
    }
    checkAuth()
  }, [loginStatus])

  return (
    <Router>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap');
      </style>

      <Route path="/:page">
        <Navbar loginStatus={loginStatus} setLoginStatus={setLoginStatus} setCurrentUser={setCurrentUser}/>
      </Route>
      <Route exact path="/">
        <Navbar loginStatus={loginStatus} setLoginStatus={setLoginStatus} setCurrentUser={setCurrentUser} />
      </Route>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/featured" component={Homepage} />
      <Route exact path="/showcase" component={ProjectsShowcase} />
      <Route exact path="/project_showcase" component={ShowcaseProfile}/>
      <Route exact path="/bootcampers" component={Bootcampers} />
      <Route exact path="/bootcamper_profile" component={BootcamperProfile} />
      <Route exact path="/signup" component={Signup} />

      {/* Authentication/Authenticated routes */}
      <Route exact path="/login">
        <Login loginStatus={loginStatus} setLoginStatus={setLoginStatus} setCurrentUser={setCurrentUser}/>
      </Route>

      <Route exact path="/dashboard">
        <Dashboard currentUser={currentUser} loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>
      </Route>

      <Route exact path="/submit">
        <Submit currentUser={currentUser} loginStatus={loginStatus} />
      </Route>
    </Router>
  );
}

export default App;
