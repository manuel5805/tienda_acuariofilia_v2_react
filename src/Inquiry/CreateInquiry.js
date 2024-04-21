import React, { useState } from 'react';


import '../css/RegisterForm.css';
const CreateInquiry = ({ storedToken }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Duda');
    const [description, setDescription] = useState('');
    const [inquiryImage, setInquiryImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    };
  
    const handleCategoryChange = (e) => {
      setCategory(e.target.value);
    };
  
    const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
    };
  
    const handleInquiryImageChange = (e) => {
      const file = e.target.files[0]; 
      setInquiryImage(file);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const formData = new FormData();
      formData.append('user_id', storedToken);
      formData.append('title', title);
      formData.append('category', category);
      formData.append('img_inquiry', inquiryImage);
      formData.append('state', 'Abierto');
      formData.append('description', description);
      
      try {
        const response = await fetch('http://localhost:8000/api/inquiries/store', {
          method: 'POST',
         
          body: formData,
        });
    
        if (response.ok) {
          console.log('Consulta creada exitosamente'); 
        } else {
          setErrorMessage('Error al crear la consulta');
          console.error('Error en la solicitud'); 
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };
    
    console.log('Valor de storedToken:', storedToken);
    return (
      <div className="register-container">
        <h2>¿Qué duda tienes?</h2>
        
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label>Título:</label>
            <input name="title" type="text" value={title} onChange={handleTitleChange} required />
          </div>
          <div className="form-group">
            <label>Categoría:</label>
            <select name="category" value={category} onChange={handleCategoryChange}>
              <option value="Duda">Duda</option>
              <option value="Ayuda">Ayuda</option>
              <option value="Debate">Debate</option>
            </select>
          </div>      
          <div className="form-group-full">
            <label>Descripción:</label>
            <textarea name="description" rows="6" cols="60" value={description} onChange={handleDescriptionChange}></textarea>
          </div>  
          <div className="form-group-full">
            <label>Imagen de consulta:</label>
            <input type="file" name="img_inquiry" accept="image/*" onChange={handleInquiryImageChange} />
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button id="boton_registrar" type="submit">Crear</button>
        </form>
      </div>
    );
  };
  
  export default CreateInquiry;
  