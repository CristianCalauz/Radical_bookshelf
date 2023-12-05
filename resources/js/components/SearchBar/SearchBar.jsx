import React from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    return (
        <div className="content-container">
            <div className="search-container">
                <div className="search-icon-container">
                    <i className="bi bi-search"></i>
                </div>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search"
                    onChange={(e) => onSearch(e.target.value)}
                />
                <button className="search-button">GO</button>
            </div>
        </div>
    );
};

export default SearchBar;
