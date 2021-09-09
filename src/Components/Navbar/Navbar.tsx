import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {BiUserCircle} from 'react-icons/bi'
import UserIconLogin from '../../Components/SVGIcons/PNG/user_login.png'
import UserIconLogout from '../../Components/SVGIcons/PNG/user_logout.png'

import '../../Styling/navbar.css'
import { NavbarLink } from './NavbarLink'
import Logo from './Logo'

type NavbarProps = {
    loginStatus: boolean;
}

const Navbar : React.FC<NavbarProps> = ({loginStatus}) =>{

    const location = useLocation();
    console.log(location)

    return (
        <div className="nav-bar-container">
            <div className="navbar-logo">
                <Logo />
            </div>
            <nav className="navbar-links">
                <div className="navbar-item">
                    <NavbarLink page="home" />
                </div>
                <div className="navbar-item">
                    <NavbarLink page="showcase" />
                </div>            
                <div className="navbar-item">
                    <NavbarLink page="profiles" />
                </div>
                {loginStatus &&
                    <>
                        <div className="navbar-item">
                            <NavbarLink page="submit" />
                        </div>
                        <div className="navbar-item">
                            <NavbarLink page="dashboard" />
                        </div>
                    </>
                }


            {/* <span>{"[ "}</span>
                <   Link to="/" className="navbar-links">SCHOOL_OF_CODE</Link>
                <span>{" ]"}</span> */}
            {/* <li className="navbar-logo">
                <span>{"{ "}</span>
                    <Link to="/" className="navbar-links">Home</Link>
                <span>{" }"}</span>
            </li>
            <li className="navbar-logo">
                <span>{"{ "}</span>
                    <Link to="/showcase" className="navbar-links">Showcase</Link>
                <span>{" }"}</span>
            </li>
            <li className="navbar-logo">
                <Link to="/profiles" className="navbar-links">Profiles</Link>
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
                    <BiUserCircle className="navbar-user-icon"/>  
                </Link>
            </li>
            
            </ul> */}
        </nav>
        <div className="navbar-user">
            <Link to="/login">
                {loginStatus?
                <img src={UserIconLogout} alt="user icon" className="navbar-user-icon-logout"/>:
                <img src={UserIconLogin} alt="user icon" className="navbar-user-icon-login"/>
                }
            </Link>
        </div>
    </div>
    )
}

export default Navbar
