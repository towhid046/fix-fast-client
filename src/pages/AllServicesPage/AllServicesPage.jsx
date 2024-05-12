import axios from "axios";
import SingleService from "../../components/unique/SingleService/SingleService";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import { useEffect, useState } from "react";
import { scrollToTop } from "../../utilities/scrollToTop";
import DynamicHelmet from "./../../components/shared/DynamicHelmet/DynamicHelmet";

const AllServicesPage = () => {
  const [searchText, setSearchText] = useState("");
  const [services, setServices] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/services?search=${searchText}`
        );
        setServices(res.data);
      } catch (error) {
        setIsError(error?.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [searchText]);

  const handleSearchService = (e) => {
    e.preventDefault();
    const value = e.target.search.value;
    setSearchText(value);
  };

  const handleSearchOnChange = (e) => {
    const searchVal = e.target.value;
      setSearchText(searchVal);
  };

  if (isError) {
    return (
      <div className="flex justify-center py-12 min-h-[80vh] items-center">
        <h2 className="text-2xl font-bold text-gray-300">{isError}</h2>
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
      <DynamicHelmet title="Services" />
      <SectionHeader 
      title="Explore All Services"
      description="Explore a comprehensive array of services catering to all your electronics needs. From repairs to customizations, find everything under one roof!"
      />
      <div className="my-8">
        <form onSubmit={handleSearchService} className="w-full">
          <label className="input input-bordered max-w-md flex mx-auto items-center gap-2">
            <input
              onChange={handleSearchOnChange}
              type="text"
              name="search"
              className="grow"
              placeholder="Search by service name"
            />
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-5 h-5 opacity-70 cursor-pointer"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </label>
        </form>
      </div>
      <div className="flex flex-col gap-6">
        {services?.map((service) => (
          <SingleService key={service._id} service={service} />
        ))}
      </div>
      {services.length <= 0 && (
        <h2 className="text-2xl font-semibold italic text-gray-300 py-10 text-center">
          Sorry, No service have match in your search!
        </h2>
      )}
    </section>
  );
};

export default AllServicesPage;
