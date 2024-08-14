import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Directly call onLogin to transition to the main app
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
          <i className="fas fa-user input-icon"></i>
          <input
            type="email"
            placeholder="Usuario"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <i className="fas fa-lock input-icon"></i>
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i
            className={`fas fa-eye${passwordVisible ? '-slash' : ''} password-toggle`}
            onClick={togglePasswordVisibility}
          ></i>
        </div>
        <button type="submit">Entrar</button>
        <a href="#">¿Olvidaste la contraseña?</a>
      </form>
    </div>
  );
};

export default Login;
