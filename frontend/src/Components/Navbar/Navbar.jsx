import React, { useContext, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { BelanjaContext } from "../../Context/BelanjaContext";

const Navbar = () => {
  const [menu, setMenu] = useState("belanja");
  const { getTotalCartItems } = useContext(BelanjaContext);

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("belanja");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            Belanja
          </Link>
          {menu === "belanja" ? <h /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("pakaian");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/pakaian">
            Pakaian
          </Link>
          {menu === "pakaian" ? <h /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("lainnya");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/lainnya">
            Lainnya
          </Link>
          {menu === "lainnya" ? <h /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Keluar
          </button>
        ) : (
          <Link to="/login">
            <button>Masuk</button>
          </Link>
        )}
        <Link to="/keranjang">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
