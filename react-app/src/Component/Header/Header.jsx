// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaShoppingCart, FaHeart, FaBars } from "react-icons/fa";
// import "./Header.css";
// import LoginModal from "../Login/LoginModal";
// import userIcon from "../../Assets/profile.gif";
// import userIcon2 from "../../Assets/search.gif";
// import logo from "../../Assets/logo.png";
// import { useUser } from "../UserContext"; // Import context
// import { toast } from "react-toastify"; // Import toast
// import { Link } from 'react-router-dom';

// const Header = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [showCartDropdown, setShowCartDropdown] = useState(false);
//   const [showWishlistDropdown, setShowWishlistDropdown] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const { user, setUser } = useUser(); // Use context

//   const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
//   const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, [setUser]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     toast.success("Logout successful!", {
//       position: "top-center",
//       autoClose: 2000,
//       pauseOnHover: true,
//       theme: "colored",
//     });
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen((prev) => !prev); // toggle between true and false
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false); // Close menu when a nav link is clicked
//   };

//   return (
//     <>
//       <header className="header">
//         <div className="logo" onClick={() => navigate("/")}>
//           <img src={logo} alt="Logo" />
//           <span>BharatBazaar</span>
//         </div>

//         <FaBars className="hamburger" onClick={toggleMenu} />

        
// <nav className={`nav-links ${isMenuOpen ? "active" : ""}`}>
//   <Link to="/" onClick={closeMenu}>Home</Link>
//   <Link to="/" onClick={closeMenu}>Category</Link>
//   <Link to="/about" onClick={closeMenu}>About Us</Link>
//   <Link to="/faq" onClick={closeMenu}>FAQ</Link>
//   <Link to="/blog" onClick={closeMenu}>Blog</Link>
//   <Link to="/contact" onClick={closeMenu}>Contact</Link>
// </nav>


//         <div className="header-icons">
//           <img src={userIcon2} alt="Search" className="icon user-gif" />

//           {/* Wishlist */}
//           <div
//             className="icon-wrapper"
//             onClick={() => navigate("/wishlist")}
//             onMouseEnter={() => setShowWishlistDropdown(true)}
//             onMouseLeave={() => setShowWishlistDropdown(false)}
//           >
//             <FaHeart className="icon" />
//             <span className="cart-count">{wishlistItems.length}</span>
//           </div>

//           {/* Cart */}
//           <div
//             className="cart-container icon-wrapper"
//             onClick={() => navigate("/cart")}
//             onMouseEnter={() => setShowCartDropdown(true)}
//             onMouseLeave={() => setShowCartDropdown(false)}
//           >
//             <FaShoppingCart className="icon" />
//             <span className="cart-count">{cartItems.length}</span>
//           </div>

//           {/* User */}
//           {user ? (
//             <div className="user-welcome">
//               <span>Welcome, {user.name}!</span>
//               <button className="logout-btn" onClick={handleLogout}>Logout</button>
//             </div>
//           ) : (
//             <img
//               src={userIcon}
//               alt="User"
//               className="icon user-gif"
//               onClick={() => setShowModal(true)}
//             />
//           )}
//         </div>
//       </header>

//       {/* Login Modal */}
//       {showModal && <LoginModal closeModal={() => setShowModal(false)} />}
//     </>
//   );
// };

// export default Header;









import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaBars } from "react-icons/fa";
import { useUser } from "../UserContext";
import { toast } from "react-toastify";
import LoginModal from "../Login/LoginModal";
import userIcon from "../../Assets/profile.gif";
import userIcon2 from "../../Assets/search.gif";
import logo from "../../Assets/logo.png";
import "./Header.css";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showWishlistDropdown, setShowWishlistDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useUser();

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
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/" onClick={closeMenu}>Category</Link>
          <Link to="/about" onClick={closeMenu}>About Us</Link>
          <Link to="/faq" onClick={closeMenu}>FAQ</Link>
          <Link to="/blog" onClick={closeMenu}>Blog</Link>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
        </nav>

        <div className="header-icons">
          <img src={userIcon2} alt="Search" className="icon user-gif" />

          {/* Wishlist */}
          <div
            className="icon-wrapper"
            onMouseEnter={() => setShowWishlistDropdown(true)}
            onMouseLeave={() => setShowWishlistDropdown(false)}
            onClick={() => navigate("/wishlist")}
          >
            <FaHeart className="icon" />
            <span className="cart-count">{wishlistItems.length}</span>

            {showWishlistDropdown && (
              <div className="dropdown-menu">
                {wishlistItems.length === 0 ? (
                  <p>Your wishlist is empty</p>
                ) : (
                  wishlistItems.slice(0, 3).map((item, index) => (
                    <div key={index} className="dropdown-item">
                      {item.name} - ₹{item.price}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Cart */}
          <div
            className="icon-wrapper"
            onMouseEnter={() => setShowCartDropdown(true)}
            onMouseLeave={() => setShowCartDropdown(false)}
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart className="icon" />
            <span className="cart-count">{cartItems.length}</span>

            {showCartDropdown && (
              <div className="dropdown-menu">
                {cartItems.length === 0 ? (
                  <p>Your cart is empty</p>
                ) : (
                  cartItems.slice(0, 3).map((item, index) => (
                    <div key={index} className="dropdown-item">
                      {item.name} - ₹{item.price}
                    </div>
                  ))
                )}
              </div>
            )}
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
