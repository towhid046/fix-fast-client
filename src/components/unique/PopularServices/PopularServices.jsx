import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SectionHeader from "./../../shared/SectionHeader/SectionHeader";
import ServiceCard from "../ServiceCard/ServiceCard";
import { Link } from "react-router-dom";

const PopularServices = () => {
  const {
    data: services,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/services`);
      return res.data;
    },
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
      <SectionHeader />
      <div className="flex flex-col gap-6">
        {services?.slice(0, 6).map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
      <Link to={"/all-services"} className="flex justify-center">
        <button className="btn rounded-3xl mt-6 btn-outline btn-primary btn-wide">
          View All
        </button>
      </Link>
    </section>
  );
};

export default PopularServices;
