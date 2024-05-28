import React, { useState, useEffect, useCallback  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import appFirebase, { db } from '../credenciales/credenciales';
import { getAuth, signOut } from 'firebase/auth';
import { createDocument, readDocument, deleteDocument } from '../credenciales/crud';
import logo from '../assets/TennisClub.png';
import { collection, onSnapshot } from 'firebase/firestore';
import SearchTorneo from '../components/SearchTorneo';

const auth = getAuth(appFirebase);

const AdminPage = ({ correoUser }) => {
  const [torneos, setTorneos] = useState([]);
  const [filteredTorneos, setFilteredTorneos] = useState([]);
  const [loading, setLoading] = useState(false);  
  const [newTournament, setNewTournament] = useState({
    name: '',
    date: '',
    img: '',
    maxParticipants: 0,
    registered: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(collection(db, "torneos"), (snapshot) => {
      let list = []
      snapshot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() })
      });
      setTorneos(list);
      setFilteredTorneos(list);
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
      setFilteredTorneos(filteredTorneos.filter((torneo) => torneo.id !== id));
    }
  };

  const handleSearch = useCallback((results) => {
    setFilteredTorneos(results);
  }, []);

  return (
    <div className="userPage">
      <nav className="navbar">
        <Link to='/'>
          <img src={logo} alt="Logo Tennis" className="logo" />
        </Link>
        <SearchTorneo torneos={torneos} onSearch={handleSearch} className="search-bar" />
        <div className="right-buttons">
          <Link to='/create'>
            <button type='button' className='btn-create'>
              Crear Nuevo Torneo
            </button>
          </Link>
          <button type='button' className='btn-logout' onClick={handleSignOut}>
            Logout
          </button>
        </div>
      </nav>
      <div className="welcome-message">
        <h1>Bienvenido admin {correoUser}</h1>
      </div>
      <div className="card-group">
        {filteredTorneos && filteredTorneos.map((item) => {
          console.log('URL de la imagen:', item.img); // Imprime la URL de la imagen en la consola
          return (
            <div className="card" key={item.id}>
              <h2>{item.name}</h2>
              <img 
                src={item.img || "URL_DE_IMAGEN_POR_DEFECTO"} // Usar imagen por defecto si `item.img` está vacío
                alt={item.name} 
                onError={(e) => { 
                  console.error("Image not loaded", e); 
                  console.log("Failed URL:", e.target.src); // Imprime la URL fallida en la consola
                  e.target.style.display = 'none'; 
                }} 
              />
              <p>Fecha: {item.date}</p>
              <p>Cantidad máxima de participantes: {item.maxParticipants}</p>
              <p>
                Registrados: 
                <span className="email" title={`Registrados: ${item.registered}`}>
                  {item.registered}
                </span>
              </p>
              <div className="btns-card">
                <button className="btn-update" onClick={() => navigate(`/update/${item.id}`)}>Actualizar torneo</button>
                <button className="btn-delete" onClick={() => handleDeleteDocument(item.id)}>Eliminar torneo</button>
              </div>  
            </div>
          );
        })}  
      </div>
    </div>
  );
};

export default AdminPage;
