import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";

const slides = [
  {
    id: 1,
    title: "Artistry in Wood",
    description:
      "Explore the intersection of art and functionality with our diverse collection of wooden furniture and sculptures. Imbue your space with warmth and character through our handcrafted pieces that seamlessly blend form and function",
    img: "https://images.pexels.com/photos/19892557/pexels-photo-19892557/free-photo-of-close-up-of-computer-component.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    title: "Natural Elegance",
    description:
      "Transform your home into a sanctuary of style and comfort with our enchanting wooden home decor accents. From rustic charm to modern sophistication, our curated selection brings the timeless allure of wood into every corner of your space",
    img: "https://images.pexels.com/photos/19895883/pexels-photo-19895883/free-photo-of-young-man-working-in-office.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    title: "Sustainable Chic",
    description:
      "Embrace eco-conscious living with our collection of stylish jute home decor. Infuse your living spaces with earthy textures and organic elegance, while making a positive impact on the environment with our sustainable choices.",
    img: "https://images.pexels.com/photos/19895784/pexels-photo-19895784/free-photo-of-computer-components-on-table.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    title: "Bohemian Beauty",
    description:
      "Adorn yourself with the rustic charm of jute and the timeless allure of wood with our stunning collection of jewelry. Handcrafted with care, each piece exudes bohemian elegance and individuality, perfect for expressing your unique style.",
    img: "https://images.pexels.com/photos/19895882/pexels-photo-19895882/free-photo-of-engineer-working-in-office.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];
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
    speed: 1500,
    autoplaySpeed:6000
  };

  return (
    <section className="relative">
      <button onClick={handlePrev} className="btn hover:border-4 hover:border-base-100 lg:btn-lg btn-circle -left-4 lg:-left-7 border-base-100 border-4 z-40 top-[40%] absolute">

      <MdOutlineKeyboardArrowLeft className="text-2xl"/>
      </button>

      <Slider ref={sliderRef} {...settings} autoplay={true}>
        {slides?.map((slide) => (
          <div key={slide.id}>
          <div
            style={{ backgroundImage: `url(${slide.img})` }}
            className="m-3 p-5 bg-cover bg-center rounded-2xl bg-no-repeat relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 flex flex-col justify-center items-center text-white">
              <div className="max-w-xl text-center mx-auto p-8 rounded-lg">
                <h2 className="font-bold text-4xl mb-4">{slide.title}</h2>
                <p className="mb-3">{slide.description}</p>
                <a href="#explore-now">
                  <button className="btn btn-outline btn-error text-base-100">Explore Now</button>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        ))}
      </Slider>

      <button onClick={handleNext} className="btn hover:border-4 hover:border-base-100 lg:btn-lg btn-circle  absolute -right-4 lg:-right-7 border-base-100 border-4 z-40 top-[40%]">
      <MdOutlineKeyboardArrowRight className="text-2xl"/>
      </button>
    </section>
  );
};

export default Hero;
