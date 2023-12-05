import React from 'react';
import './Favourites.css'; // Style your favourites list as needed

const Favourites = ({ books, onRemoveFavourite }) => {
    return (
        <div className="favourites">
            {books.map(book => (
                <div key={book.id} className="favourite-item">
                    <img src={book.cover} alt={book.title} className="favourite-cover" />
                    <div className="favourite-details">
                        <h3>{book.title}</h3>
                        <p>{book.author}</p>
                        {/* You can add a rating component here if you like */}
                        <button onClick={() => onRemoveFavourite(book.id)}>Remove</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Favourites;
