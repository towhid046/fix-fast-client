// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom } from "react-awesome-reveal";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Autoplay } from "swiper/modules";

const Hero = () => {
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

  return (
    <section className="container mx-auto px-4">
      <Swiper
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Autoplay]}
        className="mySwiper "
      >
        {slides?.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              style={{ backgroundImage: `url(${slide.img})` }}
              className=" bg-cover bg-center bg-no-repeat md:py-22 lg:py-28 py-12 flex  items-center text-white"
            >
              <Zoom>
                <div className=" max-w-xl lg:mx-40 md:mx-20 mx-8 text-center lg:text-left">
                  <h2 className="font-bold lg:text-6xl text-gray-50 md:text-5xl text-4xl mb-3">
                    {slide.title}
                  </h2>
                  <p className="md:text-lg text-gray-100 ">
                    {slide.description}
                  </p>
                  <a href="#explore-now">
                    <button className="btn text-white border-gray-800 hover:bg-transparent bg-gray-800   border  mt-7">
                      Explore Now
                    </button>
                  </a>
                </div>
              </Zoom>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
