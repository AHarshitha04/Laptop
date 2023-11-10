import React, { useState, useEffect } from 'react';
import '../Carousel.css';

const Ug_carousal = ({ images, autoMoveInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoMoveInterval);

    return () => {
      clearInterval(timer);
    };
  }, [autoMoveInterval, images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel">
      {/* <button className="nav-button" onClick={prevSlide}>
        &lt;
      </button> */}
      <img
        className="carousel-image"
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
      />
      {/* <button className="nav-button" onClick={nextSlide}>
        &gt;
      </button> */}
    </div>
  );
};

export default Ug_carousal;
