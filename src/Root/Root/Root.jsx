import Navbar from "./../../components/shared/Navbar/Navbar";
import Footer from "./../../components/shared/Footer/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Root = () => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Root;
