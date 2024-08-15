import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import Login from './Login';
import MainApp from './MainApp'; // Ensure this component exists
import CameraCapture from './camera/CameraCapture'; // Import CameraCapture

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleCapture = (photo) => {
    setCapturedPhoto(photo);
    setShowCamera(false); // Hide camera after capturing
  };

  // Function to show the camera
  const handleShowCamera = () => {
    setShowCamera(true);
  };

  return (
    <div className="App">
      <Header />
      <div className="main-content">
        {isAuthenticated ? (
          showCamera ? (
            <CameraCapture onCapture={handleCapture} />
          ) : (
            <MainApp />
          )
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
      {capturedPhoto && (
        <div className="captured-photo">
          <h2>Captured Photo</h2>
          <img src={capturedPhoto} alt="Captured" style={{ width: '200px', height: '200px' }} />
        </div>
      )}
      {!showCamera && isAuthenticated && !capturedPhoto && (
        <button onClick={handleShowCamera} className="show-camera-button">
          Open Camera
        </button>
      )}
    </div>
  );
}

export default App;
