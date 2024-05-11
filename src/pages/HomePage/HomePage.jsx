import Hero from "./../../components/unique/Hero/Hero";
import PopularServices from "./../../components/unique/PopularServices/PopularServices";
import Faq from "./../../components/unique/Faq/Faq";
import MobileApp from "./../../components/unique/MobileApp/MobileApp";
import { scrollToTop } from "../../utilities/scrollToTop";
import { useEffect } from "react";
import DynamicHelmet from './../../components/shared/DynamicHelmet/DynamicHelmet';

const HomePage = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <section>
      <DynamicHelmet title="Home"/>
      <Hero />
      <PopularServices />
      <Faq />
      <MobileApp />
    </section>
  );
};

export default HomePage;
