import React, { useEffect, useState } from "react";
import { loadCartFromServer, saveCartToServer } from "../../utils/cartHelper";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?._id) {
      loadCartFromServer(user._id).then(setCartItems);
    } else {
      const stored = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(stored);
    }
  }, []);

  const updateLocalAndServerCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    if (user?._id) saveCartToServer(user._id, updatedCart);
  };

  const handleQuantityChange = (index, delta) => {
    const updated = [...cartItems];
    updated[index].quantity = Math.max(1, updated[index].quantity + delta);
    updateLocalAndServerCart(updated);
  };

  const handleRemove = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    updateLocalAndServerCart(updated);
  };

  const getTotalAmount = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const deliveryCharge = getTotalAmount() < 100 ? 50 : 0;
  const finalAmount = getTotalAmount() + deliveryCharge;

  const handleCheckout = () => {
    navigate('/address', { state: { amountToPay: finalAmount } });

  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <h2 style={{ marginBottom: "20px", color: "#1976d2" }}>🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p style={{ fontSize: "18px" }}>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "15px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <div style={{ marginLeft: "20px" }}>
                  <h4 style={{ margin: "0 0 10px" }}>{item.name}</h4>
                  <p style={{ margin: "0", fontWeight: "bold", color: "#333" }}>₹{item.price}</p>
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "10px"
                }}>
                  <button onClick={() => handleQuantityChange(index, -1)} style={quantityButtonStyle}>-</button>
                  <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(index, 1)} style={quantityButtonStyle}>+</button>
                </div>
                <button
                  onClick={() => handleRemove(index)}
                  style={removeButtonStyle}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div style={{
            textAlign: "right",
            borderTop: "1px solid #ccc",
            paddingTop: "20px",
            marginTop: "30px",
          }}>
            <h3>Total Price: ₹{getTotalAmount()}</h3>
            <h4>Delivery Charges: ₹{deliveryCharge}</h4>
            <h2 style={{ marginBottom: "20px", color: "#2e7d32" }}>Final Amount: ₹{finalAmount}</h2>
            <button
              onClick={handleCheckout}
              style={checkoutButtonStyle}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#115293")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#1976d2")}
            >
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const quantityButtonStyle = {
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  backgroundColor: "#eee",
  border: "1px solid #ccc",
  fontWeight: "bold",
  cursor: "pointer",
};

const removeButtonStyle = {
  backgroundColor: "#ff4d4d",
  color: "white",
  padding: "8px 16px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
};

const checkoutButtonStyle = {
  backgroundColor: "#1976d2",
  color: "#fff",
  padding: "12px 25px",
  fontSize: "16px",
  fontWeight: "bold",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

export default Cart;
