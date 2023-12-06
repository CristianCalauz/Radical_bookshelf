import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UniversalTable from '../../components/UniversalTable/UniversalTable';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';
import './FavoritesPage.css'

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [filteredFavorites, setFilteredFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/favorites')
            .then(response => {
                const favoriteBooks = response.data.map(book => ({
                    ...book,
                    isFavorited: true,
                    rating: book.customRating || book.averageRating || 0,
                    hasCustomRating: true
                }));
                setFavorites(favoriteBooks);
                setFilteredFavorites(favoriteBooks);
            })
            .catch(error => {
                console.error('Error fetching favorites:', error);
            });
    }, []);

    const updateBookRating = (bookId, newRating) => {
        const updatedFavorites = favorites.map(book => {
            if (book.id === bookId) {
                return { ...book, rating: newRating };
            }
            return book;
        });
        setFavorites(updatedFavorites);
        setFilteredFavorites(updatedFavorites);
    };

    const handleSearch = (query) => {
        const lowercasedQuery = query.toLowerCase();
        const filteredData = favorites.filter(book =>
            book.title.toLowerCase().includes(lowercasedQuery) ||
            book.author.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredFavorites(filteredData);
    };

    const handleToggleFavorite = (book) => {
        axios.post('/api/toggle-favorite', { book_id: book.id })
        .then(response => {
            // Update the state to reflect the change
            const updatedFavorites = favorites.map(b => {
                if (b.id === book.id) {
                    return { ...b, isFavorited: !b.isFavorited };
                }
                return b;
            });
            setFavorites(updatedFavorites);
            setFilteredFavorites(updatedFavorites);
        })
        .catch(error => console.error('Error toggling favorite:', error));
    };
    
    const handleEdit = (book) => {
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
            <h1 className="page-title">My Favorites</h1>
            <SearchBar onSearch={handleSearch} />
            <UniversalTable 
                data={filteredFavorites} 
                updateBookRating={updateBookRating} 
                handleToggleFavorite={handleToggleFavorite} 
                isISBN={false} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
                showEditDelete={true} 
            />
        </div>
    );
};

export default FavoritesPage;
