import { createBrowserRouter } from "react-router-dom";
import Root from "./../Root/Root";
import NotFoundPage from "./../../pages/NotFoundPage/NotFoundPage";
import RegisterPage from "./../../pages/RegisterPage/RegisterPage";
import HomePage from "../../pages/HomePage/HomePage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import AllServicesPage from "../../pages/AllServicesPage/AllServicesPage";
import AddServicePage from "../../pages/AddServicePage/AddServicePage";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage/>,
      },
      {
        path: "all-services",
        element: <AllServicesPage/>,
      },
      {
        path: "add-service",
        element: <AddServicePage/>,
      },
    ],
  },
]);

export default routers;
