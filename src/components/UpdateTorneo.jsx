import React, { useState, useEffect } from 'react';
import { storage, db } from '../credenciales/credenciales';
import { useParams, useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import logo from '../assets/TennisClub.png';

const UpdateTorneo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [updateTournament, setUpdateTournament] = useState({
    name: '',
    date: '',
    img: '',
    maxParticipants: 0,
    registered: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'torneos', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUpdateTournament(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, [id]);

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
            setUpdateTournament((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    if (file) {
      uploadFile();
    }
  }, [file]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdateTournament((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const docRef = doc(db, 'torneos', id);
    await updateDoc(docRef, updateTournament);
    navigate('/admin'); // Redirige a la página de admin después de actualizar el torneo
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
      <form className="form-torneo" onSubmit={handleSubmit}>
        <h2>Actualizar Torneo</h2>
        <div className='form-group'>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={updateTournament.name}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            placeholder="Fecha"
            value={updateTournament.date}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="maxParticipants"
            placeholder="Participantes Máximos"
            value={updateTournament.maxParticipants}
            onChange={handleChange}
          />
          <input
            type="number"
            name="registered"
            placeholder="Registrados"
            value={updateTournament.registered}
            onChange={handleChange}
          />
          <input
            type="file"
            name="img"
            onChange={(event) => setFile(event.target.files[0])}
          />
          {progress !== null && <progress value={progress} max="100" />}
        </div>
        <button className="btn-create" type="submit" disabled={progress !== null && progress < 100}>
          Actualizar Torneo
        </button>
      </form>
    </div>
  );
};

export default UpdateTorneo;
