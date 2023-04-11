import React from 'react';

interface Product {
    photo: string;
    description: string;
    category: string;
    price: number;
    website: string;
}

interface ProductCardProps {
    product: Product;
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
