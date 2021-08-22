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
                        <Link to="/">SCHOOL_OF_CODE</Link>
                        <span>{" ]"}</span>
                    </li>
                    <li className="navbar-logo">
                        <span>{"{ "}</span>
                        <Link to="/">Home</Link>
                        <span>{" }"}</span>
                    </li>
                    <li className="navbar-logo">
                        <Link to="/showcase">Showcase</Link>
                    </li>
                    <li className="navbar-logo">
                        <Link to="/profiles">Profiles</Link>
                    </li>
                    <li className="navbar-logo">
                        <Link to="/journey">Journey</Link>
                    </li>
                    <li className="navbar-logo">
                        <Link to="/user">
                            <BiUserCircle />  
                        </Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}

export default Navbar
