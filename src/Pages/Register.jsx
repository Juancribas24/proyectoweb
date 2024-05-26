import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appFirebase from '../credenciales/credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const auth = getAuth(appFirebase);

const Register = () => {
  const firestore = getFirestore(appFirebase);
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();

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

  return (
    <div className='containerRegister'>
      <h1 className='text-center'>{register ? 'Registrar usuario' : 'Iniciar Sesión'}</h1>
      <form className='formRegister' onSubmit={functAuthentucacion}>
        <div className='form-group'>
          <input type='email' className='register' placeholder='Email' id='email' name='email' autoComplete='email' />
          <input type='password' className='password' placeholder='Password' id='password' name='password' autoComplete='current-password' />
          {register && (
            <label>Rol
              <select id='rol' name='rol'>
                <option value="admin">Administrador</option>
                <option value="user">Usuario</option>
              </select>
            </label>
          )}
          <button type='submit' className='btnRegister'>{register ? 'Registrarse' : 'Iniciar Sesión'}</button>
        </div>
      </form>
      <button onClick={handleGoogleSignIn} className='btnRegister'>Iniciar sesión con Google</button>
      <h4>{register ? 'Si ya tienes cuenta' : 'No tienes cuenta'} <button onClick={() => setRegister(!register)} className='btnRegister'>{register ? 'Iniciar Sesión' : 'Registrarse'}</button></h4>
    </div>
  );
};

export default Register;