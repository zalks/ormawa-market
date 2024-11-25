import React from "react";
import './Offers.css';
import exclusive_model from '../Assets/exclusive_model.png';
const Offers = () => {
    return (
        <div className='offers'>
            <div className="offers-left">
                <h1>Penawaran Eksklusif</h1>
                <h1>Untuk Anda</h1>
                <p>Khusus Produk Terlaris</p>
                <button>Cek Sekarang</button>
            </div>
            <div className="offers-right">
                <img src={exclusive_model} alt="" />
            </div>
        </div>
    )
}

export default Offers