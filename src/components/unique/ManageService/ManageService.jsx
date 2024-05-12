import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { TiPencil } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";

const ManageService = ({ index, service, handleDeleteService }) => {
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
    <tr className="text-center">
      <th>{index}</th>
      <td>{service_name}</td>
      <td>{price}</td>
      <td>{service_area}</td>
      <td className="flex gap-5 justify-center">
        <Link to={`/update-service/${_id}`} className="tooltip" data-tip="Edit">
          <button className="btn bg-base-200 border btn-sm">
            <TiPencil className="text-lg text-success" />
          </button>
        </Link>
        <button
          onClick={() => handleDeleteService(_id)}
          className="btn bg-base-200 border btn-sm tooltip"
          data-tip="Delete"
        >
          <RiDeleteBin6Line className="text-lg text-error" />
        </button>
      </td>
    </tr>
  );
};

ManageService.propTypes = {
  service: PropTypes.object.isRequired,
  handleDeleteService: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
export default ManageService;
