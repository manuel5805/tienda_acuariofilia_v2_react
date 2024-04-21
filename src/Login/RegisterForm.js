import React, { useState } from 'react';

import '../css/RegisterForm.css';
const RegisterForm = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0]; 
    setProfileImage(file);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('last_name', lastName);
    formData.append('address', address);
    formData.append('role', 'User');
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profile_image', profileImage);
    
    try {
    const response = await fetch('http://localhost:8000/api/users/store', {
      method: 'POST',
     
      body: formData,
    });

  
    if (response.ok) {
      console.log('Registro exitoso'); 
    } else {
      setErrorMessage('Error al registrar usuario');
      console.error('Error en la solicitud'); 
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
 
  };
  
  

  return (
    <div className="register-container">
      <h2>Regístrate</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Nombre:</label>
          <input type="text" value={name} onChange={handleNameChange} required />
        </div>
        <div className="form-group">
          <label>Apellido:</label>
          <input type="text" value={lastName} onChange={handleLastNameChange} required />
        </div>      
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <div className="form-group-full">
          <label>Dirección:</label>
          <input type="text" value={address} onChange={handleAddressChange}  />
        </div>  
        <div className="form-group-full">
          <label>Imagen de perfil:</label>
          <input type="file" name="profile_image" accept="image/*" onChange={handleProfileImageChange} />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button id="boton_registrar" type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterForm;
