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
    <div className='container-update'>
      <form onSubmit={handleUpdateDocument}>
        <h2>Actualizar Torneo</h2>
        <div className='form-info'>
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
        </div>
        <div className='form-button-group'>
          <button className='btn-update' type="submit">Actualizar Torneo</button>
          <button className='btn-back' type="button" onClick={onUpdate}>Volver</button> {/* Botón para volver */}
        </div>
    </form>
    </div>
  );
};

export default UpdateTournament;
