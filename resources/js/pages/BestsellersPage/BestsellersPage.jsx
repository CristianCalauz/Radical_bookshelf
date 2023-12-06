import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UniversalTable from '../../components/UniversalTable/UniversalTable';
import SearchBar from '../../components/SearchBar/SearchBar';
import './BestsellersPage.css';

const BestsellersPage = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);

    useEffect(() => {
        axios.get('/api/nyt-bestsellers')
            .then(response => {
                const booksWithRatingsAndFavoriteStatus = response.data.results.books.map(book => ({
                    ...book,
                    rating: book.customRating || book.rating || 0,
                    hasCustomRating: !!book.customRating
                }));
                setBooks(booksWithRatingsAndFavoriteStatus);
                setFilteredBooks(booksWithRatingsAndFavoriteStatus);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);    

    const updateBookRating = (isbn, newRating) => {
        const updatedBooks = books.map(book => {
            if (book.primary_isbn13 === isbn) {
                return { ...book, rating: newRating };
            }
            return book;
        });
        setBooks(updatedBooks);
        setFilteredBooks(updatedBooks);
    };

    const handleSearch = (query) => {
        const lowercasedQuery = query.toLowerCase();
        const filteredData = books.filter(book =>
            book.title.toLowerCase().includes(lowercasedQuery) ||
            book.author.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredBooks(filteredData);
    };

    const handleToggleFavorite = (book) => {
        axios.post('/api/toggle-favorite', {
            isbn: book.primary_isbn13,
            title: book.title,
            author: book.author
        })
        .then(response => {
            const updatedBooks = books.map(b => {
                if (b.primary_isbn13 === book.primary_isbn13) {
                    return { ...b, isFavorited: !b.isFavorited };
                }
                return b;
            });
            setBooks(updatedBooks);
            setFilteredBooks(updatedBooks);
        })
        .catch(error => console.error('Error toggling favorite:', error));
    };
    
    
    return (
        <div className="page-content">
            <h1 className="page-title">New York Times Bestsellers</h1>
            <SearchBar onSearch={handleSearch} />
            <UniversalTable 
                data={filteredBooks} 
                updateBookRating={updateBookRating} 
                handleToggleFavorite={handleToggleFavorite} 
                isISBN={true} 
            />
            </div>
    );
};

export default BestsellersPage;
