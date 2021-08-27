import React from 'react';
import './App.css';
import Navbar from './Pages/Navbar';
import Homepage from './Pages/Homepage';

import ProjectsShowcase from './Pages/ProjectsShowcase';
import Journey from './Pages/Journey';

import ProfilesShowcase from './Pages/ProfilesShowcase';
import BootcamperProfile from './Pages/BootcamperProfile';

import Signup from './Pages/Signup';
import Submit from './Pages/Submit';
import Login from './Pages/Login';

import {BrowserRouter as Router, Route} from 'react-router-dom'
import Dashboard from './Pages/Dashboard';


function App() {
  return (
    <Router>
      <Navbar />
      
      <Route exact path = "/" component={Homepage} />
      <Route exact path = "/showcase" component={ProjectsShowcase} />
      <Route exact path = "/profiles" component={ProfilesShowcase} />
      <Route exact path = "/bootcamper_profile" component={BootcamperProfile} />
      <Route exact path = "/journey" component={Journey} />
      <Route exact path = "/signup" component={Signup} />
      <Route exact path = "/login" component={Login} />

      <Route exact path = "/dashboard" component={Dashboard} />
      <Route exact path = "/submit" component={Submit} />
    </Router>
  );
}

export default App;
