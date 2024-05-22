import React, { useState } from 'react';
import { createDocument } from '../credenciales/crud';

const CreateTournamentForm = () => {
    const [newTournament, setNewTournament] = useState({
      name: '',
      date: '',
      img: '',
      maxParticipants: 0,
      registered: 0,
    });
  
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
      <div className='form-group1'>
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
        <button className='btn-create' type="submit">Crear Nuevo Torneo</button>
      </form>

      </div>
      
    );
  };
  
  export default CreateTournamentForm;