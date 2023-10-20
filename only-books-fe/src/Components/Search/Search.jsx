/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './Search.css';
import data from '../LibrosPaginados/libros'

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const renderCategoryOptions = () => {
        const categories = ['all', 'Novela', 'Novelas Gráficas', 'Magazines', 'Infantiles'];
        return categories.map((category, index) => (
            <option key={index} value={category}>
                {category}
            </option>
        ));
    };

    const renderProductRecommendations = () => {

        const products = Object.values(data);
        // console.log(products[1].title);
        // console.log(products[1].gender)
        // console.log(products)

        // const filteredProducts = products.filter((product) =>
        //     selectedCategory === 'all' ? true : product.category === selectedCategory

        // );
        const filteredProducts = products.filter((product) => {
            const selectedCategoryUpper = selectedCategory.toUpperCase();
            if (selectedCategoryUpper === 'ALL') {
                return true;
            } else if (selectedCategoryUpper === 'NOVELA') {
                return product.gender === selectedCategoryUpper;

            } else {
                return product.category === selectedCategoryUpper;
            }
        });

        const firstThreeProducts = filteredProducts.slice(0, 3);

        return firstThreeProducts.map((product, index) => (
            <div key={index} className="product" >
                <img style={{
                    width: "60px",
                    margin: "2px"
                }} src={product.imgUrl} alt="" />
                {console.log(products)}
            </div>

        ));
    };

    return (
        <div className="search-container">
            <div className='input-select'>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <select value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="category-select">
                    {renderCategoryOptions()}
                </select>
            </div>

            <div className='product-recommendations'>
                {renderProductRecommendations()}
            </div>
        </div>
    );
};

export default Search;