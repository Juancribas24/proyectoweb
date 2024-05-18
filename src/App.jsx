import { useState, useEffect } from 'react'
import Register from './Login/Register'
import appFirebase from './credenciales/credenciales'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Home from './components/Home'


const auth = getAuth(appFirebase)

function App() {
  const [user, setUser] = useState(null)

  onAuthStateChanged(auth, (userFirebase)=>{
    if(userFirebase){
      setUser(userFirebase)
    }
    else{
      setUser(null)
    }
  })

  return (
    <div>
      {user ? <Home correoUsuario = {user.email}/> : <Register/>}
    </div>
  )
}

export default App

