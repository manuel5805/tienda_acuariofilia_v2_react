import React, { useEffect,useState  } from 'react';
import '../css/UserProfile.css'

const UserProfile = ({ storedToken }) => {
const [userData, setUserData] = useState(null);

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/users/read/${storedToken}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          console.log(data);
        } else {
          console.error('Error fetching user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    if (storedToken) {
      fetchUserData();
    }
  }, [storedToken]);
  

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
              <h2> Informacion de la cuenta </h2>
              <div id='credentials_user'>
                <div>Nombre: {userData && userData.name}</div>
                <div>Apellidos: {userData && userData.last_name}</div>
                <div>Dirrecion de envios: {userData && userData.address}</div>
                <div>Email: {userData && userData.email} </div>
              </div>
          </div>
        </div>
    </div>
      
     
  );
};

export default UserProfile;
