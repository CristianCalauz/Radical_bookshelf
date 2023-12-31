import React from 'react';
import './UniversalTable.css';
import axios from 'axios';

const UniversalTable = ({ data, onFavoriteToggle, onEdit, onDelete, showEditDelete }) => {
    const renderStars = (rating, book) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <i key={i}
                   className={`bi ${i <= rating ? 'bi-star-fill' : 'bi-star'}`}
                   style={{ color: i <= rating ? 'gold' : 'gray' }}
                   onClick={() => handleRatingSubmit(book, i)}
                ></i>
            );
        }
        return stars;
    };

    const handleRatingSubmit = (book, rating) => {
        const requestData = {
            rating: rating,
            title: book.title,
            author: book.author
        };

        axios.post(`/api/books/${book.primary_isbn13}/ratings`, requestData)
            .then(response => {
                if(onFavoriteToggle) {
                    onFavoriteToggle(book.id);
                }
            })
            .catch(error => {
                console.error('Error submitting rating:', error);
            });
    };

    const handleFavorite = (book) => {
        axios.post('/api/favorite', {
            external_id: book.primary_isbn13,
            source: 'Google Books',
            title: book.title,
            author: book.author,
            cover_image: book.imageLinks ? book.imageLinks.thumbnail : 'default' 
        })
            .then(response => {
                if(onFavoriteToggle) {
                    onFavoriteToggle(book.id);
                }
            })
            .catch(error => {
                console.error('Error toggling favorite:', error);
            });
    };

    return (
        <div className="table-container">
            <table className="universal-table">
                <tbody>
                    {data.map((book, index) => (
                        <tr key={index}>
                            <td className="title-author">
                                <span className="book-title">{book.title}</span>
                                {' by '}
                                <span className="book-author">{book.author}</span>
                            </td>
                            <td>
                                <div className="star-rating">
                                    {renderStars(book.rating, book)}
                                </div>
                            </td>
                            {showEditDelete && (
                                <>
                                    <td className="edit-action">
                                        <span style={{ color: '#757575', cursor: 'pointer' }}
                                              onClick={() => onEdit(book)}>
                                            Edit
                                        </span>
                                    </td>
                                    <td className="delete-action">
                                        <span style={{ color: '#757575', cursor: 'pointer' }}
                                              onClick={() => onDelete(book)}>
                                            Delete
                                        </span>
                                    </td>
                                </>
                            )}
                            <td>
                                <span className="favorite-icon" onClick={() => handleFavorite(book)}>
                                    <i className={`bi ${book.isFavorited ? 'bi-heart-fill' : 'bi-heart'}`}
                                       style={{ color: book.isFavorited ? '#757575' : 'lightgrey', cursor: 'pointer' }}>
                                    </i>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UniversalTable;
