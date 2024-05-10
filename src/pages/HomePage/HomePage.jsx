import Hero from "./../../components/unique/Hero/Hero";
import PopularServices from "./../../components/unique/PopularServices/PopularServices";
import Reviews from "./../../components/unique/Reviews/Reviews";
import Faq from "./../../components/unique/Faq/Faq";
import MobileApp from "./../../components/unique/MobileApp/MobileApp";
const HomePage = () => {
  return (
    <section>
      <Hero />
      <PopularServices />
      <Faq />
      <Reviews />
      <MobileApp />
    </section>
  );
};

export default HomePage;
