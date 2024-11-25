import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import profile from "../../assets/profile-icon.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="" className="nav-logo" />
      <img src={profile} alt="" className="nav-profile" />
    </div>
  );
};

export default Navbar;
