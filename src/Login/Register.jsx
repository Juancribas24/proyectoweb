import React, { useState } from 'react'
import appFirebase from '../credenciales/credenciales'
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword } from "firebase/auth"
const auth = getAuth(appFirebase)


const Register = () => {
    const [register,setRegister] = useState(false)
    

  return (
    <div className='containerRegister'>
      <h1 className='text-center'>Registrar usuario</h1>
      <form className='formRegister'>
        <div className='form-group'>
            <input type='text' className='nameRegister' placeholder='Nombre'/>
            <input type='email' className='emailRegister' placeholder='Email'/>
            <input type='password' className='passwordRegister' placeholder='Contraseña'/>
            <button className='btnRegister'>{register ?  'Registrarse' : 'Iniciar Sesión'}</button>
        </div>
        <h4>{register ? 'Si ya tienes cuenta' : 'No tienes cuenta'} <button onClick={()=> setRegister( !register)} className='btnRegister'>{register ? 'Iniciar Sesión' : 'Registrarse'}</button></h4>



        
      </form>
    </div>
  )
}

export default Register
