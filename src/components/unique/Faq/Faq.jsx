import faqImg from "../../../assets/images/faq.png";
import faqs from "./faqData";
import { Slide } from "react-awesome-reveal";
import SectionHeader from "./../../shared/SectionHeader/SectionHeader";

const Faq = () => {
  return (
    <section id="faq" className="py-10">
      <SectionHeader />
      <div className="flex justify-between flex-col lg:flex-row items-center gap-10">
        <div className="w-[86%]">
          <Slide>
            <img className="w-full" src={faqImg} alt="Faq img" />
          </Slide>
        </div>
        <Slide direction="right">
          <div className="flex-1">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="collapse collapse-arrow shadow-md rounded-none"
              >
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-md font-bold text-custom-black ">
                  {faq.question}
                </div>
                <div className="collapse-content">
                  <p className="text-custom-gray text-base font-normal">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Slide>
      </div>
    </section>
  );
};

export default Faq;
