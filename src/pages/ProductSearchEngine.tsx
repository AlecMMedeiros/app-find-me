import React, { useState } from 'react';
import axios from 'axios';
import Categories from "../services/Categories";
import CurrencyFormat from "../services/CurrencyFormat";

interface Product {
  photo: string;
  description: string;
  category: string;
  price: number;
  website: string;
}

const ProductSearchEngine: React.FC = () => {
  const [category, setCategory] = useState<string>('Celulares');
  const [website, setWebsite] = useState<string>('Mercado Livre');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);

  const getStoredProducts = (category: string, website: string, searchTerm: string) => {
    const storedProducts = localStorage.getItem(`${category}_${website}_${searchTerm}`);
    if (storedProducts) {
      return JSON.parse(storedProducts);
    }
    return null;
  };

  const storeProducts = (category: string, website: string, searchTerm: string, products: Product[]) => {
    localStorage.setItem(`${category}_${website}_${searchTerm}`, JSON.stringify(products));
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const handleWebsiteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setWebsite(event.target.value);
  };

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let productsFromAPI: Product[] = [];

    const storedProducts = getStoredProducts(category, website, searchTerm);
    if (storedProducts) {
      console.log(storedProducts.key);
      setProducts(storedProducts);
      return;
    }

    if (website === 'Mercado Livre') {
      const getCategory = new Categories(website);
      const formatCurrency = new CurrencyFormat("BRL", "pt-BR")
      const response = await axios.get(
        `https://api.mercadolibre.com/sites/MLB/search?category=${getCategory.setCategory(category)}&q=${searchTerm}`
      );
      console.log(formatCurrency.formatCurrency("120"))
      productsFromAPI = response.data.results.map((result: { thumbnail: string; title: string; price: string; category: string}) => ({
        photo: result.thumbnail,
        description: result.title,
        category: getCategory.categoryName,
        price: formatCurrency.formatCurrency(result.price),
        website: 'Mercado Livre',
      }
      ));

    } else if (website === 'Buscapé') {
      // WIP : API facing problems, Looking for a solution.

    }
    storeProducts(category, website, searchTerm, productsFromAPI);
    setProducts(productsFromAPI);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>        
        <select value={category} onChange={handleCategoryChange}>
          <option value="Celulares">Celulares</option>
          <option value="Geladeiras">Geladeiras</option>
          <option value="TV">TV</option>
        </select>
        <select value={website} onChange={handleWebsiteChange}>
          <option value="Mercado Livre">Mercado Livre</option>
          <option value="Buscapé">Buscapé</option>
        </select>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <button type="submit">Search</button>
      </form>
      <ul>        
        {products.map((product, index) => (
          <li key={index}>
            <img src={product.photo} alt={product.description} />
            <p>{product.description}</p>
            <p>Categoria: {product.category}</p>
            <p>Preço: {product.price}</p>
            <p>Website: {product.website}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductSearchEngine;