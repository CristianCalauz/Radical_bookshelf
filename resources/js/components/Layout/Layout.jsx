import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import axios from 'axios';
import './Layout.css';

const Layout = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(1);

  useEffect(() => {
    axios.get('/api/current-user')
      .then(response => {
        setCurrentUser(response.data);
      })
      .catch(error => console.error('Error fetching current user', error));
  }, []);

  const switchUser = () => {
    const newUserId = currentUser.id === 1 ? 2 : 1;
    axios.get(`/api/switch-user/${newUserId}`)
      .then(() => {
        setCurrentUser(prevUser => prevUser.id === 1 ? 2 : 1);
        window.location.reload();
      })
      .catch(error => console.error('Error switching user:', error));
  };
  

  return (
    <div className="layout">
      <Header userProfilePic={currentUser ? currentUser.profile_picture : null} switchUser={switchUser} />
      <div className="main-content">
        <Menu />
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
