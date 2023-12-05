import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UniversalTable from '../../components/UniversalTable/UniversalTable';
import SearchBar from '../../components/SearchBar/SearchBar';
import './BestsellersPage.css';

const BestsellersPage = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('/api/nyt-bestsellers')
            .then(response => {
                console.log(response.data);
                setBooks(response.data.results.books);
                setFilteredBooks(response.data.results.books);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
            });
    }, []);

    const handleSearch = (query) => {
        const lowercasedQuery = query.toLowerCase();
        const filteredData = books.filter(book =>
            book.title.toLowerCase().includes(lowercasedQuery) ||
            book.author.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredBooks(filteredData);
    };

    const onFavoriteToggle = (bookId) => {
        const updatedBooks = books.map(book => {
            if (book.id === bookId) { 
                return { ...book, isFavorited: !book.isFavorited };
            }
            return book;
        });
        setBooks(updatedBooks);
    
        const updatedFilteredBooks = updatedBooks.filter(book =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredBooks(updatedFilteredBooks);
    };
    
    

    const columns = [
        { Header: 'Title', accessor: 'title' },
        { Header: 'Author', accessor: 'author' },
    ];

    return (
        <div className="page-content">
            <h1 className="page-title">New York Times Bestsellers</h1>
            <SearchBar onSearch={handleSearch} />
            <UniversalTable data={filteredBooks} columns={columns} onFavoriteToggle={onFavoriteToggle} />
        </div>
    );
};

export default BestsellersPage;
