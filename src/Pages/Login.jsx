import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appFirebase from '../credenciales/credenciales';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import logo from '../assets/TennisClub.png';

const auth = getAuth(appFirebase);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirige al usuario después de iniciar sesión
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/'); // Redirige al usuario después de iniciar sesión con Google
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  const redirectToRegister = (event) => {
    event.preventDefault();
    navigate('/register');
  };

  return (
    <div className="login-wrapper">
      <div className='containerRegister'>
        <div className="header">
          <h2>Iniciar Sesión</h2>
          <img src={logo} alt="Tennis Club Logo" className="logo" />
        </div>
        <form className='formRegister' onSubmit={handleLogin}>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email'
              id='email'
              name='email'
              autoComplete='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Password'
              id='password'
              name='password'
              autoComplete='current-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' className='btnRegister'>Iniciar Sesión</button>
        </form>
        <button onClick={handleGoogleSignIn} className='btnGoogle'>Iniciar sesión con oogle</button>
        <div className='registerLink'>
          No tienes cuenta <a href="#" onClick={redirectToRegister}>Registrarse</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
