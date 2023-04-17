import React, { useState } from 'react';
import IHeaderProps from "../interfaces/IHeaderProps";


const Header: React.FC<IHeaderProps> = ({ headerState, onHeaderStateChange }) => {
    const [category, setCategory] = useState<string>(headerState.category);
    const [website, setWebsite] = useState<string>(headerState.website);
    const [searchTerm, setSearchTerm] = useState<string>(headerState.searchTerm);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newHeaderState = { category: event.target.value, website, searchTerm };
        setCategory(event.target.value);
        onHeaderStateChange(newHeaderState);
    };

    const handleWebsiteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newHeaderState = { category, website: event.target.value, searchTerm };
        setWebsite(event.target.value);
        onHeaderStateChange(newHeaderState);
    };

    const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newHeaderState = { category, website, searchTerm };
        onHeaderStateChange(newHeaderState);
    };

    return (
        <header className= 'bg-amber-300 h-28 flex justify-center items-center'>
            <form className="flex justify-center space-x-0.5" onSubmit={handleSearchSubmit}>
                <select
                    value={category}
                    onChange={handleCategoryChange}
                    className='block appearance-none w-80 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                >
                    <option value="Celulares">Celulares</option>
                    <option value="Geladeiras">Geladeiras</option>
                    <option value="TV">TV</option>
                </select>
                <select
                    value={website}
                    onChange={handleWebsiteChange}
                    className='block appearance-none w-80 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                >
                    <option value="Mercado Livre">Mercado Livre</option>
                    <option value="Buscape">Buscapé</option>
                </select>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    placeholder="Buscar item"
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
                <button className= 'bg-amber-100 hover:bg-amber-400 text-black font-bold py-2 px-4 rounded' type="submit">Search</button>
            </form>
        </header>

    );
};

export default Header;
