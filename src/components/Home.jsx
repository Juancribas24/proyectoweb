import React from 'react';
import appFirebase from '../credenciales/credenciales';
import { getAuth, signOut } from 'firebase/auth';
import AdminPage from './AdminPage';
import UserPage from './UserPage';

const auth = getAuth(appFirebase);

const Home = ({ correoUser, rol }) => {
  return (
    <div>
      {rol === "admin" ? <AdminPage correoUser={correoUser} /> : <UserPage correoUser={correoUser} />}
    </div>
  );
}

export default Home;

