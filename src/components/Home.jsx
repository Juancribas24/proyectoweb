import React, { useState, useEffect } from 'react';
import appFirebase from '../credenciales/credenciales';
import { getAuth, signOut } from 'firebase/auth';
import { createDocument, readDocument } from '../credenciales/crud'; // Importa las funciones CRUD
import CreateTournament from './CreateTournament';
import UpdateTournament from './UpdateTournament';

const auth = getAuth(appFirebase)

const Home = ({ correoUser }) => {

  const [documentData, setDocumentData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

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

  const handleDeleteDocument = async () => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este torneo?');
    if (confirmDelete) {
      await deleteDocument('torneoTenis', 'K5rZXmNIyE58wguU0cVA');
      setDocumentData(null);
    }
  };

  return (
    <div className='containerGoku'>
      <h1>Bienvenido usuario {correoUser} <button className='btn-logout' onClick={handleSignOut}>Logout</button></h1>

      {showForm ? (
        <CreateTournament />
      ) : showUpdateForm ? (
        <UpdateTournament tournamentId='K5rZXmNIyE58wguU0cVA' onUpdate={() => setShowUpdateForm(false)} />
      ) : (
        documentData && (
          <div>
            <h2>Datos del Torneo:</h2>
            {documentData.img && <img src={documentData.img} alt="Torneo" />}
            <p>Nombre: {documentData.name}</p>
            <p>Fecha: {documentData.date}</p>
            <p>Participantes Max: {documentData.maxParticipants}</p>
            <p>Registrados: {documentData.registered}</p>
            <button onClick={() => setShowUpdateForm(true)}>Actualizar Torneo</button>
            <button onClick={handleDeleteDocument}>Eliminar Torneo</button>
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

