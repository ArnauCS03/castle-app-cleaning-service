// MainApp.js
import React from 'react';
import CameraCapture from './camera/CameraCapture';

const MainApp = () => {
  const handleCapture = (photo) => {
    console.log('Captured photo:', photo);
    // You can handle the captured photo here (e.g., display it, upload it, etc.)
  };

  return (
    <div className="main-app">
      <h1>Pagina principal</h1>
      <CameraCapture onCapture={handleCapture} />
    </div>
  );
};

export default MainApp;
