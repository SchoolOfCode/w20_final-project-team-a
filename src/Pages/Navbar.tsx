import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {BiUserCircle} from 'react-icons/bi'
import '../Styling/navbar.css'

type NavbarProps = {
    loginStatus: boolean;
}

const Navbar : React.FC<NavbarProps> = ({loginStatus}) =>{

   const [active, setActive] = useState(false);

    return (
        <nav className="navbar-nav">
            <div className="navbar-container">
        
                <ul className="navbar">
                    <li className="navbar-title">
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
                    {loginStatus &&
                    <>
                    <li className="navbar-logo">
                        <Link to="/submit" className="navbar-links">Submit</Link>
                    </li>
                    <li className="navbar-logo">
                        <Link to="/dashboard" className="navbar-links">Dashboard</Link>
                    </li>
                    </>
}
                    <li className="navbar-logo">
                        <Link to="/login" className="navbar-links">
                            <BiUserCircle />  
                        </Link>
                    </li>
                    
                </ul>
        </div>
        </nav>
        
    )
}

export default Navbar
