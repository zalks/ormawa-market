import React, { useContext } from "react";
import './ItemKeranjang.css';
import { BelanjaContext } from "../../Context/BelanjaContext";
import remove_icon from '../Assets/remove_icon.png';

const ItemKeranjang = () => {
    const {getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(BelanjaContext);

    // Calculate subtotal
    const subtotal = all_product.reduce((total, product) => {
        return total + (product.new_price * (cartItems[product.id] || 0));
    }, 0);

    return (
        <div className="cartitems">
            {/* Header */}
            <div className="cartitems-format main">
                <p>Produk</p>
                <p>Judul</p>
                <p>Harga</p>
                <p>Jumlah</p>
                <p>Total</p>
                <p>Hapus</p>
            </div>
            <hr />

            {/* Cart Items */}
            {all_product.map((product) => {
                if (cartItems[product.id] > 0) {
                    return (
                        <div key={product.id}>
                            <div className="cartitems-format">
                                <img 
                                    src={product.image} 
                                    alt={`${product.name} icon`} 
                                    className="carticon-product-icon"
                                />
                                <p>{product.name}</p>
                                <p>Rp {product.new_price}</p>
                                <button className="cartitems-quantity">
                                    {cartItems[product.id]}
                                </button>
                                <p>Rp {product.new_price * cartItems[product.id]}</p>
                                <img 
                                    src={remove_icon} 
                                    onClick={() => removeFromCart(product.id)} 
                                    alt="Remove item" 
                                    className="cartitems-remove-icon"
                                />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}

            {/* Cart Summary */}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Total Keranjang</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>SubTotal</p>
                            <p>Rp {getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Biaya Pengiriman</p>
                            <p>Pengiriman</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>Rp {getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>Proses Untuk Pembayaran</button>
                </div>
            </div>
        </div>
    );
};

export default ItemKeranjang;
