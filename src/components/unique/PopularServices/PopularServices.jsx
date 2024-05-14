import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SectionHeader from "./../../shared/SectionHeader/SectionHeader";
import ServiceCard from "../ServiceCard/ServiceCard";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Slide } from "react-awesome-reveal";
import LoadingSpinner from "./../../shared/LoadingSpinner/LoadingSpinner";
import ErrorComponent from "./../../shared/ErrorComponent/ErrorComponent";

const PopularServices = () => {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/services`, {
      withCredentials: true,
    });
    return res.data;
  };

  const {
    data: services,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: getData,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorComponent error={error} />;
  }

  return (
    <section className="mb-6">
      <SectionHeader
        name="Popular services"
        title="Discover Our Popular Services"
        description="Unlock a world of premier electronics solutions with our popular services. Explore top-rated offerings trusted by providers and consumers alike!"
      />
      <div className="flex flex-col gap-6">
        {services?.slice(0, 5).map((service, index) => (
          <ServiceCard key={service._id} service={service} index={index} />
        ))}
      </div>
      <Slide direction="up">
        <div className="flex justify-center my-7">
          <Link to={"/all-services"}>
            <button className="rounded-full md:px-12 px-5 btn btn-outline btn-error ">
              View All Services
              <BsArrowRight className="text-xl" />
            </button>
          </Link>
        </div>
      </Slide>
    </section>
  );
};

export default PopularServices;
