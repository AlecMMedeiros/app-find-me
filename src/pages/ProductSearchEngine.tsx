import React, { useState, useEffect } from 'react';
import Categories from "../services/Categories";
import CurrencyFormat from "../services/CurrencyFormat";
import ConnectApiServices from "../services/ConnectApiServices";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import IProduct from "../interfaces/IProduct";

interface IHeaderState {
  category: string;
  website: string;
  searchTerm: string;
}

const ProductSearchEngine: React.FC = () => {
  const [headerState, setHeaderState] = useState<IHeaderState>({
    category: 'Celulares',
    website: 'Mercado Livre',
    searchTerm: ''
  });

  const [products, setProducts] = useState<IProduct[]>([]);

  const getStoredProducts = (category: string, website: string, searchTerm: string) => {
    const storedProducts = sessionStorage.getItem(`${category}_${website}_${searchTerm}`);
    if (storedProducts) {
      return JSON.parse(storedProducts);
    }
    return null;
  };

  const storeProducts = (category: string, website: string, searchTerm: string, products: IProduct[]) => {
    sessionStorage.setItem(`${category}_${website}_${searchTerm}`, JSON.stringify(products));
  };

  useEffect(() => {
    const { category, website, searchTerm } = headerState;
    const storedProducts = getStoredProducts(category, website, searchTerm);
    if (storedProducts) {
      setProducts(storedProducts);
      return;
    }

    const getCategory = new Categories(website);
    const formatCurrency = new CurrencyFormat("BRL", "pt-BR")
    const getFromAPI = new ConnectApiServices(website, getCategory.getCategory(category)!, searchTerm);
    getFromAPI.getFromApi().then(response => {
      let productsFromAPI: IProduct[] = [];
      if (website === 'Mercado Livre') {
        productsFromAPI = response.data.results.map((result: { thumbnail: string; title: string; price: string; category: string, permalink: string}) => ({
              photo: result.thumbnail,
              description: result.title,
              category: getCategory.categoryName,
              price: formatCurrency.formatCurrency(parseInt(result.price)),
              address: result.permalink,
              website: 'Mercado Livre',
            }
        ));
      } else if (website === 'Buscape') {
        productsFromAPI = response.data;

        productsFromAPI.map((element) => {
          if (element.photo.includes("gif")){
            element.photo.replace("gif", "png")
          }
          return element.category = getCategory.categoryName;
        })

      }
      storeProducts(category, website, searchTerm, productsFromAPI);
      setProducts(productsFromAPI);
    }).catch(error => {
      console.error(error);
      setProducts([]);
    });
  }, [headerState]);

  const handleHeaderStateChange = (newHeaderState: IHeaderState) => {
    setHeaderState(newHeaderState);
  };

  return (
      <div>
        <Header headerState={headerState} onHeaderStateChange={handleHeaderStateChange} />
        <section className='grid grid-cols-2 grid-flow-row-dense md:grid-cols-4 h-auto justify-items-center mx-4 mt-5 shadow-2xl rounded-md bg-amber-300'>
          {products.map((product, index) => (
              <div key={index}>
                <ProductCard product={product} />
              </div>
          ))}
        </section>
      </div>
  );
};

export default ProductSearchEngine;
