import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { MdOutlineLocationOn } from "react-icons/md";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";

const SingleService = ({ service }) => {
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
      <figure className="overflow-hidden rounded-lg">
        <Link className="rounded-lg" to={`/service-details/${_id}`}>
          <img
            src={image_url}
            className="rounded-lg lg:h-60 lg:w-96 xl:w-72 w-full transition ease-in-out duration-1000 hover:scale-125 "
            alt={service_name + " Image"}
            title="Click to view Details"
          />
        </Link>
      </figure>
      <div className="lg:border-r space-y-3 lg:max-w-lg lg:pr-5 pb-5">
        <div>
          <h2 className="font-bold text-2xl mb-3">{service_name}</h2>
          <p className="flex items-center gap-2 mb-1">
            <HiOutlineCurrencyDollar className="text-xl text-error" />
            <strong>
              <em>${price}</em>
            </strong>
          </p>
          <p className="flex items-center gap-2">
            <MdOutlineLocationOn className="text-xl text-error" />
            <strong>
              <em>{service_area}</em>
            </strong>
          </p>
        </div>
        <div className="relative">
          <p>
            <em>Description: </em>
            {description.split(" ").slice(0, 25).join(" ")}
            <span className="text-gray-400"> . . .</span>
          </p>
          <Link to={`/service-details/${_id}`} className="absolute right-0">
            <button className="  link link-error text-lg font-normal transition ease-in-out duration-500 italic btn-sm">
              View Details
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center space-y-3 flex-auto">
        <h2 className="text-xl italic  font-bold mb-5 border-b pb-3 w-full lg:border-0 text-center">
          Service Provider
        </h2>
        <figure>
          <img className="rounded-full w-24 h-24" src={photo} alt="" />
        </figure>
        <div className="space-y-1 text-center">
          <h2 className="text-lg font-semibold">Name: {name}</h2>
          <p>
            <>Rating: {Math.round(Math.random() * 5)}</>
          </p>
        </div>
      </div>
    </div>
  );
};

SingleService.propTypes = {
  service: PropTypes.object.isRequired,
};

export default SingleService;
