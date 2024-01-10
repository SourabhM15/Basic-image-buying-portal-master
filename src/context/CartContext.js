
import React, { createContext, useContext, useState, useEffect } from 'react';
import image1 from '../images/blue_marigold.jpeg';
import image2 from '../images/hibiscus.jpeg';
import image3 from '../images/jasmine.jpeg';
import image4 from '../images/lotus.jpeg';
import image5 from '../images/marigold.jpeg';
import image6 from '../images/pink_marigold.jpeg';
import image7 from '../images/rose.jpeg';
import image8 from '../images/sunflower.jpeg';
import image9 from '../images/tulip.jpeg';
import image10 from '../images/white_rose.jpeg';

const CartContext = createContext();




export const CartProvider = ({ children }) => {
    const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
    // const [cartUpdateFlag, setCartUpdateFlag] = useState(false);
    // const [cart, setCart] = useState([]);
    // const [products, setProducts] = useState([]);


  const initialProducts = [
    { id: 1, name: 'Image 1', price: 10, quantity: 0, image: image1 },
    { id: 2, name: 'Image 2', price: 15, quantity: 0, image: image2 },
    { id: 3, name: 'Image 2', price: 15, quantity: 0, image: image3 },
    { id: 4, name: 'Image 2', price: 15, quantity: 0, image: image4 },
    { id: 5, name: 'Image 2', price: 15, quantity: 0, image: image5 },
    { id: 6, name: 'Image 2', price: 15, quantity: 0, image: image6 },
    { id: 7, name: 'Image 2', price: 15, quantity: 0, image: image7 },
    { id: 8, name: 'Image 2', price: 15, quantity: 0, image: image8 },
    { id: 9, name: 'Image 2', price: 15, quantity: 0, image: image9 },
    { id: 10, name: 'Image 2', price: 15, quantity: 0, image: image10 },
  ];

const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products')) || []);
  const [cartUpdateFlag, setCartUpdateFlag] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);




  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      // Update quantity if item already exists
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      );
    } else {
      // Add new item to cart with quantity 1
      setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };



  const removePurchasedItemsFromHome = () => {
    // Identify the IDs of purchased items
    const purchasedItemIds = cart.map((item) => item.id);
  
    // Remove purchased items from the products state
    const updatedProducts = products.filter((product) => !purchasedItemIds.includes(product.id));
  
    // Update the products state
    updateProducts(updatedProducts);
  };
  
  
  const updateProducts = (updatedProducts) => {
    setProducts(updatedProducts);
    // Trigger a re-render by updating the flag
    setCartUpdateFlag((prevFlag) => !prevFlag);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, removePurchasedItemsFromHome, updateProducts, products, cartUpdateFlag, setCartUpdateFlag }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};