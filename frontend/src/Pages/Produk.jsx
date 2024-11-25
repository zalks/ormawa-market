import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { BelanjaContext } from '../Context/BelanjaContext';
import Breadcrumbs from "../Components/Breadcrumbs/Breadcrumbs";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProduct from "../Components/RelatedProduct/RelatedProduct";


const Produk = () => {
    const{all_product}=useContext(BelanjaContext);
    const{productId} = useParams();
    const produk = all_product.find((e) => e.id === Number(productId));

    return (
        <div>
            <Breadcrumbs produk={produk}/>
            <ProductDisplay produk={produk}/>
            <DescriptionBox/>
            <RelatedProduct/>
        </div>
    )
}

export default Produk