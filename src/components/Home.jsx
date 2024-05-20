import React from 'react'
import appFirebase from '../credenciales/credenciales'
import { getAuth, signOut } from 'firebase/auth'

const auth = getAuth(appFirebase)

const Home = ({ correoUser }) => {
  const handleSignOut = async () => {
    try {
      await signOut(auth)
      console.log("Usuario deslogueado con éxito")
    } catch (error) {
      console.error("Error al desloguear usuario:", error)
    }
  }

  return (
    <div className='containerGoku'>
      <h1>Bienvenido usuario {correoUser} <button className='btn-logout' onClick={handleSignOut}>Logout</button></h1>
    </div>
  )
}

export default Home

