import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appFirebase from '../credenciales/credenciales';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import logo from '../assets/TennisClub.png';

const auth = getAuth(appFirebase);

const Register = () => {
  const firestore = getFirestore(appFirebase);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('user'); // Inicializa el estado del rol con 'user'
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const infoUser = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuario registrado:", infoUser.user.uid);
      const docuRef = doc(firestore, `users/${infoUser.user.uid}`);
      await setDoc(docuRef, { correo: email, rol: rol });
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      navigate('/login');
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
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

  const redirectToLogin = (event) => {
    event.preventDefault();
    navigate('/login');
  };

  return (
    <div className="login-wrapper">
      <div className='containerRegister'>
        <div className="header">
          <h2>Registrar usuario</h2>
          <img src={logo} alt="Tennis Club Logo" className="logo" />
        </div>
        <form className='formRegister' onSubmit={handleRegister}>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email'
              id='email'
              name='email'
              autoComplete='off'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Password'
              id='password'
              name='password'
              autoComplete='off'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>
              <span>Rol</span>
              <select id='rol' name='rol' value={rol} onChange={(e) => setRol(e.target.value)}>
                <option value="admin">Administrador</option>
                <option value="user">Usuario</option>
              </select>
            </label>
          </div>
          <button type='submit' className='btnRegister'>Registrarse</button>
        </form>
        <div className='registerLink'>
          ¿Ya tienes cuenta? <a href="#" onClick={redirectToLogin}>Iniciar Sesión</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
