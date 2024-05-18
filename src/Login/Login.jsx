import React from 'react'

const Login = () => {
  return (
    <div>
      <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin} >
        <div>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div className='divboton'>
                <button type="submit" className="btn-sesion">Iniciar sesión</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Login
