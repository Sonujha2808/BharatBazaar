import axios from "axios";

// Save cart to backend
export const saveCartToServer = async (userId, cart) => {
  try {
    await axios.post("https://bharatbazaar-45ug.onrender.com/api/cart/save", { userId, cart });
  } catch (error) {
    console.error("Error saving cart:", error.message);
  }
};

// Load cart from backend
export const loadCartFromServer = async (userId) => {
  try {
    const res = await axios.get(`https://bharatbazaar-45ug.onrender.com/api/cart/load/${userId}`);
    return res.data.cart || [];
  } catch (error) {
    console.error("Error loading cart:", error.message);
    return [];
  }
};
