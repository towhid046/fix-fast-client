import PropTypes from "prop-types";
import { CiCalendar } from "react-icons/ci";
import { Link } from "react-router-dom";

const NewsCard = ({ info = "" }) => {
  const { _id, id, thumbnail_img, title, release_date, description, author } =
    info;

  return (
    <div className="bg-base-100  border rounded-lg justify-between flex flex-col">
      <figure className="relative overflow-hidden rounded-lg p-5">
        <Link to={`/news-details/${_id}`} className=" overflow-hidden">
          <img
            className="rounded-lg h-60 w-full cursor-pointer"
            src={thumbnail_img}
            alt="News Image"
          />
        </Link>
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
          <h2 className="text-xl font-semibold mb-3">
            {title.split(" ").splice(0, 3).join(" ")}...
          </h2>
          <p>
            {description?.split("").splice(0, 55).join("")}...{" "}
            <Link
              to={`/news-details/${_id}`}
              className="link link-error font-medium italic"
            >
              Read More
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

NewsCard.propTypes = {
  info: PropTypes.object.isRequired,
};

export default NewsCard;
