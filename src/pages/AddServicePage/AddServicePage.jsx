import swal from "sweetalert";
// import SectionHeader from "../../components/Shared/SectionHeader/SectionHeader";
import { useEffect } from "react";
import { scrollToTop } from "./../../utilities/scrollToTop";
// import MyHelmate from './../../components/Shared/MyHelmate/MyHelmate';
import useAuth from "./../../hooks/useAuth";
import SectionHeader from "./../../components/shared/SectionHeader/SectionHeader";
import axios from "axios";

const AddService = () => {
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
        className={`input bg-gray-100 w-full`}
        required
      />
    </div>
  ));

  return (
    <section className="container mx-auto px-2 pb-24">
      {/* <MyHelmate
      title="Add Craft"
      /> */}
      <SectionHeader title="Add A Service" />
      <div
        className={
          " border text-black rounded-lg lg:px-20 md:px-12 px-4 py-12 my-12"
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
                  className="textarea textarea-bordered textarea-md w-full text-md bg-gray-100"
                ></textarea>
              </div>
            </div>

            <div>
              <button className="btn w-full font-bold bg-[#AB7442] hover:bg-gray-700 text-gray-100">
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
