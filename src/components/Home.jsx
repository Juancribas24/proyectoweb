import React, { useState, useEffect } from 'react';
import appFirebase from '../credenciales/credenciales';
import { getAuth, signOut } from 'firebase/auth';
import { createDocument, readDocument } from '../credenciales/crud'; // Importa las funciones CRUD

const auth = getAuth(appFirebase)

const Home = ({ correoUser }) => {

  const [documentData, setDocumentData] = useState(null);

  const [newTournament, setNewTournament] = useState({
    name: '',
    date: '',
    img: '',
    maxParticipants: 0,
    registered: 0,
  });

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

      <form onSubmit={handleCreateDocument}>
        <h2>Crear Nuevo Torneo</h2>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={newTournament.name}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          placeholder="Fecha"
          value={newTournament.date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="img"
          placeholder="URL de la imagen"
          value={newTournament.img}
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxParticipants"
          placeholder="Participantes Máximos"
          value={newTournament.maxParticipants}
          onChange={handleChange}
        />
        <input
          type="number"
          name="registered"
          placeholder="Registrados"
          value={newTournament.registered}
          onChange={handleChange}
        />
      <button onClick={handleCreateDocument}>Crear Nuevo Torneo</button>
      </form>
    </div>
  )
}

export default Home;

