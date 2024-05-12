import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SectionHeader from "./../../shared/SectionHeader/SectionHeader";
import ServiceCard from "../ServiceCard/ServiceCard";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";

const PopularServices = () => {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/services`);
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

  if (isError) {
    return (
      <div className="flex justify-center py-12 min-h-screen ">
        <h2 className="text-2xl font-bold text-gray-300">{error}</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12 min-h-screen ">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="mb-12">
      <SectionHeader
        title="Discover Our Popular Services"
        description="Unlock a world of premier electronics solutions with our popular services. Explore top-rated offerings trusted by providers and consumers alike!"
      />
      <div className="flex flex-col gap-6">
        {services?.slice(0, 6).map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
      <Link to={"/all-services"} className="flex justify-center">
        <button className="btn rounded-3xl mt-6 btn-outline btn-error btn-wide flex items-center gap-2">
          View All
          <BsArrowRight className="text-xl" />
        </button>
      </Link>
    </section>
  );
};

export default PopularServices;
