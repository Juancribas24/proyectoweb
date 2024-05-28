import React, { useState, useEffect, useCallback } from 'react';
import appFirebase, { db } from '../credenciales/credenciales';
import { getAuth, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/TennisClub.png';
import { collection, onSnapshot } from 'firebase/firestore';
import SearchTorneo from '../components/SearchTorneo';

const auth = getAuth(appFirebase);

const UserPage = ({ correoUser }) => {
  const [torneos, setTorneos] = useState([]);
  const [filteredTorneos, setFilteredTorneos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'torneos'), (snapshot) => {
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setTorneos(list);
      setFilteredTorneos(list);
    }, 
    (error) => {
      console.error(error);
    });

    return () => {
      unsub();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Usuario deslogueado con éxito");
      navigate('/login'); // Redirige al usuario a la página de inicio de sesión después de cerrar sesión
    } catch (error) {
      console.error("Error al desloguear usuario:", error);
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
        <button className="btn-logout" onClick={handleSignOut}>Logout</button>
      </nav>
      <div className="welcome-message">
        <h1>Bienvenido user {correoUser}</h1>
      </div>
      <div className="card-group">
        {filteredTorneos && filteredTorneos.map((item) => (
          <div className="card" key={item.id}>
            <h2>{item.name}</h2>
            <img 
              src={item.img} 
              alt={item.name} 
              onError={(e) => { 
                console.error("Image not loaded", e); 
                e.target.style.display = 'none'; 
              }} 
            />
            <p><b>Fecha:</b> {item.date}</p>
            <p> <b>Cantidad máxima de participantes: </b>{item.maxParticipants}</p>
            <p>
              <b>Registrados:</b> 
              <span className="email" 
                title={`Registrados: ${item.registered}`}>
                {item.registered}
              </span>
            </p>
            <div className="btns-card">
              <button className="btn-view" onClick={() => navigate(`/torneo/${item.id}`)}>Ver torneo</button>
            </div>  
          </div>
        ))}  
      </div>
    </div>
  );
};

export default UserPage;
