import React, { useState, useEffect, useCallback } from 'react';
import appFirebase, { db } from '../credenciales/credenciales';
import { getAuth, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/TennisClub.png';
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

  const handleSearch = useCallback((results) => {
    setFilteredTorneos(results);
  }, []);

  return (
    <div>
      <nav className='container-nav-admin'>
        <form className='form-nav'>
          <Link to='/'>
            <img 
              src={Logo} 
              alt="Logo Tennis" />
          </Link>
          <SearchTorneo torneos={torneos} onSearch={handleSearch} />
          <button className='btn-logout' onClick={handleSignOut}>Logout</button>
        </form>
      </nav>
      <h1>Bienvenido user {correoUser}</h1>
      <div className='card-group'>
        {filteredTorneos && filteredTorneos.map((item) => (
          <div className='card' key={item.id}>
            <h2>{item.name}</h2>
            <img src={item.img} alt={item.name} />
            <p>Fecha: {item.date}</p>
            <p>Cantidad máxima de participantes: {item.maxParticipants}</p>
            <p>Registrados: {item.registered}</p>
            <div className='btns-card'>
              <button className='btn-view' onClick={() => navigate(`/torneo/${item.id}`)}>Ver Torneo</button>
            </div>  
          </div>
        ))}  
      </div>
    </div>
  );
};

export default UserPage;
