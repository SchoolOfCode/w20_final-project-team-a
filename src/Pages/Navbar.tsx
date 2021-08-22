import React from 'react'
import { Link } from 'react-router-dom'
import {BiUserCircle} from 'react-icons/bi'
import '../Styling/navbar.css'

const Navbar = () => {
    return (
        <div className="navbar-container">
            <nav>
                <ul className="navbar">
                    <li>
                        <span>{"{ "}</span>
                        <Link to="/">Home</Link>
                        <span>{" }"}</span>
                    </li>
                    <li>
                        <Link to="/showcase">Showcase</Link>
                    </li>
                    <li>
                        <Link to="/profiles">Profiles</Link>
                    </li>
                    <li>
                        <Link to="/journey">Journey</Link>
                    </li>
                    <li>
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
