import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PrivateRouters = ({ children }) => {
  const { loading, user } = useAuth();

  const location = useLocation()

  if (loading) {
    return <span className="loading loading-spinner loading-sm"></span>;
  }
  if (!user) {
    return <Navigate state={location.pathname} to={"/login"} />;
  }
  return children;
};

export default PrivateRouters;