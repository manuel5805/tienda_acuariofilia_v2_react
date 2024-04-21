import React, { useEffect,useState  } from 'react';
import '../css/CarShop.css';

const CarShop = ({ storedToken,storedShopCar }) => { 
    const [shopCarData, setShopCarData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [orderId, setOrderId] = useState('');

useEffect(() => {
  try {
    const parsedShopCarData = JSON.parse(storedShopCar || '[]');
    const shopCarDataWithQuantity = parsedShopCarData.map(product => ({ ...product, quantity: 1 }));
    setShopCarData(shopCarDataWithQuantity);
  } catch (error) {
    console.error('Error parsing JSON data:', error);
  }
}, [storedShopCar]);

  const handleDelete = (productId) => {
    const updatedShopCarData = shopCarData.filter((product) => product.id !== productId);
    setShopCarData(updatedShopCarData);
    
    console.log('Producto eliminado:', productId);
  };

  const handleIncrement = (productId) => {
    const updatedShopCarData = shopCarData.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setShopCarData(updatedShopCarData);

    console.log('Cantidad incrementada para el producto:', productId);
  };

  const handleDecrement = (productId) => {
    const updatedShopCarData = shopCarData.map((product) => {
      if (product.id === productId && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    setShopCarData(updatedShopCarData);
    
    console.log('Cantidad decrementada para el producto:', productId);
  };


  const handleConfirmOrder = async (shopCarData) => { 
    const orderData = {
        user_id: storedToken,
        total: totalPrice,
        num_products: shopCarData.length,
        address: 'Calle rincon de ademuz',
      };

      try {
        const response = await fetch('http://localhost:8000/api/orders/store', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });

        if (response.ok) {
          const data = await response.json();
          setOrderId(data.id);
          alert('Orden creada correctamente');
          console.log('Respuesta del servidor:', data);
        
        } 
        else {
          setErrorMessage('Los datos son invalidos');
          console.error('Error en la solicitud');
        }
      } 
      catch (error) {
        console.error('Error fetching order data:', error);
      }
  }

  const handleOrder = async (shopCarData,orderId) => { 
      try {
        const productData = shopCarData.map((product) => ({
          product_id: product.id,
          quantity: product.quantity,
        }));
      
        const requestData = {
          products: productData,
        };
      
        const response = await fetch(`http://localhost:8000/api/orders/${orderId}/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
      
        if (response.ok) {
          const data2 = await response.json();
          console.log('Respuesta del servidor:', data2);
          localStorage.removeItem('savedProducts');
        } else {
          setErrorMessage('Los datos son inválidos');
          console.error('Error en la solicitud');
        }
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
  }


  const totalPrice = shopCarData.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    console.log(shopCarData);
    return (
      <div className='car_shop_main_container'>
        <h2>Productos en el carrito de compras:</h2>
        <div className='car_shop_table_container'>
          <table id = "car_shop_list">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {shopCarData.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                  <button onClick={() => handleDecrement(product.id)}>-</button>
                  <button onClick={() => handleIncrement(product.id)}>+</button>
                  </td>
                  <td>
                  <button onClick={() => handleDelete(product.id)}>Eliminar</button>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
          <p id='total_car_shop'>Total: {totalPrice.toFixed(2)}</p>
          <div><button id="boton_car_shop" onClick={() => handleConfirmOrder(shopCarData)}>Confirmar pedido</button></div>
          <div><button id="boton_car_shop" onClick={() => handleOrder(shopCarData,orderId)}>Comprar</button></div>
        </div>
      </div>
      </div>
    );

};

export default CarShop;