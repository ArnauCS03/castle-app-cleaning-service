import React, { useRef, useState, useEffect } from 'react';
import './CameraCapture.css';

const CameraCapture = ({ onCapture }) => {
  const [cameraStream, setCameraStream] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [showPhotoPreview, setShowPhotoPreview] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Function to format the timestamp
  const formatTimestamp = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const dayOfWeek = date.toLocaleString('es-ES', { weekday: 'long' });
    const dayOfMonth = date.getDate();
    const month = date.toLocaleString('es-ES', { month: 'long' });

    return `${hours}:${minutes}, ${dayOfWeek} ${dayOfMonth} de ${month}`;
  };

  // Start the camera
  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: 'environment', // 'user' for front camera
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setCameraStream(stream);
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  // Capture photo from the camera feed
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
    setShowPhotoPreview(true); // Show photo preview after capture

    stopCamera();
  };

  // Stop the camera
  const stopCamera = () => {
    if (cameraStream) {
      const tracks = cameraStream.getTracks();
      tracks.forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  // Confirm photo and pass it to the parent
  const handleConfirm = () => {
    onCapture(photo, timestamp);
    setPhoto(null); // Clear photo
    setTimestamp(null);
    setShowPhotoPreview(false); // Hide photo preview
    setShowCamera(false); // Hide camera controls
    setShowButtons(false); // Hide buttons
  };

  // Reshoot: restart camera and clear photo
  const handleReshoot = () => {
    setPhoto(null);
    setTimestamp(null);
    setShowPhotoPreview(false);
    startCamera();
    setShowButtons(true);
    setShowCamera(true);
  };

  // Toggle camera visibility
  const handleOpenCamera = () => {
    setShowCamera(true);
    startCamera();
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  return (
    <div className="camera-capture">
      {showPhotoPreview && photo && (
        <div className="photo-preview">
          <img src={photo} alt="Captured" className="captured-photo-original" />
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
          Abrir Cámara
        </button>
      )}
    </div>
  );
};

export default CameraCapture;
