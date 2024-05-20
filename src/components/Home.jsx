import React, { useState, useEffect } from 'react';
import appFirebase from '../credenciales/credenciales';
import { getAuth, signOut } from 'firebase/auth';
import { createDocument, readDocument } from '../credenciales/crud'; // Importa las funciones CRUD

const auth = getAuth(appFirebase)

const Home = ({ correoUser }) => {

  const [documentData, setDocumentData] = useState(null);

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      console.log("Usuario deslogueado con éxito")
    } catch (error) {
      console.error("Error al desloguear usuario:", error)
    }
  }

    // Función para leer el documento desde Firestore
    useEffect(() => {
      const fetchData = async () => {
        const data = await readDocument('torneoTenis', 'K5rZXmNIyE58wguU0cVA');
        setDocumentData(data);
      };
      fetchData();
    }, []);

      // Función para crear un nuevo documento en Firestore
  const handleCreateDocument = async () => {
    const newData = { name: 'Nuevo Torneo', date: '2024-05-20' };
    await createDocument('torneoTenis', 'nuevoTorneoId', newData);
  };

  return (
    <div className='containerGoku'>
      <h1>Bienvenido usuario {correoUser} <button className='btn-logout' onClick={handleSignOut}>Logout</button></h1>

      {documentData && (
        <div>
          <h2>Datos del Torneo:</h2>
          <p>Nombre: {documentData.name}</p>
          <p>Fecha: {documentData.date}</p>
          <p>Imagen: {documentData.img}</p>
          <p>ParticipantesMax: {documentData.maxParticipants}</p>
          <p>Registrados: {documentData.registered}</p>
          </div>
      )}
      <button onClick={handleCreateDocument}>Crear Nuevo Torneo</button>
    </div>
  )
}

export default Home;

