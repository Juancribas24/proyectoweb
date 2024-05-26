import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import appFirebase, { db } from '../credenciales/credenciales';
import { getAuth, signOut } from 'firebase/auth';
import { createDocument, readDocument, deleteDocument } from '../credenciales/crud';
import Logo from '../assets/TennisClub.png';
import CreateTorneo from '../components/CreateTorneo';
import UpdateTorneo from '../components/UpdateTorneo';
import { collection, onSnapshot } from 'firebase/firestore';

const auth = getAuth(appFirebase);

const AdminPage = ({ correoUser }) => {
  const [torneos, setTorneos] = useState([]);
  const {loading, setLoading} = useState(flase);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();


  useEffect(()=>{
    setLoading(true);
    const unsub = onSnapshot(collection(db,"torneos"), (snapshot) =>{
      let list = []
      snapshot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() })
      });
      setTorneos(list);
      setLoading(false);
    },
    (error) => {
      console.log(error);
    }
  );
  return () =>{
    unsub();
  }
  },[]);

  const handleModal = (item) => {
    setOpen(true);
    setTorneo(item);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Usuario deslogueado con éxito");
      navigate('/'); // Redirige al usuario a la página de inicio después de cerrar sesión
    } catch (error) {
      console.error("Error al desloguear usuario:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await readDocument('torneos', 'K5rZXmNIyE58wguU0cVA');
      setDocumentData(data);
    };
    fetchData();
  }, []);

  const handleCreateDocument = async (event) => {
    event.preventDefault();
    const newId = `torneo-${Date.now()}`;
    await createDocument('torneoTenis', newId, newTournament);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTournament((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteDocument = async () => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este torneo?');
    if (confirmDelete) {
      await deleteDocument('torneoTenis', 'K5rZXmNIyE58wguU0cVA');
      setDocumentData(null);
    }
  };

  return (
    <div className='containerGoku'>
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
          <Link to='/create'>
            <button
              type='button'
              className='btn-create'
            >
              Crear Nuevo Torneo
            </button>
          </Link>
          <button
            type='button'
            className='btn-logout'
            onClick={handleSignOut}
          >Logout</button>
        </form>
      </nav>
      <h1>Bienvenido admin {correoUser}</h1>
      <div className='card-group'>
        {torneo && torneos.map((item) =>{
          <div className='card'>
            key={item.id}
            <h2>
              {item.name}
            </h2>
            <img
              src={item.id}
            />
            <p>Fecha: {item.date}</p>
            <p>Cantidad máxima de parcipantes: {item.maxParticipants}</p>
            <p>Registrados: {item.registered}</p>
            <div className='btns-card'>
              <button className='btn-update' onClick={()=> navigate(`/update/${item.id}`)}>Actualizar torneo</button>
            </div>           
          </div>
        })}  

      </div>
    </div>
  );
};

export default AdminPage;
