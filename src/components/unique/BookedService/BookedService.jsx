import { Link } from "react-router-dom";

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
    <div className="card bg-base-100 image-full">
      <figure>
        <img src={image_url} alt={service_name + " Image"} />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-3xl font-bold">{service_name}</h2>
        <strong>Price: {price}</strong>
        <strong className="text-success">Status: {serviceStatus}</strong>
        <p>Provider Name: {provider_name}</p>
        <p>Provider Email: {provider_email}</p>
        <div className="card-actions justify-end">
          <Link to={`/service-details/${service_id}`}>
            <button className="btn btn-info">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookedService;
