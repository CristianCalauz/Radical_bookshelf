import React from 'react';
import { useNavigate } from 'react-router-dom';

import SearchBar from '../../components/SearchBar/SearchBar';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();
    const bestsellers = [
        'https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip',
        'https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip',
        'https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip'
    ];

    const favourites = [
        'https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip',
        'https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip',
        'https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip'
    ];

    return (
        <div className="homepage">
            <div className="search-container">
                <SearchBar /> 
            </div>
            <h2 className="category-title" onClick={() => navigate('/bestsellers')}>
                New York Times Bestsellers
            </h2>
            <div className="book-list">
                {bestsellers.map((cover, index) => (
                    <img key={index} src={cover} alt={`Bestseller ${index + 1}`} />
                ))}
            </div>
            <h2 className="category-title" onClick={() => navigate('/favorites')}>
                Favourites
            </h2>
            <div className="book-list">
                {favourites.map((cover, index) => (
                    <img key={index} src={cover} alt={`Favorite ${index + 1}`} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
