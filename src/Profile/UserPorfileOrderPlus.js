import React, { useEffect,useState  } from 'react';
import { useParams } from 'react-router-dom';
import '../css/UserProfile.css'

const UserProfileOrderPlus = ({ storedToken }) => {
const [userData, setUserData] = useState(null);
const { orderId } = useParams();
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/orders/read/products/${orderId}`, {
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
              <h2> Productos del pedido : {orderId} </h2>
          <table id = "orders_list">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>Precio</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {userData &&
                userData.map((userData, index) => (
                  <tr key={index}>
                    <td>{userData && userData.name}</td>
                    <td>{userData && userData.category}</td>
                    <td>{userData && userData.price}</td>
                    <td>{userData && userData.pivot.quantity}</td>
                  </tr>
                ))}
            </tbody>
        </table>
          </div>
        </div>
    </div>
      
     
  );
};

export default UserProfileOrderPlus;
