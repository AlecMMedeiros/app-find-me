import React from 'react';
import IProduct from "../interfaces/IProduct";
interface ProductCardProps {
    product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div>
            <img src={product.photo} alt={product.description} />
            <p>{product.description}</p>
            <p>Categoria: {product.category}</p>
            <p>Preço: {product.price}</p>
            <p>Website: {product.website}</p>
        </div>
    );
};

export default ProductCard;
