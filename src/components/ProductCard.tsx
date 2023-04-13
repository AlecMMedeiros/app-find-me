import React from 'react';
import IProduct from "../interfaces/IProduct";
interface ProductCardProps {
    product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className='cardClass'>
            <img
                className=''
                src={product.photo}
                alt={product.description} />
            <p className='text-base text-sm text-center m-1'>{product.description}</p>
            <p>Categoria2: {product.photo.includes("gif") ? "sim" : "não"}</p>
            <p>Categoria: {product.category}</p>
            <p>Preço: {product.price}</p>
            <a href={product.address} target='_blank' rel='noreferrer'>
                <button>Ir para o produto</button>
            </a>
            <p>Website: {product.website}</p>
        </div>
    );
};

export default ProductCard;
