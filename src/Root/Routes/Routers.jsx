import { createBrowserRouter } from "react-router-dom";
import Root from "./../Root/Root";
import NotFoundPage from "./../../pages/NotFoundPage/NotFoundPage";
import RegisterPage from "./../../pages/RegisterPage/RegisterPage";
import HomePage from "../../pages/HomePage/HomePage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import AllServicesPage from "../../pages/AllServicesPage/AllServicesPage";
import AddServicePage from "../../pages/AddServicePage/AddServicePage";
import PrivateRouters from "./PrivateRouters";
import ServiceDetails from "../../pages/ServiceDetails/ServiceDetails";
import BookNowPage from "../../pages/BookNowPage/BookNowPage";
import ManageServicesPage from "../../pages/ManageServicesPage/ManageServicesPage";
import UpdateServicePage from "../../pages/UpdateServicePage/UpdateServicePage";
import BookedServicesPage from "../../pages/BookedServicesPage/BookedServicesPage";
import ServicesTodo from "../../pages/ServicesTodo/ServicesTodo";
import NewsDetails from "../../pages/NewsDetails/NewsDetails";
import AllNewsPage from "../../pages/AllNewsPage/AllNewsPage";

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
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/all-services",
        element: <AllServicesPage />,
      },
      {
        path: "/add-service",
        element: (
          <PrivateRouters>
            <AddServicePage />
          </PrivateRouters>
        ),
      },
      {
        path: "/service-details/:id",
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/services/${params.id}`),
        element: (
          <PrivateRouters>
            <ServiceDetails />
          </PrivateRouters>
        ),
      },
      {
        path: "/booking/:id",
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/services/${params.id}`),
        element: (
          <PrivateRouters>
            <BookNowPage />
          </PrivateRouters>
        ),
      },
      {
        path: "/manage-services",
        element: (
          <PrivateRouters>
            <ManageServicesPage />
          </PrivateRouters>
        ),
      },
      {
        path: "/update-service/:id",
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/services/${params.id}`),
        element: (
          <PrivateRouters>
            <UpdateServicePage />
          </PrivateRouters>
        ),
      },
      {
        path: "/all-news",
        element: <AllNewsPage />,
      },
      {
        path: "/news-details/:id",
        loader: ({ params }) =>
          fetch(
            `${import.meta.env.VITE_API_URL}/news/${params.id}`
          ),
        element: <NewsDetails />,
      },
      {
        path: "/booked-services",
        element: (
          <PrivateRouters>
            <BookedServicesPage />
          </PrivateRouters>
        ),
      },
      {
        path: "/todo-services",
        element: (
          <PrivateRouters>
            <ServicesTodo />
          </PrivateRouters>
        ),
      },
    ],
  },
]);

export default routers;
