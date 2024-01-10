
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Grid, Typography, Container } from "@mui/material";
import "./Homepage.css";
import { useEffect } from "react";

const CartPage = () => {
  const { cart, removeFromCart, clearCart, removePurchasedItemsFromHome } =
    useCart();

  const handleRemove = (item) => {
    removeFromCart(item.id);
  };

  const handleContinueShopping = () => {
    // Implement redirection to home page
  };

  const handlePay = () => {
    const confirmation = window.prompt(
      "Are you sure you want to buy these images? (Yes/No)"
    );
  
    if (confirmation && confirmation.toLowerCase() === "yes") {
      window.alert("Congratulations! The images belong to you.");
  
      // Clear the cart first
      clearCart();
  
      // Remove purchased items from Home page
      removePurchasedItemsFromHome();

    } else {
      window.alert("Payment cancelled. The images are still in your cart.");
    }
  };
  
  
  

  

  return (
    <Grid>
      <Typography variant="h3">Your Cart</Typography>
      <Grid item container className="product-container" justifyContent={'center'}>
        {cart.map((item) => (
          <Grid key={item.id} className="product-item">
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => handleRemove(item)} className="remove-btn">
              Remove
            </button>
          </Grid>
        ))}
      </Grid>
      <Grid marginTop={'5vh'} item container justifyContent={'center'} >
        <Link to="/">
          <button
            onClick={handleContinueShopping}
            className="product-item button"
          >
            Return to Home Page..!
          </button>
        </Link>
        <button onClick={handlePay} className="product-item button">
          Pay
        </button>{" "}
      </Grid>
    </Grid>
  );
};

export default CartPage;
