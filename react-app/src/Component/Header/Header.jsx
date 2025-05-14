



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaBars } from "react-icons/fa";
import "./Header.css";
import LoginModal from "../Login/LoginModal";
import userIcon from "../../Assets/profile.gif";
import userIcon2 from "../../Assets/search.gif";
import logo from "../../Assets/logo.png";
import { useUser } from "../UserContext"; // Import context
import { toast } from "react-toastify"; // Import toast
import { Link } from "react-router-dom";



import { Link as ScrollLink } from 'react-scroll';



const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [_, setShowCartDropdown] = useState(false);
  const [__, setShowWishlistDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useUser(); // Use context

  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logout successful!", {
      position: "top-center",
      autoClose: 2000,
      pauseOnHover: true,
      theme: "colored",
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // toggle between true and false
  };

  const closeMenu = () => {
    setIsMenuOpen(false); // Close menu when a nav link is clicked
  };

  return (
    <>
      <header className="header">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" />
          <span>BharatBazaar</span>
        </div>

        <FaBars className="hamburger" onClick={toggleMenu} />

        <nav className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <a href="" onClick={() => { closeMenu(); navigate("/"); }}>Home</a>
          <ScrollLink to="category-section"  smooth={true}  duration={500}
            onClick={() => {
            closeMenu();
            setTimeout(() => {
            document.getElementById("category-section")?.scrollIntoView({ behavior: "smooth" });
           }, 100);}}>Category
           </ScrollLink>

        <a href="/coming" onClick={() => { closeMenu(); navigate("/about"); }}>About Us</a>
        <a href="/coming" onClick={() => { closeMenu(); navigate("/faq"); }}>FAQ</a>
        <Link to="/admin" onClick={closeMenu}>Admin</Link>
        <ScrollLink to="footer-section" smooth={true}
          duration={500} onClick={() => {    closeMenu();
          setTimeout(() => {
          document.getElementById("footer-section")?.scrollIntoView({ behavior: "smooth" });
           }, 100); // Wait for menu to collapse
          }}>  Contact
         </ScrollLink>

        </nav>

        <div className="header-icons">
          <img src={userIcon2} alt="Search" className="icon user-gif" />

          {/* Wishlist */}
          <div
            className="icon-wrapper"
            onClick={() => navigate("/wishlist")}
            onMouseEnter={() => setShowWishlistDropdown(true)}
            onMouseLeave={() => setShowWishlistDropdown(false)}
          >
            <FaHeart className="icon" />
            <span className="cart-count">{wishlistItems.length}</span>
          </div>

          {/* Cart */}
          <div
            className="cart-container icon-wrapper"
            onClick={() => navigate("/cart")}
            onMouseEnter={() => setShowCartDropdown(true)}
            onMouseLeave={() => setShowCartDropdown(false)}
          >
            <FaShoppingCart className="icon" />
            <span className="cart-count">{cartItems.length}</span>
          </div>

          {/* User */}
          {user ? (
            <div className="user-welcome">
              <span>Welcome, {user.name}!</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <img
              src={userIcon}
              alt="User"
              className="icon user-gif"
              onClick={() => setShowModal(true)}
            />
          )}
        </div>
      </header>

      {/* Login Modal */}
      {showModal && <LoginModal closeModal={() => setShowModal(false)} />}
    </>
  );
};

export default Header;
