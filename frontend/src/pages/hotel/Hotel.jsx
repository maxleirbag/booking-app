import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight, faCircleChevronLeft, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import React from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import './hotel.css';
import Mail from "../../components/mail/Mail";
import Footer from "../../components/footer/Footer";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";

const Hotel = () => {

  const [slideNumber, setSlideNumber] = useState(0);
  const [openPresentation, setOpenPresentation] = useState(false);

  const location = useLocation();
  const id = location.pathname.split('/')[3];
  const { data, loading, error } = useFetch(`http://localhost:8800/hotels/hotel/${id}`)
  console.log([data, id])

  const selectedHeaderType = 'list';
  const photos = data.photos;

  const handleOpenPresentation = (index) => {
    setOpenPresentation(!openPresentation);
    setSlideNumber(index);
  }

  const handleSlideArrow = (direction) => {
    console.log(direction)
    if (direction.toUpperCase() == 'L' && slideNumber > 0) {
      setSlideNumber(slideNumber - 1)
    }
    else if (direction.toUpperCase() == 'R' && slideNumber < photos.length - 1) {
      setSlideNumber(slideNumber + 1);
    }
  }

  return (
    <div>
      <Navbar />
      <Header headerType={selectedHeaderType} />
      <div className="hotelContainer">
        {openPresentation &&
          <div className="slider">
            <div className="slideWrapper">
              {photos.length > 1 && <FontAwesomeIcon icon={faCircleChevronLeft} className='arrows'
                onClick={() => handleSlideArrow('L')}
              />}
              <img src={photos[slideNumber]} alt="Zoomed hotel photo" className="sliderImage" />
              {photos.length > 1 && <FontAwesomeIcon icon={faCircleArrowRight} className='arrows'
                onClick={() => handleSlideArrow('R')}
              />}
              <FontAwesomeIcon icon={faCircleXmark} className='exitPresentation'
                onClick={() => setOpenPresentation(false)} />
            </div>
          </div>}
        <div className="hotelWrapper">
          <button className="bookNow">Book Reservation</button>
          <h1 className="hotelTitle">Grand Hotel</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span> Elton St. 367 New York</span>
          </div>
          <span className="hotelDistance">Excellent location - 500m from center</span>
          <span className="hotelPriceHighlight">Book a stay at this property and get a free airport taxi</span>
        </div>
        {photos && photos.map((image, index) =>
          <div key={index + image} className="hotelImageWrapper">
            <img
              className="hotelImage"
              src={image}
              alt="Hotel photo"
              onClick={() => handleOpenPresentation(index)} />
          </div>
        )}
        <div className="hotelDetails">
          <div className="hotelDetailsTexts">
            <h1 className="hotelTitle">In the center of the galaxy</h1>
            <p className="hotelDescription">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lobortis, est id blandit malesuada, nunc augue finibus arcu, a sodales nibh nisl eget arcu. Duis varius varius magna sed cursus. Pellentesque ut leo tortor. Proin vitae magna tortor. Praesent eu ultricies nulla. Morbi facilisis justo et eleifend ultricies. Morbi ac urna felis. Aliquam neque sem, dictum sed pellentesque non, ullamcorper sit amet nibh.
            </p>
          </div>
          <div className="hotelDetailsPrice">
            <h1>Ideal for couples</h1>
            <span>
              Located at the center of the galaxy, this room scored the highest in the city
            </span>
            <h2><b>$678</b> (7 nights)</h2>
            <button>Book Reservation</button>
          </div>
        </div>
        <Mail />
        <Footer />
      </div>
    </div>)
}

export default Hotel;