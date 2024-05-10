import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ManageService = ({ service, handleDeleteService }) => {
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
    <div className="card bg-base-100 image-full">
      <figure>
        <img src={image_url} alt={service_name + " Image"} />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-bold">{service_name}</h2>
        <strong>Price: {price}</strong>
        <strong>Location: {service_area}</strong>
        <p>{description.split(" ").slice(0, 10).join(" ")}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() => handleDeleteService(_id)}
            className="btn btn-error"
          >
            Delete
          </button>
          <Link to={`/update-service/${_id}`}>
            <button className="btn btn-info">Edit</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

ManageService.propTypes = {
  service: PropTypes.object.isRequired,
  handleDeleteService: PropTypes.func.isRequired,
};
export default ManageService;
