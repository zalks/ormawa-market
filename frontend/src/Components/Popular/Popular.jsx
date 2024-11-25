import React, { useState, useEffect } from "react";
import "./Popular.css";
// import data_product from '../Assets/data';
import Item from "../Items/Item";

const Popular = () => {
  const [popular_products, setPopular_products] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/popular")
      .then((response) => response.json())
      .then((data) => setPopular_products(data));
  }, []);

  return (
    <div className="popular">
      <h1>POPULER</h1>
      <hr />
      <div className="popular-item">
        {popular_products.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
