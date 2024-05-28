import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../credenciales/credenciales';
import logo from '../assets/TennisClub.png';

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
    setTorneo((prevTorneo) => ({
      ...prevTorneo,
      registered: [...prevTorneo.registered, correoUser]
    }));
  };

  const handleDesinscripcion = async () => {
    const docRef = doc(db, 'torneos', id);
    await updateDoc(docRef, {
      registered: arrayRemove(correoUser)
    });
    setTorneo((prevTorneo) => ({
      ...prevTorneo,
      registered: prevTorneo.registered.filter(user => user !== correoUser)
    }));
  };

  const handleBack = () => {
    navigate('/user');
  };

  if (!torneo) return <div>Cargando...</div>;

  const isUserRegistered = torneo.registered.includes(correoUser);

  return (
    <div className="torneo-detail">
      <nav className="navbar">
        <button className="btn-back" onClick={handleBack}>Volver al Menú</button>
        <img src={logo} alt="Logo Tennis" className="logo" />
      </nav>
      <div className="card">
        <h1>{torneo.name}</h1>
        <img src={torneo.img} alt={torneo.name} />
        <p>Fecha: {torneo.date}</p>
        <p>Cantidad máxima de participantes: {torneo.maxParticipants}</p>
        <p>Registrados: {torneo.registered.length}</p>
        {isUserRegistered ? (
          <button className="btn-danger" onClick={handleDesinscripcion}>Desinscribirse</button>
        ) : (
          <button className="btn-create" onClick={handleInscripcion}>Inscribirse</button>
        )}
      </div>
    </div>
  );
};

export default TorneoDetail;
