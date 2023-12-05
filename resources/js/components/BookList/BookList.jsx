import React from 'react';
import './BookList.css'; // Style your book list as needed

const BookList = ({ books }) => {
    return (
        <div className="book-list">
            {books.map(book => (
                <div key={book.id} className="book-item">
                    <img src={book.cover} alt={book.title} />
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                    {/* Add more book details here */}
                </div>
            ))}
        </div>
    );
};

export default BookList;
