import React from 'react';
import Slider from 'react-slick';
import '../styles/Carrusel.css'
const Carrusel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Imagen ${index + 1}`} style={{ width: '100%', borderRadius: '8px' }} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carrusel;
