import React from "react";
import './Breadcrumbs.css';
import arrow_icon from '../Assets/arrow_icon.png'

const Breadcrumbs = (props) => {
        const {produk} = props;
    return(
        <div className='breadcrumbs'>
            HOME <img src={arrow_icon} alt="" /> BELANJA <img src={arrow_icon} alt="" /> {produk.category} <img src={arrow_icon} alt="" /> {produk.name}
        </div>
    )
}

export default Breadcrumbs;