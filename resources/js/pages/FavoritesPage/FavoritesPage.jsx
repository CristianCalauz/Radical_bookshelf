import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UniversalTable from '../../components/UniversalTable/UniversalTable';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [filteredFavorites, setFilteredFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/favorites')
            .then(response => {
                const favoriteBooks = response.data.map(fav => ({
                    ...fav.book,
                    isFavorited: true,
                    rating: fav.rating || fav.book.rating
                }));
                setFavorites(favoriteBooks);
                setFilteredFavorites(favoriteBooks);
            })
            .catch(error => {
                console.error('Error fetching favorites:', error);
            });
    }, []);

    const handleSearch = (query) => {
        const lowercasedQuery = query.toLowerCase();
        const filteredData = favorites.filter(book =>
            book.title.toLowerCase().includes(lowercasedQuery) ||
            book.author.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredFavorites(filteredData);
    };

    const handleEdit = (book) => {
        console.log('Editing book', book);
        navigate(`/favorites/edit/${book.id}`);
    };

    const handleDelete = (book) => {
        axios.delete(`/api/favorites/${book.id}`)
            .then(() => {
                setFavorites(favorites.filter(f => f.id !== book.id));
                setFilteredFavorites(filteredFavorites.filter(f => f.id !== book.id));
            })
            .catch(error => {
                console.error('Error deleting favorite book:', error);
            });
    };

    return (
        <div>
            <h1>My Favorites</h1>
            <SearchBar onSearch={handleSearch} />
            <UniversalTable 
                data={filteredFavorites} 
                onEdit={handleEdit}
                onDelete={handleDelete}
                onFavoriteToggle={(id) => {
                    console.log('Favorite toggled', id);
                }}
                showEditDelete={true}
            />
        </div>
    );
};

export default FavoritesPage;
