import React, { useState } from "react";
import "./App.scss";
import Navbar from "./Components/ReactComponents/Navbar/Navbar";
import Homepage from "./Pages/00-Homepage/Homepage";

import ProjectsShowcase from "./Pages/01-Showcase/Showcase";

import Bootcampers from "./Pages/02-Bootcampers/Bootcampers";
import BootcamperProfile from "./Pages/02-Bootcampers/02-Bootcampers-Individual/BootcamperProfile";

import Signup from "./Pages/04-User/04-Signup/Signup";
import Submit from "./Pages/05-Submit/Submit";
import Login from "./Pages/04-User/04-Login/Login";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./Pages/06-Dashboard/Dashboard";
import ShowcaseProfile from "./Pages/01-Showcase/showcase-individual/ShowcaseProfile";


function App() {
  const [loginStatus, setLoginStatus] = useState(false);

  return (
    <Router>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap');
      </style>

      <Route path="/:page">
        <Navbar loginStatus={loginStatus} />
      </Route>
      <Route exact path="/">
        <Navbar loginStatus={loginStatus} />
      </Route>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/home" component={Homepage} />
      <Route exact path="/showcase" component={ProjectsShowcase} />
      <Route exact path="/project_showcase" component={ShowcaseProfile}/>
      <Route exact path="/bootcampers" component={Bootcampers} />
      <Route exact path="/bootcamper_profile" component={BootcamperProfile} />
      <Route exact path="/signup" component={Signup} />

      {/* Authentication routes */}
      <Route exact path="/login">
        <Login loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
      </Route>

      <Route exact path="/dashboard">
        <Dashboard loginStatus={loginStatus} />
      </Route>

      <Route exact path="/submit">
        <Submit loginStatus={loginStatus} />
      </Route>
    </Router>
  );
}

export default App;
