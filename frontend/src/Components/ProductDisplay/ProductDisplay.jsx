import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/stardull_icon.png";
import { BelanjaContext } from "../../Context/BelanjaContext";

const ProductDisplay = (props) => {
  const { produk } = props;
  const { addToCart } = useContext(BelanjaContext);
  return (
    <div className="productDisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={produk.image} alt="" />
          <img src={produk.image} alt="" />
          <img src={produk.image} alt="" />
          <img src={produk.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={produk.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{produk.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-place-old">
            Rp {produk.old_price}
          </div>
          <div className="productdisplay-right-place-new">
            Rp {produk.new_price}
          </div>
        </div>
        {/* <div className="productdisplay-right-size">
                    <h1>Pilih Ukuran</h1>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div> */}
        <button
          onClick={() => {
            addToCart(produk.id);
          }}
        >
          TAMBAH KE KERANJANG
        </button>
      </div>
    </div>
  );
};

export default ProductDisplay;
