import React, { useContext } from "react";
import './CSS/KategoriProduk.css';
import { BelanjaContext } from "../Context/BelanjaContext";
import Item from '../Components/Items/Item';
import dropdown_icon from '../Components/Assets/dropdown.png';



const KategoriProduk = (props) => {
    const {all_product} = useContext(BelanjaContext)
    return (
        <div className='shop-category'>
            <img className='shopcategory-banner'src={props.banner} alt="" />
            <div className="shopcategory-indexSort">
                <p>
                    <span>Menampilkan 1-6</span> dari 36 produk 
                </p>
                <div className="shopcategory-sort">
                Urutkan berdasarkan <img src={dropdown_icon} alt="" />
                </div>
            </div>
            <div className="shopcategory-products">
                {all_product.map((item,i)=>{
                    if(props.category===item.category) {
                        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                    }
                    else{
                        return null;
                    }
                })}
            </div>
            <div className="shopcategory-loadmore">
                Jelajahi Lebih Banyak
            </div>
        </div>
    )
}

export default KategoriProduk