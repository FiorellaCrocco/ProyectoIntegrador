/* eslint-disable no-unused-vars */
import React, { useState , useContext } from 'react';
import './Search.css';
//import data from '../LibrosPaginados/libros'
import { GlobalContext } from "../../Context/globalContext";
import LibrosPaginados from '../LibrosPaginados/LibrosPaginados';

const Search = () => {
    const { listaLibros, isLoading } = useContext(GlobalContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filteredProducts, setFilteredProducts] = useState(null)

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const renderCategoryOptions = () => {
        const categories = ['all', 'Novelas', 'No_Ficcion', 'Ficcion', 'Infantil'];
        return categories.map((category, index) => (
            <option key={index} value={category}>
                {category}
            </option>
        ));
    };

    const renderProductRecommendations = () => {

        const products = Object.values(listaLibros);
        // console.log(products[1].title);
        // console.log(products[1].gender)
        // console.log(products)

        const filProducts = products.filter((product) =>
            selectedCategory === 'all' ? true : product.category === selectedCategory
        );
        const libros = products.filter((product) => {
            const selectedCategoryUpper = selectedCategory.toUpperCase();
            if (selectedCategoryUpper === 'ALL') {
                return true;
            } else if (selectedCategoryUpper === product.gender) {
                return true;
            }else{
                return false
            }
        });
        //setFilteredProducts(libros)

        //const firstThreeProducts = filteredProducts.slice(0, 3);
        /*
        return firstThreeProducts.map((product, index) => (
            <div key={index} className="product" >
                <img style={{
                    width: "60px",
                    margin: "2px"
                }} src={product.imgUrl} alt="" />
                {console.log(products)}
            </div>
    
        ));*/
        console.log(libros)
        return libros;
    }
    return (
        <>
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
                {/* <div className='product-recommendations'>
                    {renderProductRecommendations()}
                </div> */}
            </div>
            <div>
                {<LibrosPaginados libros={renderProductRecommendations()}></LibrosPaginados>
                }
            </div>

        </>
    );
}
export default Search;