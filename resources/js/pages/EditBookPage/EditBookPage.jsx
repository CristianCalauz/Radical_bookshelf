import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditBookPage.css';
import { BsArrowLeft } from 'react-icons/bs'; 

const EditBookPage = () => {
    const { bookId } = useParams(); 
    const navigate = useNavigate(); 
    const [bookDetails, setBookDetails] = useState({
        title: '',
        author: '',
        cost: '', 
        rating: 0,
    });

    useEffect(() => {
        axios.get(`/api/books/${bookId}`)
            .then(response => {
                setBookDetails({
                    ...bookDetails,
                    title: response.data.title,
                    author: response.data.author,
                    cost: response.data.cost, 
                    rating: response.data.rating, 
                });
            })
            .catch(error => {
                console.error('Error fetching book details:', error);
            });
    }, [bookId]); 
    const handleUpdate = () => {
        axios.put(`/api/books/${bookId}`, bookDetails)
            .then(response => {
                navigate('/favorites'); 
            })
            .catch(error => {
                console.error('Error updating book:', error);
            });
    };

    return (
        <div className="edit-book-page">
            <div className="book-banner" style={{ backgroundImage: `url(${bookDetails.cover_image || 'https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip'})` }}>
                <h1>{bookDetails.title} by {bookDetails.author}</h1>
            </div>
            <div className="edit-form">
                <label>
                    Cost
                    <input
                        type="text"
                        value={bookDetails.cost || ''}
                        onChange={e => setBookDetails({ ...bookDetails, cost: e.target.value })}
                    />
                </label>
                <label>
                    Rating
                    <input
                        type="number"
                        value={bookDetails.rating || 0}
                        onChange={e => setBookDetails({ ...bookDetails, rating: Number(e.target.value) })}
                    />
                </label>
                <button className="update-button" onClick={handleUpdate}>Update</button>
                <span className="return-to-favorites" onClick={() => navigate('/favorites')}>
                    <BsArrowLeft /> Return to Favorites
                </span>
            </div>
        </div>
    );
};

export default EditBookPage;
