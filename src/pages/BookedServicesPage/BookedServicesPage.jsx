import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { scrollToTop } from "../../utilities/scrollToTop";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SectionHeader from "./../../components/shared/SectionHeader/SectionHeader";
import { Link } from "react-router-dom";
import BookedService from "../../components/unique/BookedService/BookedService";
import DynamicHelmet from "../../components/shared/DynamicHelmet/DynamicHelmet";

const BookedServicesPage = () => {
  const { user } = useAuth();

  useEffect(() => {
    scrollToTop();
  }, []);

  const {
    data: services,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["booked-services"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/booked-services?email=${user?.email}`
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
      <div className="flex gap-5 justify-center items-center min-h-[80vh] flex-col">
        <h2 className="text-gray-300 font-bold text-center text-3xl">
          Your don`t have booked any service yet!
        </h2>
        <Link to="/all-services">
          <button className="btn btn-error btn-outline btn-sm">See all services</button>
        </Link>
      </div>
    );
  }

  return (
    <section className="pb-16">
      <DynamicHelmet title="Booked Services" />
      <SectionHeader
      name="Booked Services"
        title="Truck Your Booked Services"
        description={`"Track Your Engagements: Explore Your Booked Services Overview"`}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service) => (
          <BookedService key={service._id} service={service} />
        ))}
      </div>
    </section>
  );
};

export default BookedServicesPage;
