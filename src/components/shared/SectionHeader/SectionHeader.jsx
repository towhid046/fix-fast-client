import PropTypes from "prop-types";
import { Slide } from "react-awesome-reveal";

const SectionHeader = ({
  name = "Section Name",
  title = "Section Title",
  description = "Section description",
}) => {
  return (
    <Slide direction="up">
      <header
        className={`text-base-content container mx-auto text-center py-7 max-w-2xl lg:mt-8`}
      >
        <h3 className="text-md font-bold text-[#F96062]">{`${name.toUpperCase()}`}</h3>
        <h2 className="font-bold md:text-3xl text-2xl mb-2">{title}</h2>
        <p>{description}</p>
      </header>
    </Slide>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string,
};

export default SectionHeader;
