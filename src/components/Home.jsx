import React, { useState, useEffect } from 'react';
import appFirebase from '../credenciales/credenciales';
import { getAuth, signOut } from 'firebase/auth';
import { createDocument, readDocument } from '../credenciales/crud'; // Importa las funciones CRUD
import CreateTournamentForm from './CreateTournament';

const auth = getAuth(appFirebase)

const Home = ({ correoUser }) => {

  const [documentData, setDocumentData] = useState(null);
  const [showForm, setShowForm] = useState(false);

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
  const handleCreateDocument = async (event) => {
    event.preventDefault();
    const newId = `torneo-${Date.now()}`;
    await createDocument('torneoTenis', newId, newTournament);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTournament((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className='containerGoku'>
      <h1>Bienvenido usuario {correoUser} <button className='btn-logout' onClick={handleSignOut}>Logout</button></h1>

      {showForm ? (
        <CreateTournamentForm />
      ) : (
        documentData && (
          <div>
            <h2>Datos del Torneo:</h2>
            {documentData.img && <img src={documentData.img} alt="Torneo" />}
            <p>Nombre: {documentData.name}</p>
            <p>Fecha: {documentData.date}</p>
            <p>Participantes Max: {documentData.maxParticipants}</p>
            <p>Registrados: {documentData.registered}</p>
          </div>
        )
      )}

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Ocultar Formulario' : 'Crear Nuevo Torneo'}
      </button>
    </div>
  )
}

export default Home;

