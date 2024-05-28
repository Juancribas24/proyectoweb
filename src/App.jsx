import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from './AppRouter';
import appFirebase from './credenciales/credenciales';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const auth = getAuth(appFirebase);
const firestore = getFirestore(appFirebase);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
      console.log("Usuario registrado", userData);
    }).catch((error) => {
      console.error("Error al obtener el rol del usuario:", error);
      setLoading(false);
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        setUserWithFirebaseAndRol(userFirebase);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Router>
      <div>
        <AppRouter correoUser={user?.email} rol={user?.rol} />
      </div>
    </Router>
  );
}

export default App;
