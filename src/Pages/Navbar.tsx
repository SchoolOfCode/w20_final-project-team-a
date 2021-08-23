import React, {useCallback, useState} from 'react'
import { Link } from 'react-router-dom'
import {BiUserCircle} from 'react-icons/bi'
import '../Styling/navbar.css'

const Navbar = () => {

    const [isOn, toggleIsOn] = useToggle();
    return (
        <nav className="navbar-nav">
<div className="navbar-container">
            

            <button onClick={toggleIsOn}>{isOn ? 'is-active' : 'isNotActive'} className="navbar-toggle" id="mobile-menu" >
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>

                <ul className="navbar">
                    <li className="navbar-logo">
                        <span>{"[ "}</span>
                        <Link to="/" className="navbar-links">SCHOOL_OF_CODE</Link>
                        <span>{" ]"}</span>
                    </li>
                    <li className="navbar-logo">
                        <span>{"{ "}</span>
                        <Link to="/" className="navbar-links">Home</Link>
                        <span>{" }"}</span>
                    </li>
                    <li className="navbar-logo">
                        <Link to="/showcase" className="navbar-links">Showcase</Link>
                    </li>
                    <li className="navbar-logo">
                        <Link to="/profiles" className="navbar-links">Profiles</Link>
                    </li>
                    <li className="navbar-logo">
                        <Link to="/journey" className="navbar-links">Journey</Link>
                    </li>
                    <li className="navbar-logo">
                        <Link to="/user" className="navbar-links">
                            <BiUserCircle />  
                        </Link>
                    </li>

                </ul>
        </div>
        </nav>
        
    )
}

const useToggle = (initialState = false) =>{
    const [state,setState] = useState(initialState);
    const toggle = useCallback(()=> setState(state => !state), []);

    return [state, toggle]
}

export default Navbar
