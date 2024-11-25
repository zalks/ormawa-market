import React from "react";
import './Footer.css';
import footer_logo from '../Assets/logo.png';
import instagram_icon from '../Assets/instagram_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
import telegram_icon from '../Assets/telegram_icon.png'

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-logo">
                <img src={footer_logo} alt="" />
                <p>Ormawa Market</p>
            </div>
            <ul className="footer-links">
                <li>Produk</li>
                <li>Tentang</li>
                <li>Kontak</li>
            </ul>
            <div className="footer-socials-icon">
                <div className="footer-icons-container">
                    <img src={instagram_icon} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={whatsapp_icon} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={telegram_icon} alt="" />
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @ 2024 - All Right Reserved</p>
            </div>

        </div>
    )
}

export default Footer