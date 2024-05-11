import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
const DynamicHelmet = ({ title }) => {
  return (
    <Helmet>
      <title>FixFast | {title}</title>
    </Helmet>
  );
};

DynamicHelmet.propTypes = {
  title: PropTypes.string.isRequired,
};

export default DynamicHelmet;
