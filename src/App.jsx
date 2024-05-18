import { useState } from 'react'
import Register from './Login/Register'
import appFirebase from './credenciales/credenciales'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Login from './Login/Login'
const auth = getAuth(appFirebase)


function App() {
  const [user, setUser] = useState(null)
  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      setUser(userFirebase)
    }
    else{
      setUser(null)
    }
  })
  return (
    <div>
      {user ? <Login correoUser = {user.email}/> : <Register/>}

    </div>
  )
}

export default App
