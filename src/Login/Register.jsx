import React, { useState } from 'react'
import appFirebase from '../credenciales/credenciales'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
const auth = getAuth(appFirebase)

const Register = () => {
    const [register, setRegister] = useState(false)
    
    const functAuthentucacion = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (register) {
            // Registrar usuario
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                console.log("Usuario registrado con éxito:", email);
            } catch (error) {
                console.error("Error al registrar usuario:", error);
            }
        } else {
            // Iniciar sesión
            try {
                await signInWithEmailAndPassword(auth, email, password);
                console.log("Usuario inició sesión con éxito:", email);
            } catch (error) {
                console.error("Error al iniciar sesión:", error);
            }
        }
    };

    return (
        <div className='containerRegister'>
            <h1 className='text-center'>{register ? 'Registrar usuario' : 'Iniciar Sesión'}</h1>
            <form className='formRegister' onSubmit={functAuthentucacion}>
                <div className='form-group'>
                    <input type='email' className='register' placeholder='Email' id='email' name='email' autoComplete='email' />
                    <input type='password' className='register' placeholder='Password' id='password' name='password' autoComplete='current-password' />
                    <button type='submit' className='btnRegister'>{register ? 'Registrarse' : 'Iniciar Sesión'}</button>
                </div>
            </form>
            <h4>{register ? 'Si ya tienes cuenta' : 'No tienes cuenta'} <button onClick={() => setRegister(!register)} className='btnRegister'>{register ? 'Iniciar Sesión' : 'Registrarse'}</button></h4>
        </div>
    )
}

export default Register
