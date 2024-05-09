import Navbar from "./../../components/shared/Navbar/Navbar";
import Footer from "./../../components/shared/Footer/Footer";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;
