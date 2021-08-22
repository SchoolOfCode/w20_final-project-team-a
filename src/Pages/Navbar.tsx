import React from 'react'
import { Link } from 'react-router-dom'
import {BiUserCircle} from 'react-icons/bi'
import '../Styling/navbar.css'

const Navbar = () => {
    return (
        <div className="navbar-container">
            <nav className="navbar-nav">

            <div className="navbar-toggle" id="mobile-menu">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>

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
            </nav>
        </div>
    )
}

export default Navbar
