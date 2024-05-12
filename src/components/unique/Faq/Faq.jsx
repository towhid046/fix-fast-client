import faqs from "./faqData";
import { Slide } from "react-awesome-reveal";
import SectionHeader from "./../../shared/SectionHeader/SectionHeader";

const Faq = () => {
  return (
    <section id="faq" className="py-6">
      <SectionHeader title="Get answer of FAQ" 
      description="Got Questions? Find Answers Here: Explore Our FAQ Section"
      />
      <Slide>
      <div className="flex justify-center">
      <div className="join join-vertical max-w-4xl mx-auto">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="collapse collapse-arrow join-item border border-base-300"
          >
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-lg font-semibold">
              {faq.question}
            </div>
            <div className="collapse-content">
              <p className="">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
      </Slide>
    </section>
  );
};

export default Faq;
