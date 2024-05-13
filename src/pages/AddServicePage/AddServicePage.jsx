import swal from "sweetalert";
import { useEffect } from "react";
import { scrollToTop } from "./../../utilities/scrollToTop";
import DynamicHelmet from "./../../components/shared/DynamicHelmet/DynamicHelmet";
import useAuth from "./../../hooks/useAuth";
import SectionHeader from "./../../components/shared/SectionHeader/SectionHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddService = () => {
  const navigate = useNavigate()
  useEffect(() => {
    scrollToTop();
  }, []);

  const { user } = useAuth();

  const serviceData = [
    { id: 1, title: "Image_URL" },
    { id: 2, title: "Service_Name" },
    { id: 3, title: "Price", type: "number" },
    { id: 4, title: "Service_Area" },
  ];

  const handleAddService = async (e) => {
    e.preventDefault();
    const form = e.target;
    const serviceInfo = {};
    serviceData.forEach((input) => {
      serviceInfo[input.title.toLowerCase()] =
        form[input.title.toLowerCase()].value;
    });

    serviceInfo.description = form.description.value;
    serviceInfo.provider_info = {
      name: user?.displayName,
      email: user?.email,
      photo: user?.photoURL,
    };

    // AXIOS POST REQUEST to save service info to database:
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/add-service`,
        serviceInfo
      );
      swal("Added Service", "Your service has been added", "success");
      navigate('/manage-services')
    } catch (err) {
      swal("Something wrong", `${err?.message}`, "error");
    }
  };

  const addServiceFormInputs = serviceData.map((data) => (
    <div className="w-full" key={data.id}>
      <label className="label">
        <strong className="label-text">{data.title}</strong>
      </label>
      <input
        type={data.type || "text"}
        name={data.title.toLowerCase()}
        placeholder={`Enter ${data.title.toLowerCase()}`}
        className={`input bg-base-200 text-base-content w-full focus:outline-none border-2 focus:border-neutral-content`}
        required
      />
    </div>
  ));

  return (
    <section className="container mx-auto px-2 pb-24">
      <DynamicHelmet title="Add Service" />
      <SectionHeader
      name="Add Service"
        title="Add A New Service"
        description="Enhance your service portfolio by seamlessly adding a new offering as a service provider."
      />
      <div
        className={
          " border text-black rounded-lg lg:px-20 md:px-12 px-4 md:py-12 py-5 "
        }
      >
        <div>
          <form onSubmit={handleAddService} className="space-y-3 ">
            <div className="grid md:grid-cols-2 md:gap-x-6 gap-2 mb-3">
              {addServiceFormInputs}
              <div className="w-full md:col-span-2">
                <label className="label">
                  <strong className="label-text">Description</strong>
                </label>
                <textarea
                  placeholder="Enter service description"
                  name="description"
                  rows={7}
                  className="textarea textarea-bordered textarea-md bg-base-200 text-base-content w-full focus:outline-none border-base-200 border-2 focus:border-neutral-content"
                ></textarea>
              </div>
            </div>

            <div>
              <button className="btn w-full font-bold btn-error text-base-100">
                Add Service
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddService;
