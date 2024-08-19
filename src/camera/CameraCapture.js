import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import './CameraCapture.css';

const CameraCapture = ({ onCapture, onConfirm = () => {} }) => { // Default to a no-op function
  const [cameraStream, setCameraStream] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [showPhotoPreview, setShowPhotoPreview] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false); // New state to check if photo is captured
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const formatTimestamp = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const dayOfWeek = date.toLocaleString('es-ES', { weekday: 'long' });
    const dayOfMonth = date.getDate();
    const month = date.toLocaleString('es-ES', { month: 'long' });

    return `${hours}:${minutes}, ${dayOfWeek} ${dayOfMonth} de ${month}`;
  };

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: 'environment',
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
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
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const photoData = canvas.toDataURL('image/png');
    setPhoto(photoData);
    setTimestamp(formatTimestamp(new Date()));
    setShowPhotoPreview(true);
    setIsCaptured(true); // Mark photo as captured

    stopCamera();
  };

  const stopCamera = () => {
    if (cameraStream) {
      const tracks = cameraStream.getTracks();
      tracks.forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  const handleConfirm = () => {
    onCapture(photo, timestamp);
    onConfirm(); // Notify MainApp that photo has been confirmed
    setIsCaptured(false); // Reset capture state after confirm
    setShowButtons(false); // Hide buttons after confirm
    setShowPhotoPreview(false); // Hide preview after confirm
  };

  const handleReshoot = () => {
    setPhoto(null);
    setTimestamp(null);
    setShowPhotoPreview(false);
    setIsCaptured(false); // Reset capture state
    startCamera();
    setShowButtons(true);
    setShowCamera(true);
  };

  const handleOpenCamera = () => {
    setShowCamera(true);
    startCamera();
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="camera-capture">
      {showPhotoPreview && photo && (
        <div className="photo-preview" style={{ justifyContent: isCaptured ? 'center' : 'flex-start' }}>
          <img
            src={photo}
            alt="Captured"
            className="captured-photo-original"
          />
          {timestamp && <p className="photo-timestamp">{timestamp}</p>}
          {showButtons && (
            <>
              <button onClick={handleConfirm} className="confirm-button">Confirmar</button>
              <button onClick={handleReshoot} className="reshoot-button">Rehacer</button>
            </>
          )}
        </div>
      )}
      {showCamera && !photo && (
        <div className="controls">
          <video ref={videoRef} autoPlay></video>
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          <button onClick={capturePhoto} className="capture-button">Capturar Foto</button>
        </div>
      )}
      {!showCamera && !photo && (
        <button onClick={handleOpenCamera} className="open-camera-button">
          <FontAwesomeIcon icon={faCamera} size="lg" /> {}
        </button>
      )}
    </div>
  );
};

export default CameraCapture;
