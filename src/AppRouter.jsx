import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';
import Register from './Login/Register';


export const AppRouter = ({ correoUser, rol }) => {
  return (
    <Routes>
      <Route index element={<Home correoUser={correoUser} rol={rol} />} />
      <Route path='/user' element={<UserPage correoUser={correoUser} />} />
      <Route path='/admin' element={<AdminPage correoUser={correoUser} />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
};
