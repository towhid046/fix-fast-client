import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ServiceCard = ({ service }) => {
  const {
    _id,
    image_url,
    service_name,
    price,
    service_area,
    description,
    provider_info: { name, email, photo },
  } = service;

  return (
    <div className="border p-5 rounded-lg flex lg:flex-row flex-col xl:gap-8 gap-6 ">
      <figure>
        <img
          src={image_url}
          className="rounded-lg lg:h-60 lg:w-96 xl:w-72 w-full"
          alt={service_name + " Image"}
        />
      </figure>
      <div className="lg:border-r space-y-3 lg:max-w-lg lg:pr-5 pb-5">
        <h2 className="font-bold text-3xl">{service_name}</h2>
        <p>
          <strong>Price: {price}</strong>
        </p>
        <strong>Service Area: {service_area}</strong>
        <div className="relative">
          <p>
            <em>Description: </em>
            {description.split(" ").slice(0, 25).join(" ")}
            <span className="text-gray-400"> . . .</span>
          </p>
          <Link to={`services/${_id}`} className="absolute right-0">
            <button className=" btn btn-primary btn-sm">View Details</button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center space-y-3 flex-auto">
        <h2 className="text-xl text-gray-400 font-semibold mb-5">
          Service Provider Info
        </h2>
        <figure>
          <img className="rounded-full w-24 h-24" src={photo} alt="" />
        </figure>
        <h2 className="text-xl font-bold">Name: {name}</h2>
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.object.isRequired,
};

export default ServiceCard;
