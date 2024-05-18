import React from 'react'

const Login = () => {
  return (
    <div>
      <div className='login'>
        <form>
            <input type="text" className='email'placeholder='Ingresa Email'/>
            <input type="password" className='password' placeholder='Ingresa Contraseña'/>
            <button className='btnLogin'>Iniciar</button>
        </form>
        <h4><button className='btnRegister1'>Registrarse</button></h4>

      </div>
    </div>
  )
}

export default Login
