import React from 'react';
import Slider from 'react-slick';
import classes from './Carrusel.module.css';

const Carrusel = ({ images }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    
      <Slider {...settings}>
        {images.map((image, index) => (
          <div className={classes.divCarrusel} key={index}>
            <img src={image} alt={`Imagen ${index + 1}`} className='imgCarrusel' />
          </div>
        ))}
      </Slider>
    
  );
};

export default Carrusel;
