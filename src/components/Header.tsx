import React, { useState } from 'react';

interface IHeaderProps {
    headerState: {
        category: string;
        website: string;
        searchTerm: string;
    };
    onHeaderStateChange: (newHeaderState: {
        category: string;
        website: string;
        searchTerm: string;
    }) => void;
}

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
        <header >
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
        </header>

    );
};

export default Header;
