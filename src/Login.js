import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase'; 
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect or update UI on successful login
    } catch (err) {
      setError('Error en el log in. Comprueba tus credenciales.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Inicio de sesión</h2>
        <input
          type="email"
          placeholder="Usuario"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
        {error && <p className="error">{error}</p>}
        <a href="#">¿Olvidaste la contraseña?</a>
      </form>
    </div>
  );
};

export default Login;
