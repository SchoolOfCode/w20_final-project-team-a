import React from 'react';
import logo from './logo.svg';
import './App.css';
import Homepage from './Pages/Homepage';
import Journey from './Pages/Journey';
import Navbar from './Pages/Navbar';
import Profiles from './Pages/Profiles';
import Showcase from './Pages/Showcase';
import Submit from './Pages/Submit';
import Userprofile from './Pages/UserProfile';
import {BrowserRouter as Router, Route} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Navbar />
      
      <Route exact path = "/" component={Homepage} />
      <Route exact path = "/showcase" component={Showcase} />
      <Route exact path = "/profiles" component={Profiles} />
      <Route exact path = "/journey" component={Journey} />
      <Route exact path = "/user" component={Userprofile} />
    </Router>
  );
}

export default App;
