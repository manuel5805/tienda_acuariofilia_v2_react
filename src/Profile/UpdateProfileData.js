import React, { useState } from 'react';
import '../css/UserProfile.css';

const UpdateProfileData = ({ storedToken }) => {
  const [userData, setUserData] = useState({
    email: '',
    address: '',
    name: '',
    last_name: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/users/update/${storedToken}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
    
      
      } else {

        console.error('Error en la solicitud');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className='main_container'>
      <div className="information">
        <nav className="nav_information">
          <ul className='profile_list'>
            <li className='links_list'><a href="http://localhost:3000/user/profile">Informacion</a></li>
            <li className='links_list'><a href="http://localhost:3000/user/profile/orders">Pedidos</a></li>
            <li className='links_list'><a href="http://localhost:3000/user/profile/update_data">Actualizar datos</a></li>
          </ul>
        </nav>
      </div>
      <div className='content'> 
        <div className='information_user'> 
          <h2>Actualizar datos de la cuenta</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="direccion">Dirección:</label>
              <input type="text" id="direccion" name="address" value={userData.address} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" id="nombre" name="name" value={userData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="apellido">Apellido:</label>
              <input type="text" id="apellido" name="last_name" value={userData.last_name} onChange={handleChange} />
            </div>
            <button id="boton_update" type="submit">Actualizar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileData;
