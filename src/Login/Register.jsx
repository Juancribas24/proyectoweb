import React, { useState } from 'react'
import appFirebase from '../credenciales/credenciales'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { getFirestore, doc, collection, setDoc } from 'firebase/firestore'
const auth = getAuth(appFirebase)
const firestore = getFirestore(appFirebase)

const Register = () => {
    const [register, setRegister] = useState(false)



    async function registerUser(auth, email, password, rol){
        
        createUserWithEmailAndPassword(auth, email, password);
    }  
    
    
    const functAuthentucacion = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const rol = event.target.rol.value;
        
        console.log("submit", email, password, rol);

        if(register){
            registerUser(email, password, rol);
        }
        else{

        }

    };

    return (
        <div className='containerRegister'>
            <h1 className='text-center'>{register ? 'Registrar usuario' : 'Iniciar Sesión'}</h1>
            <form className='formRegister' onSubmit={functAuthentucacion}>
                <div className='form-group'>
                    <input type='email' className='register' placeholder='Email' id='email' name='email' autoComplete='email' />
                    <input type='password' className='password' placeholder='Password' id='password' name='password' autoComplete='current-password' />
                    <label>Rol
                        <select id='rol' >
                            <option value="admin">Administrador</option>
                            <option value="user">Usuario</option>
                        </select>
                    </label>
                    <button type='submit' className='btnRegister'>{register ? 'Registrarse' : 'Iniciar Sesión'}</button>
                    <button className=''></button>
                </div>
            </form>
            <h4>{register ? 'Si ya tienes cuenta' : 'No tienes cuenta'} <button onClick={() => setRegister(!register)} className='btnRegister'>{register ? 'Iniciar Sesión' : 'Registrarse'}</button></h4>
        </div>
    )
}

export default Register
