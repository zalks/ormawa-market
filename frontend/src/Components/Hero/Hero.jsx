import React from "react";
import './Hero.css';
import bag_icon from '../Assets/bag_icon.png';
import hero_model from '../Assets/hero.png';

const Hero = () => {
    return (
        <div className='hero'>
            <div className="hero-left">
                <h2>KOLEKSI TERBARU</h2>
                <div>
                    <div className="hero-bag-icon">
                        <p>New</p>
                        <img src={bag_icon} alt="" />
                    </div>
                </div>
                <p>Produk Untuk</p>
                <p>Semua Orang</p>
                <div className="hero-latest-btn">
                    <div>Produk Terbaru</div>
                </div>
            </div>
            <div className="hero right">
                <img src={hero_model} alt="" />
            </div>
        </div>
    )
}

export default Hero