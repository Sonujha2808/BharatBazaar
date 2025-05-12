
import React, { useState } from "react";
import { uploadProduct } from "../Services/api";
import "./AdminPanel.css"; // If you have custom styles

const AdminPanel = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState("");

  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    image: null,
  });

  const categories = ["Laptop", "Phone", "Watch", "Camera", "Headphone", "Video Game"];

  const handlePinSubmit = (e) => {
    e.preventDefault();
    const secretPin = "1234567890"; // 🔒 Set your security pin here
    if (pin === secretPin) {
      setAuthenticated(true);
    } else {
      alert("Incorrect PIN! Access Denied.");
      setPin(""); // Clear pin input
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.name || !product.category || !product.price || !product.image) {
      alert("Please fill all fields before submitting!");
      return;
    }

    console.log("Submitting Product:", product);
    const result = await uploadProduct(product);

    if (result.success) {
      alert("Product uploaded successfully!");
      setProduct({
        name: "",
        category: "",
        description: "",
        price: "",
        image: null,
      });

      document.querySelector('input[type="file"]').value = "";
    } else {
      alert("Error uploading product: " + result.error);
    }
  };

  if (!authenticated) {
    // 👉 Show PIN form
    return (
      <form onSubmit={handlePinSubmit} className="admin-form">
        <h2>Enter Admin Security PIN</h2><br/>
        <input
          type="password"
          placeholder="Enter PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          required
        /><br/><br/>
        <button type="submit">Submit</button>
      </form>
    );
  }

  return (
    // 👉 Show Admin Panel only after correct PIN
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="admin-form">
      <h2>Admin Product Upload</h2>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        required
      />

      <select
        name="category"
        value={product.category}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <textarea
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
      />

      <button type="submit">Upload Product</button>
    </form>
  );
};

export default AdminPanel;
