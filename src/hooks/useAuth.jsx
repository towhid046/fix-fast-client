import { useContext } from "react";
import { UserContext } from "./../providers/AuthProvider/AuthProvider";

const useAuth = () => {
    const userInformation = useContext(UserContext);
  return userInformation || {};
};

export default useAuth;
