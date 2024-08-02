import React, { useState } from "react";
import previous from "../images/right.svg";
import next from "../images/left.svg";

const ImageSwiper = ({ images, readMore }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length] = useState(images?.length);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + length) % length);
  };

  return (
    <div className="slider-container">
      <div className="slider">
        {images?.map((image, index) => (
          image && (
            <img
              alt=""
              src={image}
              key={index}
              className={`slide ${index === currentIndex ? "active" : ""}`}
              style={readMore && {maxHeight: "440px", maxWidth: "840px"}}
            />
          )
        ))}
      </div>
      {readMore===true && length > 1 && ( 
        <>
          <button className="prev-button" onClick={prevSlide}>
            <img src={next} alt="icon" />
          </button>
          <button className="next-button" onClick={nextSlide}>
          <img src={previous} alt="icon" />
          </button>
        </>
      )}
    </div>
  );
};

export default ImageSwiper;
