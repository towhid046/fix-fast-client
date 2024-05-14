import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const EmptyService = ({ title, url, btnText }) => {
  return (
    <div className="flex gap-5 justify-center items-center min-h-[80vh] flex-col">
      <h2 className="text-gray-300 font-bold italic text-center text-2xl">
        {title}
      </h2>
      <Link to={`/${url}`}>
        <button className="btn btn-error btn-outline btn-sm">{btnText}</button>
      </Link>
    </div>
  );
};

EmptyService.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
};

export default EmptyService;
