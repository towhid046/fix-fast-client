import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { Link } from "react-router-dom";
import slides from "./slideData.js";
import { Slide } from "react-awesome-reveal";

const Hero = () => {
  const sliderRef = useRef(null);

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const settings = {
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 800,
    autoplaySpeed: 5000,
  };

  return (
    <section className="relative">
      <button
        onClick={handlePrev}
        className="btn hover:border-4 hover:border-base-100 lg:btn-lg btn-circle -left-4 lg:-left-7 border-base-100 border-4 z-40 top-[40%] absolute"
      >
        <MdOutlineKeyboardArrowLeft className="text-2xl" />
      </button>

      <Slider className="mx-auto" ref={sliderRef} {...settings} autoplay={true}>
        {slides?.map((slide) => (
          <div key={slide.id}>
            <div
              style={{ backgroundImage: `url(${slide.img})` }}
              className="m-3 p-5 bg-cover bg-center rounded-2xl bg-no-repeat relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="relative z-10 flex flex-col justify-center items-center text-white">
                <div className="max-w-xl text-center mx-auto px-5 md:py-20 py-16 lg:py-36 rounded-lg">
                  <Slide direction="up">
                    <h2 className="font-bold lg:text-4xl text-xl md:text-3xl md:mb-4 mb-2">
                      {slide.title}
                    </h2>
                    <p className="mb-3 text-md">{slide.description}</p>

                    <Link to="/all-services">
                      <button className="btn btn-outline btn-error text-base-100">
                        Explore More
                      </button>
                    </Link>
                  </Slide>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <button
        onClick={handleNext}
        className="btn hover:border-4 hover:border-base-100 lg:btn-lg btn-circle  absolute -right-4 lg:-right-7 border-base-100 border-4 z-40 top-[40%]"
      >
        <MdOutlineKeyboardArrowRight className="text-2xl" />
      </button>
    </section>
  );
};

export default Hero;
