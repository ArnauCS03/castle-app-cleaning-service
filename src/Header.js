import React from 'react';
import './Header.css';
import logo from './images/name.png';

function Header() {
  return (
    <div className="header">
      
      <img src={logo} alt="Logo" className="header-logo" />

      {/* <h1>CASTLE</h1> */}
    
    </div>
  );
}

export default Header;
