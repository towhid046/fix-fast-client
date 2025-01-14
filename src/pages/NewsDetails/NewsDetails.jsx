import { Link, useLoaderData } from "react-router-dom";
import { CiCalendar } from "react-icons/ci";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import { useEffect } from "react";
import { scrollToTop } from "./../../utilities/scrollToTop";
import { HiMiniArrowUpLeft } from "react-icons/hi2";
import { Slide } from "react-awesome-reveal";

const NewsDetails = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  const singleNews = useLoaderData();
  const { _id, id, thumbnail_img, title, release_date, description, author } =
    singleNews;

  return (
    <section className="mb-16">
      <SectionHeader
      name="News Details"
        title={title}
        description={description?.split(" ").splice(0, 15).join(" ")}
      />
      <Slide direction="down">
      <div className="max-w-3xl mx-auto">
      <div className="mb-5 flex">
      <Link to={"/all-news"} className="flex justify-center">
        <button className=" link link-error font-semibold flex items-center ">
          <HiMiniArrowUpLeft className="text-xl" />
          Back to All News
        </button>
      </Link>
      </div>
        <div className="bg-base-100 border rounded-lg justify-between flex flex-col">
          <figure className="relative overflow-hidden">
            <img
              className="max-h-80 w-full"
              src={thumbnail_img}
              alt="News Image"
            />
          </figure>
          <div className="p-5 ">
            <div className=" space-y-4">
            <ul className="flex flex-wrap gap-4 justify-between items-start">
            <li className="flex items-center gap-2">
              <img
                className="w-10 h-10 rounded-full"
                src={author?.image}
                alt=""
              />
              <div>
                <span className="text- font-semibold text-md">
                  {author?.name}
                </span>
                <p>
                  <em>
                    <small className="text-gray-400">Germany</small>
                  </em>
                </p>
              </div>
            </li>
            <li className="flex items-center gap-2">
              <CiCalendar className="text-error text-xl" />
              <small className="text-gray-400">{release_date}</small>
            </li>
          </ul>
              <hr />
              <h2 className="text-xl font-semibold mb-3">{title}</h2>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
      </Slide>
    </section>
  );
};

export default NewsDetails;
