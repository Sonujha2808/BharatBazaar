// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "./ProductDetails.css"
// const ProductDetails = () => {
//   const { productId } = useParams(); // make sure the route is set as /product/:id
//   const [product, setProduct] = useState(null);
//   const [error, setError] = useState(null);

//   const fetchProduct = async () => {
//     try {
//       // Add check for id
//       if (!productId) {
//         throw new Error('Product ID is missing');
//       }
      
//       const response = await fetch(`http://localhost:5000/api/products/${productId}`);

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       setProduct(data);
//     } catch (err) {
//       console.error("Error fetching product:", err);
//       setError(err.message || "Product not found or server error.");
//     }
//   };

//   useEffect(() => {
//     fetchProduct();
//   }, [productId]); // Correctly depends on id parameter

//   if (error) {
//     return <div className="error-message">Error: {error}</div>;
//   }

//   if (!product) {
//     return <div className="loading">Loading...</div>;
//   }

//   return (
//     <div className="product-details">
//       <h2>{product.name}</h2>
//       <img 
//         src={product.imageUrl} 
//         alt={product.name} 
//         style={{ maxWidth: "300px" }} 
//         onError={(e) => {
//           e.target.onerror = null;
//           e.target.src = "/fallback-image.jpg";
//         }}
//       />
//       <p>{product.description}</p>
//       <p>Price: ₹{product.price}</p>
//     </div>
//   );
// };

// export default ProductDetails;







import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  //const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      if (!productId) throw new Error("Product ID is missing");

      const response = await fetch(`https://bharatbazaar-45ug.onrender.com/api/products/${productId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setProduct(data);
    } catch (err) {
      console.error("Error fetching product:", err);
      setError(err.message || "Product not found or server error.");
    }
  };
const handleAddToCart = () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart.find(item => item._id === product._id)) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("✅ Added to Cart!");
  } else {
    toast.info("ℹ️ Product already in cart!");
  }
  
};

const handleAddToWishlist = () => {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (!wishlist.find(item => item._id === product._id)) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    toast.success("💖 Added to Wishlist!");
  } else {
    toast.info("ℹ️ Product already in wishlist!");
  }
};

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  if (error) return <div className="error-message">Error: {error}</div>;
  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-details-container">
      <div className="product-image-section">
        <img
          src={product.imageUrl}
          alt={product.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/fallback-image.jpg";
          }}
        />
      </div>

      <div className="product-info-section">
        <h1>{product.name}</h1>
        <p className="product-description">{product.description}</p>
        <h2 className="product-price">₹{product.price}</h2>

        <div className="product-buttons">
          <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
          <button className="add-to-wishlist" onClick={handleAddToWishlist}>❤️ Wishlist</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
