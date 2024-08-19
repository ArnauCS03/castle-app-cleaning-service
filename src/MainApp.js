import React, { useState } from 'react';
import CameraCapture from './camera/CameraCapture';
import './MainApp.css';

const MainApp = () => {
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [showText, setShowText] = useState(true); // State to control the text visibility

  const handleCapture = (photo, timestamp) => {
    setCapturedPhoto(photo);
    setTimestamp(timestamp);
    console.log('Captured photo:', photo);
  };

  const handlePhotoConfirm = () => {
    setShowText(false); // Hide the text when photo is confirmed
  };

  const handleExit = () => {
    // Logic to handle exit can be added here
    console.log('Exit button clicked');
  };

  return (
    <div className="main-app">
      {capturedPhoto && (
        <div className="captured-photo-container">
          <img src={capturedPhoto} alt="Captured" className="captured-photo-small" />
          <p className="photo-timestamp">{timestamp}</p>
        </div>
      )}
      {showText && <h1>Pagina principal</h1>}
      <CameraCapture onCapture={handleCapture} onConfirm={handlePhotoConfirm} />
      <button className="exit-button" onClick={handleExit}>Exit</button>
    </div>
  );
};

export default MainApp;
