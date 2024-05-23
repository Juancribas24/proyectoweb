import React from 'react';
import appFirebase from '../credenciales/credenciales';
import { getAuth, signOut } from 'firebase/auth';

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
      <h1>Bienvenido user {correoUser} <button className='btn-logout' onClick={handleSignOut}>Logout</button></h1>
    </div>
  );
};

export default UserPage;
