

import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom"; // ✅
import "./PromoSlider.css";

import banner1 from "../../Assets/headPhone.png";
import banner2 from "../../Assets/Phone.png";
import banner3 from "../../Assets/Watch.png";

const slides = [
  {
    id: 1,
    title: "Micropack MHP Headphone Black",
    description: "Premium headphone experience with noise cancellation and rich bass quality. Perfect for music and calls.",
    image: banner1,
    cta: "Explore Now",
  },
  {
    id: 2,
    title: "Made in India Smartphone",
    description: "Powerful performance meets sleek design. 100% Indian innovation.",
    image: banner2,
    cta: "Shop Now",
  },
  {
    id: 3,
    title: "Handcrafted Indian Watch",
    description: "Timeless craftsmanship with authentic Indian style.",
    image: banner3,
    cta: "Buy Now",
  },
];

const PromoSlider = () => {
  const navigate = useNavigate(); // ✅

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 700,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="promo-slider">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="slide">
            <div className="slide-content">
              <div className="slide-text">
                <h4>Make in India Product</h4>
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
                <button
  onClick={() => {
    if (slide.id === 1) {
      window.location.href = "/category/headphone";
    } else if (slide.id === 2) {
      window.location.href = "/category/phone";
    } else if (slide.id === 3) {
      window.location.href = "/category/watch";
    }
  }}
>
  {slide.cta}
</button>

              </div>
              <img src={slide.image} alt={slide.title} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PromoSlider;
