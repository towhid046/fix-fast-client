import PropTypes from "prop-types";
import axios from "axios";
import swal from "sweetalert";
import { Slide } from "react-awesome-reveal";

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
    serviceStatus,
  } = service;

  const handleServiceStatus = async (e) => {
    const currentStatus = e.target.value;

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/update-service-status/${_id}`,
        { currentStatus }
      );
      swal(
        "Status Updated",
        "You have successfully updated this service Status!",
        "success"
      );
    } catch (err) {
      swal("Something went wrong", `${err?.message}`, "success");
    }
  };

  return (
    <div>
      <div className="p-5 rounded-lg border">
        <div className="  flex lg:flex-row flex-col xl:gap-8 gap-6">
          <Slide direction="right" className="flex-1">
            <figure>
              <img
                src={image_url}
                className="rounded-lg w-full"
                alt={service_name + " Image"}
              />
            </figure>
          </Slide>
          <Slide className="flex-1" direction="left">
            <div className=" space-y-1">
              <h2 className="font-bold text-2xl ">{service_name}</h2>
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
                <h2 className="text-lg font-bold mb-3">
                  Update Your Service Status
                </h2>
                <select
                  onChange={handleServiceStatus}
                  className="select select-bordered w-full max-w-xs"
                >
                  <option value={serviceStatus}>{serviceStatus}</option>
                  <option
                    className={`${serviceStatus === "Pending" && "hidden"}`}
                    value={"Pending"}
                  >
                    Pending
                  </option>
                  <option
                    className={`${serviceStatus === "Working" && "hidden"}`}
                    value={"Working"}
                  >
                    Working
                  </option>
                  <option
                    className={`${serviceStatus === "Complete" && "hidden"}`}
                    value={"Complete"}
                  >
                    Complete
                  </option>
                </select>
              </div>
            </div>
          </Slide>
        </div>
      </div>
    </div>
  );
};

ServiceTodo.propTypes = {
  service: PropTypes.object.isRequired,
};

export default ServiceTodo;
