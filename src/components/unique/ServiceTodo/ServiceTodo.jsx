import PropTypes from "prop-types";
import axios from "axios";

const ServiceTodo = ({ service }) => {
  const {
    _id,
    image_url,
    service_name,
    price,
    service_taking_date,
    current_user_email,
    current_user_name,
    special_instruction,
  } = service;


  const handleServiceStatus = async (e) => {
    const currentStatus = e.target.value;
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/update-service-status/${_id}`, {currentStatus}
      );
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="p-5 rounded-lg border">
        <div className="  flex lg:flex-row flex-col xl:gap-8 gap-6 mb-10">
          <figure className="flex-1">
            <img
              src={image_url}
              className="rounded-lg w-full"
              alt={service_name + " Image"}
            />
          </figure>
          <div className=" space-y-1 flex-1">
            <h2 className="font-bold text-3xl ">{service_name}</h2>
            <p>
              <strong>Price: {price}</strong>
            </p>
            <p className="pb-4">
              <strong>Date: {service_taking_date}</strong>
            </p>

            <div className="border-t pt-5 space-y-1 pb-2">
              <h2 className="text-xl font-bold">User Information</h2>
              <p>Name: {current_user_name}</p>
              <p>Email: {current_user_email}</p>
              <p>Location: {special_instruction}</p>
            </div>
            <div className="border-t pt-2">
              <h2 className="text-lg font-bold mb-3">Service Status</h2>
              <select
                onChange={handleServiceStatus}
                className="select select-bordered w-full max-w-xs"
              >
                <option value={"Pending"}>Pending</option>
                <option value={"Working"}>Working</option>
                <option value={"Complete"}>Complete</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ServiceTodo.propTypes = {
  service: PropTypes.object.isRequired,
};

export default ServiceTodo;