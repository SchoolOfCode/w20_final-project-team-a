import React, { useState } from "react";
import "./App.scss";
import Navbar from "./Components/Navbar/Navbar";
import Homepage from "./Pages/00-Homepage/Homepage";

import ProjectsShowcase from "./Pages/01-Showcase/Showcase";

import ProfilesShowcase from "./Pages/ProfilesShowcase";
import BootcamperProfile from "./Pages/BootcamperProfile";

import Signup from "./Pages/Signup";
import Submit from "./Pages/Submit";
import Login from "./Pages/Login";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";

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
      <Route exact path="/bootcampers" component={ProfilesShowcase} />
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
