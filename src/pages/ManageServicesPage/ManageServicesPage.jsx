import useAuth from "./../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { scrollToTop } from "./../../utilities/scrollToTop";
import SectionHeader from "./../../components/shared/SectionHeader/SectionHeader";
import ManageService from "./../../components/unique/ManageService/ManageService";
import swal from "sweetalert";
import { toast } from "react-toastify";
import DynamicHelmet from "../../components/shared/DynamicHelmet/DynamicHelmet";
import { Slide } from "react-awesome-reveal";
import LoadingSpinner from "../../components/shared/LoadingSpinner/LoadingSpinner";
import ErrorComponent from "../../components/shared/ErrorComponent/ErrorComponent";
import EmptyService from "../../components/shared/EmptyService/EmptyService";

const ManageServicesPage = () => {
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
    queryKey: ["user-services"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user-services?email=${user?.email}`,
        { withCredentials: true }
      );

      return res.data;
    },
  });

  const handleDeleteService = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this service!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(
            `${import.meta.env.VITE_API_URL}/delete-service/${id}`
          );
          toast.success("Delete Success", {
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
        title={`You don't have Added any service Yet!`}
        url="add-service"
        btnText="Add Service"
      />
    );
  }

  return (
    <section className="pb-16">
      <DynamicHelmet title="Manage Services" />
      <SectionHeader
        name="Manage Service"
        title="Efficiently Oversee Your Existing Services"
        description={`In here you can view, update, or delete listings as a provider.`}
      />
      <Slide direction="up">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-neutral text-neutral-content ">
              <tr className="text-center">
                <th>SN.</th>
                <th>Service Name</th>
                <th>Price</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <ManageService
                  key={service._id}
                  service={service}
                  index={index + 1}
                  handleDeleteService={handleDeleteService}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Slide>
    </section>
  );
};

export default ManageServicesPage;
