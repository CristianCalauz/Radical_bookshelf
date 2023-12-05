import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path) => {
    if (path === 'home') {
      return location.pathname === '/' || location.pathname.includes('/bestsellers');
    }
    if (path === 'favorites') {
      return location.pathname.includes('/favorites');
    }
    return location.pathname.includes(path);
  };

  return (
    <aside className="menu">
      <button
        className={`menu-button ${isActive('home') ? 'selected' : ''}`}
        onClick={() => navigate('/')}
      >
        <i className="bi bi-bar-chart-line"></i>
      </button>
      <button
        className={`menu-button ${isActive('favorites') ? 'selected' : ''}`}
        onClick={() => navigate('/favorites')}
      >
        <i className="bi bi-heart"></i>
      </button>
      <button
        className={`menu-button ${isActive('settings') ? 'selected' : ''}`}
        onClick={() => navigate('/settings')}
      >
        <i className="bi bi-gear"></i>
      </button>
    </aside>
  );
};

export default Menu;
