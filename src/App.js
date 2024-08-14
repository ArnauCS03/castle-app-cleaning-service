import React from 'react';  
import './App.css';
import Header from './Header';
import Login from './Login';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <Login />
      </div>
      {/* Other components or content */}
    </div>

  );
}

export default App;
