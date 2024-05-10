import Hero from "./../../components/unique/Hero/Hero";
import PopularServices from "./../../components/unique/PopularServices/PopularServices";
import Reviews from "./../../components/unique/Reviews/Reviews";
import Faq from "./../../components/unique/Faq/Faq";
const HomePage = () => {
  return (
    <section>
      <Hero />
      <PopularServices />
      <Faq />
      <Reviews />
    </section>
  );
};

export default HomePage;
