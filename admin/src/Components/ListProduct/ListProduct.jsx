import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import remove_icon from "../../assets/remove_icon.png";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const fetchInfo = async () => {
    await fetch("http://localhost:4000/getallproduct")
      .then((resp) => resp.json())
      .then((data) => {
        setAllProducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    await fetch("http://localhost:4000/removeproducts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
    // .then((resp) => resp.json())
    // .then((data) => {
    //   setAllProducts(data);
    // });
  };

  return (
    <div className="list-product">
      <h1>Daftar Semua Produk</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Nama Product</p>
        <p>Harga Awal</p>
        <p>Harga Promo</p>
        <p>Kategori</p>
        <p>Hapus</p>
      </div>
      <div className="listproduct-allproduct">
        <hr />
        {allproducts.map((product, index) => {
          return (
            <>
              <div
                key={index}
                className="listproduct-format-main listproduct-format"
              >
                <img src={product.image} className="listproduct-product-icon" />
                <p>{product.name}</p>
                <p>Rp {product.old_price}</p>
                <p>Rp {product.new_price}</p>
                <p>{product.category}</p>
                <img
                  onClick={() => {
                    remove_product(product.id);
                  }}
                  src={remove_icon}
                  className="listproduct-remove-icon"
                />
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
