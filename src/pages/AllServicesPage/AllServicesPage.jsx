import axios from "axios";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import { useEffect, useState } from "react";
import { scrollToTop } from "../../utilities/scrollToTop";
import DynamicHelmet from "./../../components/shared/DynamicHelmet/DynamicHelmet";
import ServiceCard from "../../components/unique/ServiceCard/ServiceCard";
import { useLoaderData } from "react-router-dom";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

const AllServicesPage = () => {
  const [searchText, setSearchText] = useState("");
  const [services, setServices] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // pagination related variables:
  const { count } = useLoaderData();
  const [currentPage, setCurrentPage] = useState(1);
  const totalServices = count;
  const perPageService = 6;
  const totalNumberOfPages = Math.ceil(totalServices / perPageService);
  const pageNumbers = [...Array(totalNumberOfPages).keys()];

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/services?search=${searchText}&totalPerPage=${perPageService}&currentPage=${currentPage}`
        );
        setServices(res.data);
      } catch (error) {
        setIsError(error?.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [searchText, currentPage]);

  const handleSearchService = (e) => {
    e.preventDefault();
    const value = e.target.search.value;
    setSearchText(value);
  };

  const handleSearchOnChange = (e) => {
    const searchVal = e.target.value;
    setSearchText(searchVal);
  };

  const handleGetCurrentPage = (currPage) => {
    setCurrentPage(currPage);
    setSearchText("");
  };

  const handlePrevBtn = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextBtn = () => {
    if (currentPage < totalNumberOfPages) {
      setCurrentPage(currentPage + 1);
    }
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
    <section className="mb-16">
      <DynamicHelmet title="Services" />
      <SectionHeader
        title="Explore All Services"
        description="Explore a comprehensive array of services catering to all your electronics needs. From repairs to customizations, find everything under one roof!"
      />
      <div className="mb-10">
        <form onSubmit={handleSearchService} className="w-full">
          <label className="input input-bordered rounded-full max-w-md flex mx-auto items-center gap-2">
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
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
      {services.length <= 0 && (
        <h2 className="text-2xl font-semibold italic text-gray-300 py-10 text-center">
          Sorry, No service have match in your search!
        </h2>
      )}

      <div
        className={`flex justify-center items-center py-8 ${
          searchText && "hidden"
        }`}
      >
        <button
          onClick={handlePrevBtn}
          disabled={currentPage === 1}
          className="flex items-center btn-error btn-outline rounded-[33px] px-8 btn mr-4"
        >
          <FaArrowLeftLong />
          Prev
        </button>
        <ul className={`grid gap-2 grid-cols-1 md:flex`}>
          {pageNumbers?.map((number, index) => (
            <button
              onClick={() => handleGetCurrentPage(index + 1)}
              className={`btn btn-circle ${
                currentPage === number + 1 ? "btn-error text-base-100" : ""
              }`}
              key={number}
            >
              {number + 1}
            </button>
          ))}
        </ul>
        <button
          onClick={handleNextBtn}
          disabled={currentPage === totalNumberOfPages}
          className="flex items-center btn-outline btn-error rounded-[33px] px-8 btn ml-4"
        >
          Next
          <FaArrowRightLong />
        </button>
      </div>
    </section>
  );
};

export default AllServicesPage;
