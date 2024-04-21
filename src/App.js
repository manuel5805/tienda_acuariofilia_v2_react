import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LoginForm from './Login/LoginForm';
import RegisterForm from './Login/RegisterForm';
import Header from './Header';
import UserProfile from './Profile/UserProfile';
import UserProfileOrder from './Profile/UserProfileOrder';
import UserProfileOrderPlus from './Profile/UserPorfileOrderPlus';
import UpdateProfileData from './Profile/UpdateProfileData';
import Inquiries from './Inquiry/Inquiries';
import CreateInquiry from './Inquiry/CreateInquiry';
import ShowInquiry from './Inquiry/ShowInquiry';
import HomeProducts from './Products/HomeProducts';
import ViewProduct from './Products/ViewProduct';
import CarShop from './Products/CarShop';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [storedToken, setStoredToken] = React.useState('');
  const [storedShopCar, setStoredShopCar] = React.useState('');

  useEffect(() => {
    const token   = localStorage.getItem('token');
    const shopCar = localStorage.getItem('savedProducts');
    if (token !== null) {
      setIsAuthenticated(true);
      setStoredToken(token);
      setStoredShopCar(shopCar);
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('savedProducts');
    setIsAuthenticated(false);
    
  };

  
  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
      <Route path="/" element={<HomeProducts storedToken={storedToken}   />}/>
        <Route path="/user/login" element={<LoginForm   />}/>
        <Route path="/user/register" element={<RegisterForm />} />
        <Route path="/user/profile" element={<UserProfile storedToken={storedToken} />} />
        <Route path="/user/profile/orders" element={<UserProfileOrder storedToken={storedToken} />} />
        <Route path="/user/profile/orders/:orderId/info" element={<UserProfileOrderPlus storedToken={storedToken} />} />
        <Route path="/user/profile/update_data" element={<UpdateProfileData storedToken={storedToken} />} />
        <Route path="/Inquiries" element={<Inquiries storedToken={storedToken}   />}/>
        <Route path="/Inquiries/create" element={<CreateInquiry storedToken={storedToken} />}/>
        <Route path="/Inquiries/show/:inquiryId" element={<ShowInquiry storedToken={storedToken} />} />
        <Route path="/products/show/:productId" element={<ViewProduct storedToken={storedToken} />} />
        <Route path="/car_shop" element={<CarShop storedToken={storedToken} storedShopCar={storedShopCar}/>}/>
      </Routes>
    </Router>
  );
};

export default App;
