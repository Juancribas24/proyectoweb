import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UpdateTorneo from './components/UpdateTorneo';
import CreateTorneo from './components/CreateTorneo';
import AdminPage from './Pages/AdminPage';
import UserPage from './Pages/UserPage';
import Home from './Pages/Home';
import Register from './Pages/Register';
import TorneoDetail from './Pages/TorneoDetail'; // Importa el nuevo componente

export const AppRouter = ({ correoUser, rol }) => {
  return (
    <Routes>
      <Route index element={<Home correoUser={correoUser} rol={rol}/>} />
      <Route path='/user' element={<UserPage correoUser={correoUser} />} />
      <Route path='/admin' element={<AdminPage correoUser={correoUser} />} />
      <Route path='/update/:id' element={<UpdateTorneo/>}/>
      <Route path='/create' element={<CreateTorneo/>}/>
      <Route path='/register' element={<Register />} />
      <Route path='/torneo/:id' element={<TorneoDetail correoUser={correoUser} />} /> {/* Nueva ruta para detalles del torneo */}
    </Routes>
  );
};
