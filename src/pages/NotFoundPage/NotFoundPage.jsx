import { Link } from "react-router-dom";
import DynamicHelmet from './../../components/shared/DynamicHelmet/DynamicHelmet';

const NotFoundPage = () => {
  return (
    <section className="min-h-screen flex flex-col gap-5 justify-center items-center space-y-5">
      <DynamicHelmet title="Error"/>
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
