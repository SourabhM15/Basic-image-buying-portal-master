import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Grid, Typography } from "@mui/material";
import "./Homepage.css";
import { useEffect } from "react";



const Home = () => {

    const { addToCart, updateProducts, products, setCartUpdateFlag, cartUpdateFlag } = useCart();


  const handleAddToCart = (product) => {
    const updatedProducts = products.map((p) => {
      if (p.id === product.id) {
        return { ...p, quantity: p.quantity + 1 };
      }
      return p;
    });

    // Update the products in the context
    updateProducts(updatedProducts);
    // Trigger a re-render by updating the flag
    setCartUpdateFlag((prevFlag) => !prevFlag);

    addToCart({ ...product, quantity: product.quantity + 1 });
  };
;

  return (
    <Grid container key={cartUpdateFlag}>
      <Grid item container xs={12} justifyContent={"center"}>
        <Typography variant="h3">Welcome to the Image Store</Typography>
      </Grid>
      <Grid
        item
        container
        className="product-container"
        xs={12}
        justifyContent={"center"}
      >
        {products.map((product) => (
          <Grid
            key={product.id}
            className="product-item"
            justifyContent={"center"}
          >
            <img src={product.image} alt={product.name} />
            <Grid item container justifyContent={"space-between"}>
              <p>{product.name}</p>
              <p>Price: ${product.price}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="add-to-cart-btn"
              >
                Add to Cart
              </button>
            </Grid>
            <span>Quantity: {product.quantity}</span>
          </Grid>
        ))}
      </Grid>
      <Grid marginTop={"10vh"} item container justifyContent={"center"}>
        <Link to="/cart">
          <Typography variant="h6"> Go to Cart </Typography>
        </Link>{" "}
      </Grid>
    </Grid>
  );
};

export default Home;
