import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SingleService from "../../components/unique/SingleService/SingleService";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import { useEffect } from "react";
import { scrollToTop } from "../../utilities/scrollToTop";
import DynamicHelmet from './../../components/shared/DynamicHelmet/DynamicHelmet';

const AllServicesPage = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

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
      <DynamicHelmet title='Services'/>
      <SectionHeader />
      <div className="flex flex-col gap-6">
        {services?.map((service) => (
          <SingleService key={service._id} service={service} />
        ))}
      </div>
    </section>
  );
};

export default AllServicesPage;
