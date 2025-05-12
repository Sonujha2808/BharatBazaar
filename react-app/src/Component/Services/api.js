// import axios from "axios";

// const API_URL = "https://bharatbazaar-45ug.onrender.com/api/products";

// // ✅ Upload product (Admin)
// export const uploadProduct = async (product) => {
//   try {
//     const formData = new FormData();
//     formData.append("name", product.name);
//     formData.append("category", product.category); // No need to convert to lowercase, backend will handle it
//     formData.append("description", product.description);
//     formData.append("price", product.price);
//     formData.append("image", product.image);

//     const response = await axios.post(`${API_URL}`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Error uploading product:", error.response?.data || error.message);
//     return { success: false, error: error.response?.data || error.message };
//   }
// };

// // ✅ Fetch all products
// export const getAllProducts = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/all`);
//     return response.data.products || [];
//   } catch (error) {
//     console.error("Error fetching all products:", error.response?.data || error.message);
//     return [];
//   }
// };

// // ✅ Fetch products by category
// export const getProductsByCategory = async (category) => {
//   try {
//     const encodedCategory = encodeURIComponent(category); // Ensure correct URL encoding
//     console.log("Fetching category:", category); // Debugging
//     console.log(`${API_URL}?category=${encodedCategory}`);
//     const response = await axios.get(`${API_URL}?category=${encodedCategory}`);
//     console.log(response);
//     console.log("API Response:", response.data); // Debugging

//     return response.data.products || [];
//   } catch (error) {
//     console.error("Error fetching products by category:", error.response?.data || error.message);
//     return [];
//   }
// };

// export default {
//   uploadProduct,
//   getAllProducts,
//   getProductsByCategory,
// };




import axios from "axios";

const API_URL = "https://bharatbazaar-45ug.onrender.com/api/products";

// ✅ Upload product (Admin)
export const uploadProduct = async (product) => {
  try {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("category", product.category); // Backend handles lowercase
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("image", product.image);

    const response = await axios.post(`${API_URL}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading product:", error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

// ✅ Fetch all products
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data.products || [];
  } catch (error) {
    console.error("Error fetching all products:", error.response?.data || error.message);
    return [];
  }
};

// ✅ Fetch products by category
export const getProductsByCategory = async (category) => {
  try {
    const encodedCategory = encodeURIComponent(category); // Proper URL encoding
    const response = await axios.get(`${API_URL}?category=${encodedCategory}`);
    return response.data.products || [];
  } catch (error) {
    console.error("Error fetching products by category:", error.response?.data || error.message);
    return [];
  }
};

// ✅ Assign object first, then export
const api = {
  uploadProduct,
  getAllProducts,
  getProductsByCategory,
};

export default api;
