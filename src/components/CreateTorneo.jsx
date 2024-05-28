import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDocument } from '../credenciales/crud';
import { storage } from '../credenciales/credenciales';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import logo from '../assets/TennisClub.png';

const CreateTorneo = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [newTournament, setNewTournament] = useState({
    name: '',
    date: '',
    img: '',
    maxParticipants: 0,
    registered: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('La carga está pausada');
              break;
            case 'running':
              console.log('La carga está en ejecución');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setNewTournament((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    if (file) {
      uploadFile();
    }
  }, [file]);

  const handleCreateDocument = async (event) => {
    event.preventDefault();
    const newId = `torneo-${Date.now()}`;
    await createDocument('torneos', newId, newTournament);
    navigate('/admin'); // Redirige a la página de admin después de crear el torneo
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTournament((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBack = () => {
    navigate('/admin');
  };

  return (
    <div className="torneo-detail">
      <nav className="navbar">
        <button className="btn-back btn-create" onClick={handleBack}>Volver al Menú</button>
        <img src={logo} alt="Logo Tennis" className="logo" />
      </nav>
      <form className="form-torneo" onSubmit={handleCreateDocument}>
        <h2>Crear Nuevo Torneo</h2>
        <div className='form-group'>
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
          <input
            type="file"
            name="img"
            placeholder="Agrega una imagen"
            onChange={(event) => setFile(event.target.files[0])}
          />
        </div>
        <button className="btn-create" type="submit" disabled={progress !== null && progress < 100}>
          Crear Nuevo Torneo
        </button>
      </form>
    </div>
  );
};

export default CreateTorneo;
