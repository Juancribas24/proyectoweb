import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import appFirebase, { db } from '../credenciales/credenciales';
import { getAuth, signOut } from 'firebase/auth';
import { createDocument, readDocument, deleteDocument } from '../credenciales/crud';
import Logo from '../assets/TennisClub.png';
import { collection, onSnapshot } from 'firebase/firestore';

const auth = getAuth(appFirebase);

const AdminPage = ({ correoUser }) => {
  const [torneos, setTorneos] = useState([]);
  const [loading, setLoading] = useState(false);  // corrected from 'flase' to 'false'
  const [open, setOpen] = useState(false);
  const [newTournament, setNewTournament] = useState({
    name: '',
    date: '',
    img: '',
    maxParticipants: 0,
    registered: 0,
  });
  const [selectedTorneo, setSelectedTorneo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(collection(db, "torneos"), (snapshot) => {
      let list = []
      snapshot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() })
      });
      setTorneos(list);
      setLoading(false);
    },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    }
  }, []);

  const handleModal = (item) => {
    setOpen(true);
    setSelectedTorneo(item);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Usuario deslogueado con éxito");
      navigate('/'); // Redirige al usuario a la página de inicio después de cerrar sesión
    } catch (error) {
      console.error("Error al desloguear usuario:", error);
    }
  };

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

  const handleDeleteDocument = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este torneo?');
    if (confirmDelete) {
      await deleteDocument('torneos', id);
      setTorneos(torneos.filter((torneo) => torneo.id !== id));
    }
  };

  return (
    <div className='containerGoku'>
      <nav className='container-nav-admin'>
        <form className='form-nav'>
          <Link to='/'>
            <img 
              src={Logo} 
              alt="Logo Tennis" />
          </Link>
          <div>
            <input
              type='search'
              name='valueSearch'
              id=''
              placeholder='Buscar nombre torneo'
            />
            <button className='btn-search'>Buscar</button>
          </div>
          <Link to='/create'>
            <button
              type='button'
              className='btn-create'
            >
              Crear Nuevo Torneo
            </button>
          </Link>
          <button
            type='button'
            className='btn-logout'
            onClick={handleSignOut}
          >Logout</button>
        </form>
      </nav>
      <h1>Bienvenido admin {correoUser}</h1>
      <div className='card-group'>
        {torneos && torneos.map((item) => (
          <div className='card' key={item.id}>
            <h2>{item.name}</h2>
            <img src={item.img} alt={item.name} />
            <p>Fecha: {item.date}</p>
            <p>Cantidad máxima de participantes: {item.maxParticipants}</p>
            <p>Registrados: {item.registered}</p>
            <div className='btns-card'>
              <button className='btn-update' onClick={() => navigate(`/update/${item.id}`)}>Actualizar torneo</button>
              <button className='btn-delete' onClick={() => handleDeleteDocument(item.id)}>Eliminar torneo</button>
            </div>           
          </div>
        ))}  
      </div>
    </div>
  );
};

export default AdminPage;
