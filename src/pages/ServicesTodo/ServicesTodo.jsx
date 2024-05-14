import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { Link } from "react-router-dom";
import DynamicHelmet from "../../components/shared/DynamicHelmet/DynamicHelmet";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import ServiceTodo from "../../components/unique/ServiceTodo/ServiceTodo";
import { useEffect } from "react";
import { scrollToTop } from "./../../utilities/scrollToTop";
import LoadingSpinner from "../../components/shared/LoadingSpinner/LoadingSpinner";
import ErrorComponent from "../../components/shared/ErrorComponent/ErrorComponent";
import EmptyService from "../../components/shared/EmptyService/EmptyService";

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
    return <ErrorComponent error={error} />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!services.length) {
    return (
      <EmptyService
        title={`Your To Do service is empty now! To get service order`}
        url="add-service"
        btnText="Add Service"
      />
    );
  }

  return (
    <section className="pb-16">
      <DynamicHelmet title="Manage Services" />

      <SectionHeader
        name="Services Todo"
        title="Services You Have Got to Work With "
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
