import React, { useRef, useState } from 'react';
import './CameraCapture.css';

const CameraCapture = ({ onCapture }) => {
  const [cameraStream, setCameraStream] = useState(null);
  const [photo, setPhoto] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    setPhoto(canvas.toDataURL('image/png'));
    stopCamera();
  };

  const stopCamera = () => {
    if (cameraStream) {
      const tracks = cameraStream.getTracks();
      tracks.forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  const handleConfirm = () => {
    onCapture(photo);
    setPhoto(null);
    stopCamera();
  };

  const handleReshoot = () => {
    setPhoto(null);
    startCamera();
  };

  return (
    <div className="camera-capture">
      <video ref={videoRef} autoPlay></video>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      {photo ? (
        <div className="photo-preview">
          <img src={photo} alt="Captured" />
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={handleReshoot}>Reshoot</button>
        </div>
      ) : (
        <div className="controls">
          <button onClick={startCamera}>Start Camera</button>
          <button onClick={capturePhoto}>Capture Photo</button>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
