import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { scrollToTop } from "../../utilities/scrollToTop";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SectionHeader from "./../../components/shared/SectionHeader/SectionHeader";
import BookedService from "../../components/unique/BookedService/BookedService";
import DynamicHelmet from "../../components/shared/DynamicHelmet/DynamicHelmet";
import LoadingSpinner from "../../components/shared/LoadingSpinner/LoadingSpinner";
import ErrorComponent from "./../../components/shared/ErrorComponent/ErrorComponent";
import EmptyService from "../../components/shared/EmptyService/EmptyService";

import swal from "sweetalert";
import { toast } from "react-toastify";

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
    refetch,
  } = useQuery({
    queryKey: ["booked-services"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/booked-services?email=${user?.email}`
      );

      return res.data;
    },
  });

  const handleCancelBookedService = (id) => {
    swal({
      title: "Are you sure?",
      text: "Want to cancel this service!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(
            `${import.meta.env.VITE_API_URL}/booked-service/${id}`
          );

          toast.success("Service Canceled", {
            autoClose: 2000,
          });
          refetch();
        } catch (error) {
          swal("Error", "Something went wrong, Please try again", "error");
        }
      }
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorComponent error={error} />;
  }

  if (!services.length) {
    return (
      <EmptyService
        title={`You don't have booked any service Yet!`}
        url="all-services"
        btnText="See all Services"
      />
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
          <BookedService
            key={service._id}
            service={service}
            handleCancelBookedService={handleCancelBookedService}
          />
        ))}
      </div>
    </section>
  );
};

export default BookedServicesPage;
