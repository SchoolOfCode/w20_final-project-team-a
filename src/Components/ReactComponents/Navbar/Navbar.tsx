import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import UserIconLogin from "../../VisualAssets/SVGIcons/PNG/user_login.png";
import UserIconDashboard from "../../VisualAssets/SVGIcons/PNG/user_dashboard.png"
import UserIconLogout from "../../VisualAssets/SVGIcons/logout.svg";
import axios from "axios";
import { API_URL } from "../../../config";
import "./Navbar.scss";
import { NavbarLink } from "./NavbarLink";
import Logo from "./Logo";

type NavbarProps = {
  loginStatus: boolean;
};

type PageParams = {
  page: string;
};

const Navbar: React.FC<NavbarProps> = ({ loginStatus}) => {
  const page = useParams<PageParams>().page || "home";
  const history = useHistory();
  
  const handleLogout = () => {
    axios.get(API_URL + "users/logout",{
      withCredentials: true}
    ).then(()=>{
      history.push("/login");
    })
  };

  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <Logo />
      </div>
      <nav className="navbar-links">
        <div className="navbar-item">
          <NavbarLink page="featured" selected={page === "featured"} />
        </div>
        <div className="navbar-item">
          <NavbarLink page="showcase" selected={page === "showcase"} />
        </div>
        <div className="navbar-item">
          <NavbarLink page="bootcampers" selected={page === "bootcampers"} />
        </div>
        {loginStatus && (
            <div className="navbar-item">
              <NavbarLink page="submit" selected={page === "submit"} />
            </div>
        )}
      </nav>
      {loginStatus && (
          <div className="navbar-dashboard">
              <Link to="/dashboard">
                <img
                  src={UserIconDashboard}
                  alt="user icon"
                  className="navbar-user-icon-dashboard"
                />
              </Link>
              {/* <span className="navbar-dashboard-tooltip">User Dashboard</span> */}
            </div>
        )}
      <div className="navbar-user">
          {loginStatus ? (
              <img
                src={UserIconLogout}
                alt="user icon"
                className="navbar-user-icon-logout"
                onClick={handleLogout}
              />
          ) : (
            <Link to="/login">
            <img
              src={UserIconLogin}
              alt="user icon"
              className="navbar-user-icon-login"
            />
          </Link>
          )}
          {/* <span className="navbar-dashboard-login">{loginStatus?"Logout":"Login"}</span> */}
      </div>
    </div>
  );
};

export default Navbar;
