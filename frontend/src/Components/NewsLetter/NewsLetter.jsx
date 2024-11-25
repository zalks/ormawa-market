import React from "react";
import "./NewsLetter.css";

const NewsLetter = () => {
  return (
    <div className="newsletter">
      <h1>Dapatkan Penawaran Eksklusif Melalui Email Anda</h1>
      <p>Berlangganan newsletter kami untuk mendapatkan info terbaru</p>
      <div>
        {/* <input type="email" placeholder="Masukkan Alamat Email" /> */}
        <button>Berlangganan</button>
      </div>
    </div>
  );
};

export default NewsLetter;
