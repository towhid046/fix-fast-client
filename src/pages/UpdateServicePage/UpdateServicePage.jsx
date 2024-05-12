import swal from "sweetalert";
import { useEffect } from "react";
import { scrollToTop } from "./../../utilities/scrollToTop";
import useAuth from "./../../hooks/useAuth";
import SectionHeader from "./../../components/shared/SectionHeader/SectionHeader";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import DynamicHelmet from "./../../components/shared/DynamicHelmet/DynamicHelmet";

const UpdateServicePage = () => {
  const service = useLoaderData();
  const { user } = useAuth();

  useEffect(() => {
    scrollToTop();
  }, []);

  const {
    _id,
    image_url,
    service_name,
    price,
    service_area,
    description,
    provider_info: { name, email, photo },
  } = service;

  const serviceData = [
    { id: 1, title: "Image_URL", defVal: image_url },
    { id: 2, title: "Service_Name", defVal: service_name },
    { id: 3, title: "Price", type: "number", defVal: price },
    { id: 4, title: "Service_Area", defVal: service_area },
  ];

  const handleUpdateService = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedService = {};
    serviceData.forEach((input) => {
      updatedService[input.title.toLowerCase()] =
        form[input.title.toLowerCase()].value;
    });

    updatedService.description = form.description.value;

    // AXIOS PATCH REQUEST to save service info to database:
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/update-service?id=${_id}`,
        updatedService
      );
      swal(
        "Update Service",
        "Your service has been updated successfully",
        "success"
      );
    } catch (err) {
      swal("Something wrong", `${err?.message}`, "error");
    }
  };

  const updateServiceFormInputs = serviceData.map((data) => (
    <div className="w-full" key={data.id}>
      <label className="label">
        <strong className="label-text">{data.title}</strong>
      </label>
      <input
        type={data.type || "text"}
        defaultValue={data.defVal}
        name={data.title.toLowerCase()}
        placeholder={`Enter ${data.title.toLowerCase()}`}
        className={`input bg-base-200 text-base-content w-full focus:outline-none border-2 focus:border-neutral-content`}
        required
      />
    </div>
  ));

  return (
    <section className="container mx-auto px-2 pb-24">
      <DynamicHelmet title="Update Service" />
      <SectionHeader
        title={`Update The ${service_name}`}
        description="Stay up-to-date with your offerings! Easily modify and refine your added services as a provider. Keep your listings fresh and aligned with your evolving expertise."
      />
      <div
        className={
          " border text-black rounded-lg lg:px-20 md:px-12 px-4 md:py-12 py-5"
        }
      >
        <div>
          <form onSubmit={handleUpdateService} className="space-y-3 ">
            <div className="grid md:grid-cols-2 md:gap-x-6 gap-2 mb-3">
              {updateServiceFormInputs}
              <div className="w-full md:col-span-2">
                <label className="label">
                  <strong className="label-text">Description</strong>
                </label>
                <textarea
                  placeholder="Enter service description"
                  name="description"
                  defaultValue={description}
                  rows={7}
                  className="textarea textarea-bordered textarea-md bg-base-200 text-base-content w-full focus:outline-none border-base-200 border-2 focus:border-neutral-content"
                ></textarea>
              </div>
            </div>

            <div>
              <button className="btn w-full font-bold btn-success text-base-100">
                Update Service
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateServicePage;
