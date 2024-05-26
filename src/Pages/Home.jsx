import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ correoUser, rol }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (rol === "admin") {
      navigate('/admin');
    } else if (rol === "user") {
      navigate('/user');
    }
  }, [rol, navigate]);

  return null; // No necesita renderizar nada ya que maneja redirección
}

export default Home;
