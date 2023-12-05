import React from 'react';
import './Header.css';

const Header = ({ userProfilePic, switchUser }) => {
  return (
    <header className="header">
      <div className="profile-container" onClick={switchUser}>
        <img src={userProfilePic} alt="User Profile" className="user-profile" />
      </div>
      <h1 className="logo">
        <span className="rad">RAD</span><span className="ical">ICAL</span>
      </h1>
    </header>
  );
};

export default Header;
