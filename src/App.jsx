import { useState, useEffect } from 'react';
import Register from './Login/Register';
import appFirebase from './credenciales/credenciales';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Home from './components/Home';

const auth = getAuth(appFirebase);
const firestore = getFirestore(appFirebase);

function App() {
  const [user, setUser] = useState(null);

  async function getRol(uid) {
    try {
      const docuRef = doc(firestore, `users/${uid}`);
      const docuCifrada = await getDoc(docuRef);
      const infoFinal = docuCifrada.data().rol;
      return infoFinal;
    } catch (error) {
      console.error("Error al obtener el rol del usuario:", error);
      return null;
    }
  }

  function setUserWithFirebaseAndRol(userFirebase) {
    getRol(userFirebase.uid).then((rol) => {
      const userData = {
        uid: userFirebase.uid,
        email: userFirebase.email,
        rol: rol,
      };
      setUser(userData);
      console.log("Usuario registrado", userData);
    }).catch((error) => {
      console.error("Error al obtener el rol del usuario:", error);
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        setUserWithFirebaseAndRol(userFirebase);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? <Home correoUser={user.email} /> : <Register />}
    </div>
  );
}

export default App;
