import React from 'react';
import appFirebase from '../credenciales/credenciales';
import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import Logo from '../assets/TennisClub.png';

const auth = getAuth(appFirebase);

const UserPage = ({ correoUser }) => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Usuario deslogueado con éxito");
    } catch (error) {
      console.error("Error al desloguear usuario:", error);
    }
  };

  return (
    <div>
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
          <button className='btn-logout' onClick={handleSignOut}>Logout</button>
        </form>
      </nav>
      <h1>Bienvenido user {correoUser}</h1>
    </div>
  );
};

export default UserPage;
