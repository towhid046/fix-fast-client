import { Link } from "react-router-dom";
import DynamicHelmet from './../../components/shared/DynamicHelmet/DynamicHelmet';

const NotFoundPage = () => {
  return (
    <section className="min-h-screen bg-gray-900 flex flex-col gap-3 justify-center items-center">
      <DynamicHelmet title="Error"/>
      <h1 className="text-gray-400 font-bold xl:text-5xl lg:text-4xl text-3xl">Opps! Error: 404</h1>
      <h2 className="text-gray-600 font-semibold text-center lg:text-3xl text-2xl">
        Page not found
      </h2>
      <Link to={"/"} className="">
        <button className="btn md:btn-md btn-sm btn-error btn-outline">Return to Home</button>
      </Link>
    </section>
  );
};

export default NotFoundPage;
