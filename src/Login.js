import React, { useState } from 'react';
import './Login.css';

// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import only the icons you need
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin();
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Inicio de sesión</h2>
        <div className="input-group">
          <FontAwesomeIcon icon={faUser} className="input-icon" />
          <input
            type="text"
            placeholder="Usuario"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faLock} className="input-icon" />
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FontAwesomeIcon
            icon={passwordVisible ? faEyeSlash : faEye}
            className="password-toggle"
            onClick={togglePasswordVisibility}
          />
        </div>
        <button type="submit">Entrar</button>
        <a href="#">¿Olvidaste la contraseña?</a>
      </form>
    </div>
  );
};

export default Login;
