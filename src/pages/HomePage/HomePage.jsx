// import Hero from "./../../components/unique/Hero/Hero";
import PopularServices from "./../../components/unique/PopularServices/PopularServices";
import Faq from "./../../components/unique/Faq/Faq";
import MobileApp from "./../../components/unique/MobileApp/MobileApp";
import { scrollToTop } from "../../utilities/scrollToTop";
import { useEffect } from "react";
import DynamicHelmet from './../../components/shared/DynamicHelmet/DynamicHelmet';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Hero from "../../components/unique/Hero/Hero";

const HomePage = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <section>
      <DynamicHelmet title="Home"/>
      <Hero />
      <PopularServices />
      <MobileApp />
      <Faq />
    </section>
  );
};

export default HomePage;
