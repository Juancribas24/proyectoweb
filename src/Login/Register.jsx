import React from 'react'

const Register = () => {
  return (
    <div className='containerRegister'>
      <h1 className='text-center'>Registrar usuario</h1>
      <form className='formRegister'>
        <div className='form-group'>
            <h1>Registar usuario</h1>
            <input type='text' className='nameRegister' placeholder='Nombre'/>
            <input type='email' className='emailRegister' placeholder='Email'/>
            <input type='password' className='passwordRegister' placeholder='Contraseña'/>
            <button className='buttonRegister'>Registarse</button>
        </div>
        
      </form>
    </div>
  )
}

export default Register
