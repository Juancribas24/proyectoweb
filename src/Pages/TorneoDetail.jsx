import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../credenciales/credenciales';

const TorneoDetail = ({ correoUser }) => {
  const { id } = useParams();
  const [torneo, setTorneo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTorneo = async () => {
      const docRef = doc(db, 'torneos', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTorneo(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchTorneo();
  }, [id]);

  const handleInscripcion = async () => {
    const docRef = doc(db, 'torneos', id);
    await updateDoc(docRef, {
      registered: arrayUnion(correoUser)
    });
    navigate('/user');
  };

  if (!torneo) return <div>Cargando...</div>;

  return (
    <div>
      <h1>{torneo.name}</h1>
      <img src={torneo.img} alt={torneo.name} />
      <p>Fecha: {torneo.date}</p>
      <p>Cantidad máxima de participantes: {torneo.maxParticipants}</p>
      <p>Registrados: {torneo.registered.length}</p>
      <button onClick={handleInscripcion}>Inscribirse</button>
    </div>
  );
};

export default TorneoDetail;
