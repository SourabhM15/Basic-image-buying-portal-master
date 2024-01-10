
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';


const App = () => {
  return (
    <BrowserRouter basename="/Basic-image-buying-portal-master"> 
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home  />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
    </BrowserRouter>
  );
};

export default App;
