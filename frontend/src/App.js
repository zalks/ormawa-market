import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Belanja from "./Pages/Belanja";
import KategoriProduk from "./Pages/KategoriProduk";
import Produk from "./Pages/Produk";
import MasukRegister from "./Pages/MasukRegister";
import Keranjang from "./Pages/Keranjang";
import Footer from "./Components/Footer/Footer";
import pakaian_banner from "./Components/Assets/banner.png";
import lainnya_banner from "./Components/Assets/banner.png";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Belanja />} />
          <Route
            path="/pakaian"
            element={
              <KategoriProduk banner={pakaian_banner} category="pakaian" />
            }
          />
          <Route
            path="/lainnya"
            element={
              <KategoriProduk banner={lainnya_banner} category="lainnya" />
            }
          />
          <Route path="/produk" element={<Produk />}>
            <Route path=":productId" element={<Produk />} />
          </Route>
          <Route path="/keranjang" element={<Keranjang />} />
          <Route path="/login" element={<MasukRegister />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
