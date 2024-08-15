import React, { useRef, useState, useEffect } from 'react';
import './CameraCapture.css';

const CameraCapture = ({ onCapture }) => {
  const [cameraStream, setCameraStream] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
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
          facingMode: 'user', // 'user' for front camera
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

    setPhoto(canvas.toDataURL('image/png'));
    setTimestamp(formatTimestamp(new Date()));

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
    onCapture(photo);
    setShowButtons(false);
  };

  // Reshoot: restart camera and clear photo
  const handleReshoot = () => {
    setPhoto(null);
    setTimestamp(null);
    startCamera();
    setShowButtons(true);
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
      {photo ? (
        <div className="photo-preview">
          <img src={photo} alt="Captured" className="captured-photo-img" />
          {timestamp && <p className="photo-timestamp">{timestamp}</p>}
          {showButtons && (
            <>
              <button onClick={handleConfirm} className="confirm-button">Confirmar</button>
              <button onClick={handleReshoot} className="reshoot-button">Rehacer</button>
            </>
          )}
        </div>
      ) : (
        showCamera && (
          <div className="controls">
            <video ref={videoRef} autoPlay></video>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            <button onClick={capturePhoto} className="capture-button">Capturar Foto</button>
          </div>
        )
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
