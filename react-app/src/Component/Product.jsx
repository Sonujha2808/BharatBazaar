

import { useEffect, useState } from "react";
import axios from "axios";

// Utility functions for localStorage
const loadFromStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(loadFromStorage("cart"));
  const [wishlist, setWishlist] = useState(loadFromStorage("wishlist"));

  useEffect(() => {
    axios.get("https://bharatbazaar-45ug.onrender.com/api/products/all")
      .then((res) => {
        console.log("✅ Products received:", res.data);
        setProducts(res.data.products || []); // res.data.products expected
      })
      .catch((err) => console.error("❌ Error fetching products:", err));
  }, []);

  useEffect(() => {
    saveToStorage("cart", cart);
  }, [cart]);

  useEffect(() => {
    saveToStorage("wishlist", wishlist);
  }, [wishlist]);

  const handleAddToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);
    if (!exists) {
      setCart([...cart, product]);
      alert(`${product.name} added to cart!`);
    } else {
      alert(`${product.name} is already in cart.`);
    }
  };

  const handleAddToWishlist = (product) => {
    const exists = wishlist.find((item) => item._id === product._id);
    if (!exists) {
      setWishlist([...wishlist, product]);
      alert(`${product.name} added to wishlist!`);
    } else {
      alert(`${product.name} is already in wishlist.`);
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      <div className="product-grid" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.length === 0 ? (
          <p>⚠ No products available</p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="product-card"
              style={{ border: "1px solid #ccc", padding: "15px", width: "220px", textAlign: "center" }}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                width="200px"
                height="150px"
                style={{ objectFit: "cover" }}
                onError={(e) => {
                  e.target.src = "/fallback-image.jpg";
                  console.error("❌ Image failed to load:", product.imageUrl);
                }}
              />
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Price: ₹{product.price}</p>
              <button onClick={() => handleAddToCart(product)} style={{ margin: "5px" }}>
                🛒 Add to Cart
              </button>
              <button onClick={() => handleAddToWishlist(product)} style={{ margin: "5px" }}>
                ❤️ Add to Wishlist
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
