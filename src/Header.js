import React from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';

const Header = ({ isAuthenticated, handleLogout}) => {
  return (
    <header>
      <nav>
        <ul>
          {isAuthenticated ? (
            <>
              <li className='links_header'><Link to="/user/profile">Perfil</Link></li>
              <li className='links_header'><Link to="/">Inicio</Link></li>
              <li className='links_header'><Link to="/inquiries">Conusltas</Link></li>
              <li className='links_header'><Link to="/car_shop">Mis pedidos</Link></li>
              <li className='links_header'><button id="boton_cerrar" onClick={handleLogout}>Cerrar sesión</button></li>
            </>
          ) : (
            <>
              
              <li className='links_header'><Link to="/">Inicio</Link></li>
              <li className='links_header'><Link to="/inquiries">Conusltas</Link></li>
              <li className='links_header'><Link to="/user/login">Iniciar sesión</Link></li>
              <li className='links_header'><Link to="/user/register">Registro</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
