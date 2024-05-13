import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Slide } from "react-awesome-reveal";

const BookedService = ({ service }) => {
  const {
    _id,
    service_id,
    serviceStatus,
    image_url,
    service_name,
    price,
    service_area,
    provider_name,
    provider_email,
  } = service;
  return (
    <Slide>
      <div className="card bg-base-100 image-full">
      <figure>
        <img src={image_url} alt={service_name + " Image"} />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-3xl font-bold">{service_name}</h2>
        <strong>Price: {price}</strong>
        <p>
          <em>Status : </em>
        <strong
          className={`
        ${serviceStatus === "Pending" && "text-error"}
        ${serviceStatus === "Working" && "text-info"}
        ${serviceStatus === "Complete" && "text-success"}
        `}
        >
           {serviceStatus}
        </strong>
        </p>
        <p>Provider Name: {provider_name}</p>
        <p>Provider Email: {provider_email}</p>
        <div className="card-actions justify-end">
          <Link to={`/service-details/${service_id}`}>
            <button className="btn text-gray-200 btn-outline">View Details</button>
          </Link>
        </div>
      </div>
    </div>
    </Slide>
  );
};

BookedService.propTypes = {
  service: PropTypes.object.isRequired,
};

export default BookedService;
