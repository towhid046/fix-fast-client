import PropTypes from "prop-types";
const SectionHeader = ({
  title = "Section Title",
  description = "Section description",
}) => {
  return (
    <header
      className={`text-base-content container mx-auto text-center space-y-2 py-7 max-w-2xl lg:mt-8`}
    >
      <h2 className="font-bold text-3xl">{title}</h2>
      <p>{description}</p>
    </header>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default SectionHeader;
