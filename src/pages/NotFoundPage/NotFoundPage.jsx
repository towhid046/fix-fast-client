import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="min-h-screen flex justify-center items-center space-y-5">
      <h2 className="text-gray-300 font-semibold text-center text-3xl">
        Page not found
      </h2>
      <Link to={"/"} className="">
        <button className="btn btn-error">Return to Home</button>
      </Link>
    </section>
  );
};

export default NotFoundPage;
