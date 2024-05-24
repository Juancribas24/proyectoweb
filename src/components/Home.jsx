import React from 'react';
import AdminPage from './AdminPage';
import UserPage from './UserPage';

const Home = ({ correoUser, rol }) => {
  return (
    <div>
      {rol === "admin" ? <AdminPage correoUser={correoUser} /> : <UserPage correoUser={correoUser} />}
    </div>
  );
};

export default Home;

