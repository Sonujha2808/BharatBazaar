


// import React from "react";
// import './index.css';
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import Header from "./Component/Header/Header";
// import Footer from "./Component/Footer/Footer";
// import CategorySlider from "./Component/Category/Category";
// import CategoryPage from "./Component/CategoryPage";
// import AdminPanel from "./Component/Admin/AdminPanel";
// import FeaturesSection from "./Component/Features/Features";
// import Cart from "./Component/cart/Cart";
// import Wishlist from "./Component/Wishlist/Wishlist";
// import ThankYou from "./Component/ThankYou/ThankYou";
// import PromoSlider from "./Component/PromoSlider/PromoSlider";
// import NewArrivals from "./Component/NewArrivals/NewArrival";
// import ProductDetails from "./Component/ProductDetails/ProductDetails";
// import AddressPage from "./Component/Address/AddressPage";
// import PaymentPage from "./Component/Payment/PaymentPage";
// import { motion, AnimatePresence } from "framer-motion";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Layout() {
//   const location = useLocation();

//   const hideLayoutRoutes = ["/admin", "/address", "/payment", "/cart", "/wishlist", "/thankyou"];
//   const isCategoryPage = location.pathname.startsWith("/category/");
//   const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

//   return (
//     <div className="app-container">
//       {!shouldHideLayout && <Header />}
//       {!shouldHideLayout && !isCategoryPage && <PromoSlider />}

//       <AnimatePresence mode="wait">
//         <motion.div
//           key={location.pathname}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Routes location={location} key={location.pathname}>
//             <Route path="/" element={<CategorySlider />} />
//             <Route path="/category/:category" element={<CategoryPage />} />
//             <Route path="/product/:productId" element={<ProductDetails />} />
//             <Route path="/admin" element={<AdminPanel />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/wishlist" element={<Wishlist />} />
//             <Route path="/thankyou" element={<ThankYou />} />
//             <Route path="/address" element={<AddressPage />} />
//             <Route path="/payment" element={<PaymentPage />} />
//           </Routes>
//         </motion.div>
//       </AnimatePresence>

//       {!shouldHideLayout && !isCategoryPage && <NewArrivals />}
//       {!shouldHideLayout && !isCategoryPage && <FeaturesSection />}
//       {!shouldHideLayout && <Footer />}
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Layout />
//       <ToastContainer />
//     </Router>
//   );
// }

// export default App;


import React, { useEffect, useState } from "react";
import './index.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";
import CategorySlider from "./Component/Category/Category";
import CategoryPage from "./Component/CategoryPage";
import AdminPanel from "./Component/Admin/AdminPanel";
import FeaturesSection from "./Component/Features/Features";
import Cart from "./Component/cart/Cart";
import Wishlist from "./Component/Wishlist/Wishlist";
import ThankYou from "./Component/ThankYou/ThankYou";
import PromoSlider from "./Component/PromoSlider/PromoSlider";
import NewArrivals from "./Component/NewArrivals/NewArrival";
import ProductDetails from "./Component/ProductDetails/ProductDetails";
import AddressPage from "./Component/Address/AddressPage";
import PaymentPage from "./Component/Payment/PaymentPage";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginModal from "./Component/Login/LoginModal";

function Layout() {
  const location = useLocation();
  // const [showModal, setShowModal] = useState(false);
  // const [showModal, setShowModal] = useState(false); // if only setter is used

  // useEffect(() => {
  //   if (!localStorage.getItem("user")) {
  //     setShowModal(true);
  //   }
  // }, []);

// Example fix for unused var:
const [showModal, setShowModal] = useState(false); // <- if unused, remove

// Example fix for missing useEffect dependency:
useEffect(() => {
  fetchProduct();
}, [fetchProduct]); // <- add fetchProduct as dependency




  const hideLayoutRoutes = ["/admin", "/address", "/payment", "/cart", "/wishlist", "/thankyou"];
  const isCategoryPage = location.pathname.startsWith("/category/");
  const isProductPage = location.pathname.startsWith("/product/");
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname) || isProductPage;

  return (
    <div className="app-container">
      {!hideLayoutRoutes.includes(location.pathname) && <Header />}

      {!shouldHideLayout && !isCategoryPage && <PromoSlider />}

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<CategorySlider />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route
              path="/address"
              element={
                localStorage.getItem("user") ? (
                  <AddressPage />
                ) : (
                  <LoginModal closeModal={() => setShowModal(false)} />
                )
              }
            />
            <Route
              path="/payment"
              element={
                localStorage.getItem("user") ? (
                  <PaymentPage />
                ) : (
                  <LoginModal closeModal={() => setShowModal(false)} />
                )
              }
            />
          </Routes>
        </motion.div>
      </AnimatePresence>

      {!shouldHideLayout && !isCategoryPage && <NewArrivals />}
      {!shouldHideLayout && !isCategoryPage && <FeaturesSection />}
      {!hideLayoutRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
      <ToastContainer />
    </Router>
  );
}

export default App;
