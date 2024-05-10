import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PrivateRouters = ({ children }) => {
  const { loading, user } = useAuth();
  if (loading) {
    return <span className="loading loading-spinner loading-sm"></span>;
  }
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default PrivateRouters;