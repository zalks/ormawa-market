import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import add_product_icon from "../../assets/cart_icon.png";
import list_product_icon from "../../assets/bag_icon.png";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={add_product_icon} className="add_product_icon" />
          <p>Tambah Produk</p>
        </div>
      </Link>
      <Link to={"/listproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={list_product_icon} className="list_product_icon" />
          <p>Daftar Produk</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
