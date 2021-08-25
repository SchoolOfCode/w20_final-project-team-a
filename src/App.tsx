import React from 'react';
import logo from './logo.svg';
import './App.css';
import Homepage from './Pages/Homepage';
import Journey from './Pages/Journey';
import Navbar from './Pages/Navbar';
import Profiles from './Pages/Profiles';
import Showcase from './Pages/Showcase';
import Signup from './Pages/Signup';
import Submit from './Pages/Submit';
import Userprofile from './Pages/UserProfile';
import Login from './Pages/Login';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Dashboard from './Pages/Dashboard';



function App() {
  return (
    <Router>
      <Navbar />
      
      <Route exact path = "/" component={Homepage} />
      <Route exact path = "/showcase" component={Showcase} />
      <Route exact path = "/profiles" component={Profiles} />
      <Route exact path = "/journey" component={Journey} />
      <Route exact path = "/user" component={Signup} />
      <Route exact path = "/login" component={Login} />
      <Route exact path = "/dashboard" component={Dashboard} />
      <Route exact path = "/submit" component={Submit} />
    </Router>
  );
}

export default App;
