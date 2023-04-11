import React, { useState } from 'react';
import Categories from "../services/Categories";
import CurrencyFormat from "../services/CurrencyFormat";
import ConnectApiServices from "../services/ConnectApiServices";
import ProductCard from "../components/ProductCard";
import IProduct from "../interfaces/IProduct";


const ProductSearchEngine: React.FC = () => {
  const [category, setCategory] = useState<string>('Celulares');
  const [website, setWebsite] = useState<string>('Mercado Livre');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [products, setProducts] = useState<IProduct[]>([]);

  const getStoredProducts = (category: string, website: string, searchTerm: string) => {
    const storedProducts = localStorage.getItem(`${category}_${website}_${searchTerm}`);
    if (storedProducts) {
      return JSON.parse(storedProducts);
    }
    return null;
  };

  const storeProducts = (category: string, website: string, searchTerm: string, products: IProduct[]) => {
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
    const getCategory = new Categories(website);
    const formatCurrency = new CurrencyFormat("BRL", "pt-BR")
    const getFromAPI = new ConnectApiServices(website, getCategory.getCategory(category)!, searchTerm);
    const response =  await getFromAPI.getFromApi();
    let productsFromAPI: IProduct[] = [];

    const storedProducts = getStoredProducts(category, website, searchTerm);
    if (storedProducts) {
      setProducts(storedProducts);
      return;
    }

    if (website === 'Mercado Livre') {
      productsFromAPI = response.data.results.map((result: { thumbnail: string; title: string; price: string; category: string}) => ({
        photo: result.thumbnail,
        description: result.title,
        category: getCategory.categoryName,
        price: formatCurrency.formatCurrency(parseInt(result.price)),
        website: 'Mercado Livre',
      }
      ));

    } else if (website === 'Buscape') {
      productsFromAPI = response.data;
      productsFromAPI.map((element) => {
        return element.category = getCategory.categoryName;
      })
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
          <option value="Buscape">Buscapé</option>
        </select>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <button type="submit">Search</button>
      </form>
        <ul style={{listStyle:"none"}}>
          {products.map((product, index) => (
              <li key={index}>
                <ProductCard product={product} />
              </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductSearchEngine;
