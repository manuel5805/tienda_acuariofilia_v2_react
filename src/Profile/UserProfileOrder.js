import React, { useEffect,useState  } from 'react';
import '../css/UserProfile.css'

const UserProfileOrder = ({ storedToken }) => {
const [userData, setUserData] = useState(null);

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/orders/read/${storedToken}`, {
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
              <h2> Pedidos realizados</h2>
          <table id = "orders_list">
            <thead>
              <tr>
                <th>Id</th>
                <th>Total</th>
                <th>Num productos</th>
                <th>Dirección</th>
                <th>Fecha</th>
                <th>Ver mas</th>
              </tr>
            </thead>
            <tbody>
              {userData &&
                userData.map((userData, index) => (
                  <tr key={index}>
                    <td>{userData && userData.id}</td>
                    <td>{userData && userData.total}</td>
                    <td>{userData && userData.num_products}</td>
                    <td>{userData && userData.address}</td>
                    <td>{userData && userData.created_at}</td>
                    <td><a href={`/user/profile/orders/${userData && userData.id}/info`}>Informacion del pedido</a></td>
                  </tr>
                ))}
            </tbody>
        </table>
          </div>
        </div>
    </div>
      
     
  );
};

export default UserProfileOrder;
