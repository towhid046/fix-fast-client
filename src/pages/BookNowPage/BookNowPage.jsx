import swal from "sweetalert";
// import SectionHeader from "../../components/Shared/SectionHeader/SectionHeader";
import { useEffect } from "react";
import { scrollToTop } from "./../../utilities/scrollToTop";
// import MyHelmate from './../../components/Shared/MyHelmate/MyHelmate';
import useAuth from "./../../hooks/useAuth";
import SectionHeader from "./../../components/shared/SectionHeader/SectionHeader";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

const BookNowPage = () => {
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

  const serviceBookInputs = [
    { id: 1, title: "Service_Id", defVal: _id },
    { id: 2, title: "Service_Name", defVal: service_name },
    { id: 3, title: "Price", defVal: price, type: "number" },
    { id: 4, title: "Image_URL", defVal: image_url },
    { id: 6, title: "Provider_Name", defVal: name },
    { id: 5, title: "Provider_Email", defVal: email },
    { id: 8, title: "Current_User_Name", defVal: user?.displayName },
    { id: 7, title: "Current_User_Email", defVal: user?.email },
  ];

  const handlePurchaseService = async (e) => {
    e.preventDefault();
    const form = e.target;
    const serviceBookedInfo = {};
    serviceBookInputs.forEach((input) => {
      serviceBookedInfo[input.title.toLowerCase()] =
        form[input.title.toLowerCase()].value;
    });

    serviceBookedInfo.serviceStatus = "pending";
    serviceBookedInfo.service_taking_date = form.date.value;
    serviceBookedInfo.special_instruction = form.special_instruction.value;

    // AXIOS POST REQUEST to save booked service info to database:
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/booked-service`,
        serviceBookedInfo
      );
      swal("Success", "Your service is pending now", "success");
    } catch (err) {
      swal("Something wrong", `${err?.message}`, "error");
    }
  };

  const addServiceFormInputs = serviceBookInputs.map((data) => (
    <div className="w-full" key={data.id}>
      <label className="label">
        <strong className="label-text">{data.title}</strong>
      </label>
      <input
        defaultValue={data.defVal}
        readOnly
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
      <SectionHeader title="Booking A Service" />
      <div
        className={
          " border text-black rounded-lg lg:px-20 md:px-12 px-4 py-12 my-12"
        }
      >
        <div>
          <form onSubmit={handlePurchaseService} className="space-y-3 ">
            <div className="grid md:grid-cols-2 md:gap-x-6 gap-2 mb-3">
              {addServiceFormInputs}

              <div className="w-full md:col-span-2">
                <label className="label">
                  <strong className="label-text">Service_Taking_Date</strong>
                </label>
                <input
                  name="date"
                  type="date"
                  className={`input bg-gray-100 w-full`}
                  required
                />
              </div>

              <div className="w-full md:col-span-2">
                <label className="label">
                  <strong className="label-text">
                    Your Address: Road/ Street, Area
                  </strong>
                </label>
                <input
                  type="text"
                  name="special_instruction"
                  placeholder="Enter your location in details"
                  className={`input bg-gray-100 w-full`}
                  required
                />
              </div>
            </div>

            <div>
              <button className="btn w-full font-bold bg-[#AB7442] hover:bg-gray-700 text-gray-100">
                Purchase
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookNowPage;