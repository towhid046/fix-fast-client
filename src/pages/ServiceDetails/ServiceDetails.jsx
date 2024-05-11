import { Link, useLoaderData } from "react-router-dom";
import { scrollToTop } from "./../../utilities/scrollToTop";
import { useEffect } from "react";
import SectionHeader from "./../../components/shared/SectionHeader/SectionHeader";
import DynamicHelmet from "../../components/shared/DynamicHelmet/DynamicHelmet";

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
    provider_info: { name, email, photo },
  } = service;

  return (
    <section className="mb-16">
      <DynamicHelmet title="Service Details"/>
      <SectionHeader />
      <div className="p-5 rounded-lg border">
        <div className="  flex lg:flex-row flex-col xl:gap-8 gap-6 mb-10">
          <figure className="flex-1">
            <img
              src={image_url}
              className="rounded-lg w-full"
              alt={service_name + " Image"}
            />
          </figure>
          <div className=" space-y-3 flex-1">
            <h2 className="font-bold text-3xl">{service_name}</h2>
            <p>
              <strong>Price: {price}</strong>
            </p>
            <strong>Service Area: {service_area}</strong>
            <p>
              <em>Description: </em>
              {description.split(" ").slice(0, 100).join(" ")}
            </p>
            <div>
              <Link to={`/booking/${_id}`}>
                <button className=" btn btn-info w-full ">Book Now</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center space-y-3 flex-auto">
          <h2 className="text-xl text-gray-400 font-semibold mb-5">
            Service Provider Info
          </h2>
          <figure>
            <img className="rounded-full w-24 h-24" src={photo} alt="" />
          </figure>
          <h2 className="text-xl font-bold">Name: {name}</h2>
          <p>Email: {email}</p>
          <p>Location: {service_area}</p>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
