import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { Link } from "react-router-dom";
import DynamicHelmet from "../../components/shared/DynamicHelmet/DynamicHelmet";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import ServiceTodo from "../../components/unique/ServiceTodo/ServiceTodo";
import { useEffect } from "react";
import { scrollToTop } from "./../../utilities/scrollToTop";

const ServicesTodo = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  const { user } = useAuth();
  const {
    data: services,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["todo-services"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/todo-services?email=${user?.email}`
      );
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

  if (!services.length) {
    return (
      <div className="flex flex-col gap-5 justify-center items-center min-h-[80vh]">
        <h2 className="text-gray-300 font-bold text-center text-3xl">
          Your service to do is empty now. To get service order
        </h2>
        <Link to="/add-service">
          <button className="btn btn-info btn-sm">Add Service</button>
        </Link>
      </div>
    );
  }

  return (
    <section className="pb-16">
      <DynamicHelmet title="Manage Services" />

      <SectionHeader title="Services Todo" 
      description={`"Stay on Task: Manage Your Pending Service Requests Effortlessly"`}
      />
      <div className="flex flex-col gap-5">
        {services.map((service, index) => (
          <ServiceTodo key={service._id} service={service} index={index + 1} />
        ))}
      </div>
    </section>
  );
};

export default ServicesTodo;
