import React, { useRef, useState, useEffect } from 'react';
import './CameraCapture.css';

const CameraCapture = ({ onCapture }) => {
  const [cameraStream, setCameraStream] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [timestamp, setTimestamp] = useState(null); // State to store the timestamp
  const [showCamera, setShowCamera] = useState(false); // State to control camera visibility
  const [showButtons, setShowButtons] = useState(true); // State to control button visibility
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
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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

    // Set canvas size to match video feed size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the image scaled to fit the canvas size
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Set the photo state with the image data URL
    setPhoto(canvas.toDataURL('image/png'));

    // Set the timestamp for when the photo was taken
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
    // Hide buttons and keep the photo displayed
    setShowButtons(false);
  };

  // Reshoot: restart camera and clear photo
  const handleReshoot = () => {
    setPhoto(null);
    setTimestamp(null); // Clear the timestamp
    startCamera();
    setShowButtons(true); // Show buttons again after reshooting
  };

  // Toggle camera visibility
  const handleOpenCamera = () => {
    setShowCamera(true);
    startCamera();
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => stopCamera(); // Cleanup camera on component unmount
  }, [stopCamera]); // Include stopCamera in the dependency array

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
            <button onClick={capturePhoto} className="capture-button" >Capturar Foto</button>
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
