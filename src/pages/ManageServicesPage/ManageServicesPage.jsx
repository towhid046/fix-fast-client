import useAuth from "./../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { scrollToTop } from "./../../utilities/scrollToTop";
import SectionHeader from "./../../components/shared/SectionHeader/SectionHeader";
import ManageService from "./../../components/unique/ManageService/ManageService";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
        `${import.meta.env.VITE_API_URL}/user-services?email=${user?.email}`
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
    <section className="pb-16">
      {services.length ? (
        <>
          <SectionHeader />
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-black text-white ">
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
        </>
      ) : (
        <div className="flex flex-col gap-5 justify-center items-center min-h-[80vh]">
          <h2 className="text-gray-300 font-bold text-center text-3xl">
            Your don`t have added any service yet
          </h2>
          <Link to="/add-service">
            <button className="btn btn-info btn-sm">Add Service</button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default ManageServicesPage;