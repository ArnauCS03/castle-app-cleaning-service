import React, { useState } from 'react';
import CameraCapture from './camera/CameraCapture';
import './MainApp.css';

const MainApp = () => {
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [timestamp, setTimestamp] = useState(null);

  const handleCapture = (photo, timestamp) => {
    setCapturedPhoto(photo);
    setTimestamp(timestamp);
    console.log('Captured photo:', photo);
  };

  return (
    <div className="main-app">
      {capturedPhoto && (
        <div className="captured-photo-container">
          <img src={capturedPhoto} alt="Captured" className="captured-photo-small" />
          <p className="photo-timestamp">{timestamp}</p>
        </div>
      )}
      <h1>Pagina principal</h1>
      <CameraCapture onCapture={handleCapture} />
    </div>
  );
};

export default MainApp;
