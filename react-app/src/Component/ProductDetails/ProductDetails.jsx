import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setProduct(null);
    setError(null);

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Product not found or server error.");
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <img 
          src="https://cdn-icons-png.flaticon.com/512/7486/7486800.png" 
          alt="Error" 
          style={{ width: "150px", marginBottom: "20px" }} 
        />
        <h2>Oops! Something went wrong.</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;
  }

  return (
    <div className="product-details" style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} style={{ maxWidth: "300px" }} />
      <p>{product.description}</p>
      <p><strong>Price:</strong> ₹{product.price}</p>
    </div>
  );
};

export default ProductDetails;
