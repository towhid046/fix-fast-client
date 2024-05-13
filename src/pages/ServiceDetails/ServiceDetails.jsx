import { Link, useLoaderData } from "react-router-dom";
import { scrollToTop } from "./../../utilities/scrollToTop";
import { useEffect } from "react";
import SectionHeader from "./../../components/shared/SectionHeader/SectionHeader";
import DynamicHelmet from "../../components/shared/DynamicHelmet/DynamicHelmet";
import { MdOutlineLocationOn } from "react-icons/md";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { IoMdMail } from "react-icons/io";
import { Slide } from "react-awesome-reveal";

const ServiceDetails = () => {
  const service = useLoaderData();

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
    provider_info: { name, email, photo, rating },
  } = service;

  return (
    <section className="mb-16">
      <DynamicHelmet title="Service Details" />
      <SectionHeader
        name="Service Details"
        title={service_name}
        description={`Discover the details of our ${service_name} service, available in ${service_area}.
      `}
      />
      <div className="p-5 rounded-lg border">
        <div className="  flex lg:flex-row flex-col xl:gap-8 gap-6 mb-10">
          <Slide direction="right" className="flex-1">
            <figure className="overflow-hidden rounded-lg ">
              <img
                src={image_url}
                className="rounded-lg w-full"
                alt={service_name + " Image"}
              />
            </figure>
          </Slide>
          <Slide direction="left" className="flex-1">
            <div className=" space-y-6 flex-1">
              <div>
                <h2 className="font-bold text-2xl mb-3">{service_name}</h2>
                <p className="flex items-center gap-2 mb-1">
                  <HiOutlineCurrencyDollar className="text-xl text-error" />
                  <strong>
                    <em>${price}</em>
                  </strong>
                </p>
                <p className="flex items-center gap-2">
                  <MdOutlineLocationOn className="text-xl text-error" />
                  <strong>
                    <em>{service_area}</em>
                  </strong>
                </p>
              </div>
              <p>
                <em>Description: </em>
                {description.split(" ").slice(0, 70).join(" ")}.
              </p>
              <div>
                <Link to={`/booking/${_id}`}>
                  <button className=" btn btn-error text-base-100 w-full ">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          </Slide>
        </div>
        <Slide direction="down">
          <div className="flex flex-col items-center space-y-3 flex-auto">
            <h2 className="text-xl italic  font-bold my-5  border-b pb-3 w-full lg:border-0 text-center">
              Service Provider
            </h2>
            <figure>
              <img className="rounded-full w-28 h-28" src={photo} alt="" />
            </figure>
            <h2 className="text-lg font-semibold">Name: {name}</h2>
            <p>Rating: {rating}</p>
            <p className="flex items-center gap-2">
              <IoMdMail className="text-xl text-error" />
              {email}
            </p>
            <p className="flex items-center gap-2">
              <MdOutlineLocationOn className="text-xl text-error" />
              {service_area}
            </p>{" "}
          </div>
        </Slide>
      </div>
    </section>
  );
};

export default ServiceDetails;
