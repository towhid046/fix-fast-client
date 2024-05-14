import PropTypes from "prop-types";
const ErrorComponent = ({ error = "Something went wrong..." }) => {
  return (
    <div className="flex justify-center py-12 min-h-screen ">
      <h2 className="text-2xl font-bold text-gray-300">{error}</h2>
    </div>
  );
};
ErrorComponent.propTypes = {
  error: PropTypes.string,
};

export default ErrorComponent;
