import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Category.css";
// Import category icons
import laptopIcon from "../../Assets/cateroryIcons/Laptop.png";
import phoneIcon from "../../Assets/cateroryIcons/phone.png";
import watchIcon from "../../Assets/cateroryIcons/Laptop.png";
import cameraIcon from "../../Assets/cateroryIcons/camera.png";
import headphoneIcon from "../../Assets/cateroryIcons/headphones.png";
import gamepadIcon from "../../Assets/cateroryIcons/controller.png";

const categories = [
  { name: "Laptop", icon: laptopIcon },
  { name: "Phone", icon: phoneIcon },
  { name: "Watch", icon: watchIcon },
  { name: "Camera", icon: cameraIcon },
  { name: "Headphone", icon: headphoneIcon },
  { name: "Video Game", icon: gamepadIcon },
];

const NextArrow = ({ onClick }) => (
  <div className="arrow next" onClick={onClick}>❯</div>
);

const PrevArrow = ({ onClick }) => (
  <div className="arrow prev" onClick={onClick}>❮</div>
);

const CategorySlider = () => {
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // ← show 5 items
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 },
      },
    ],
  };
  return (
    <div className="category-slider" id="category-section">
      <h2>Browse by Category</h2>
      <Slider {...settings}>
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-card"
            onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
          >
            <img src={category.icon} alt={category.name} />
            <p>{category.name}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default CategorySlider;
