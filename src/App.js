import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import Login from './Login';
import MainApp from './MainApp'; // Ensure this component exists

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
      <Header />
      <div className="main-content">
        {isAuthenticated ? (
          <MainApp /> // MainApp will handle camera capture and photo display
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
}

export default App;
