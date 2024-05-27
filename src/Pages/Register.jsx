import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appFirebase from '../credenciales/credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import logo from '../assets/TennisClub.png';

const auth = getAuth(appFirebase);

const Register = () => {
  const firestore = getFirestore(appFirebase);
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  async function registerUser(email, password, rol) {
    try {
      const infoUser = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuario registrado:", infoUser.user.uid);
      const docuRef = doc(firestore, `users/${infoUser.user.uid}`);
      await setDoc(docuRef, { correo: email, rol: rol });
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      navigate('/'); // Redirige al usuario después de registrarse
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  }

  const functAuthentucacion = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const rol = event.target.rol ? event.target.rol.value : "user"; // Default rol is 'user'

    if (register) {
      await registerUser(email, password, rol);
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/'); // Redirige al usuario después de iniciar sesión
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userFirebase = result.user;
      const docuRef = doc(firestore, `users/${userFirebase.uid}`);
      await setDoc(docuRef, { correo: userFirebase.email, rol: "user" }, { merge: true });
      console.log("Usuario registrado con Google:", userFirebase.uid);
      navigate('/'); // Redirige al usuario después de iniciar sesión con Google
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  const toggleRegister = () => {
    setRegister(!register);
    setEmail('');
    setPassword('');
};

return (
  <div className='containerRegister'>
      <div className="header">
          <h2>{register ? 'Registrar usuario' : 'Iniciar Sesión'}</h2>
          <img src={logo} alt="Tennis Club Logo" className="logo" />
      </div>
      <form className='formRegister' onSubmit={functAuthentucacion}>
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
              {register && (
                  <label>
                      <span>Rol</span>
                      <select id='rol' name='rol'>
                          <option value="admin">Administrador</option>
                          <option value="user">Usuario</option>
                      </select>
                  </label>
              )}
          </div>
          <button type='submit' className='btnRegister'>{register ? 'Registrarse' : 'Iniciar Sesión'}</button>
      </form>
      <button onClick={handleGoogleSignIn} className='btnGoogle'>Iniciar sesión con Google</button>
      <div className='registerLink'>
          {register ? 'Si ya tienes cuenta' : 'No tienes cuenta'} <a href="#" onClick={toggleRegister}>{register ? 'Iniciar Sesión' : 'Registrarse'}</a>
      </div>
  </div>
);
};

export default Register;
