import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import BestsellersPage from './pages/BestsellersPage/BestsellersPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import EditBookPage from './pages/EditBookPage/EditBookPage';


const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/bestsellers" element={<BestsellersPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/favorites/edit/:bookId" element={<EditBookPage />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;

