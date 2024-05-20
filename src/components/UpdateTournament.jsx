import React, { useState, useEffect } from 'react';
import { updateDocument, readDocument } from '../credenciales/crud';

const UpdateTournament = ({ tournamentId, onUpdate }) => {
  const [tournament, setTournament] = useState({
    name: '',
    date: '',
    img: '',
    maxParticipants: 0,
    registered: 0,
  });

  useEffect(() => {
    const fetchTournament = async () => {
      const data = await readDocument('torneoTenis', tournamentId);
      setTournament(data);
    };
    fetchTournament();
  }, [tournamentId]);

  const handleUpdateDocument = async (event) => {
    event.preventDefault();
    await updateDocument('torneoTenis', tournamentId, tournament);
    onUpdate();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTournament((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleUpdateDocument}>
      <h2>Actualizar Torneo</h2>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={tournament.name}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        placeholder="Fecha"
        value={tournament.date}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="img"
        placeholder="URL de la imagen"
        value={tournament.img}
        onChange={handleChange}
      />
      <input
        type="number"
        name="maxParticipants"
        placeholder="Participantes Máximos"
        value={tournament.maxParticipants}
        onChange={handleChange}
      />
      <input
        type="number"
        name="registered"
        placeholder="Registrados"
        value={tournament.registered}
        onChange={handleChange}
      />
      <button type="submit">Actualizar Torneo</button>
    </form>
  );
};

export default UpdateTournament;
