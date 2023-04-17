import React from 'react';
import IProduct from "../interfaces/IProduct";
interface ProductCardProps {
    product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className='cardClass'>
            <img
                className='w-40'
                src={product.photo}
                alt={product.description} />
            <p className='text-base text-sm text-center m-1'>{product.description}</p>
            <p>Categoria: {product.category}</p>
            <p>Preço: {product.price}</p>
            {
                product.website === "Mercado livre" ?
                    <a href={product.address} target='_blank' rel='noreferrer'>
                        <button className='bg-amber-300 hover:bg-amber-400  text-white font-bold py-2 px-4 rounded'>Ir para o produto</button>
                    </a>
                    :
                    <a href={`https://www.buscape.com.br${product.address}`} target='_blank' rel='noreferrer'>
                        <button className='bg-amber-300 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded'>Ir para o produto</button>
                    </a>

            }

            <p>Website: {product.website}</p>
        </div>
    );
};

export default ProductCard;
