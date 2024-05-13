import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../../firebase/firebase.config";
import PropTypes from "prop-types";
import axios from "axios";

export const UserContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logOutUser = () => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/logout`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    setLoading(false);
    return signOut(auth);
  };

  const updateUserProfile = (displayName, photoURL) => {
    setLoading(true);
    return updateProfile(auth.currentUser, { displayName, photoURL });
  };

  // Truck the current user status:
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        const loggedUser = currentUser?.email;
        axios
          .post(`${import.meta.env.VITE_API_URL}/jwt`, { loggedUser })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
    return () => unSubscribe();
  }, []);

  const userInfo = {
    createUser,
    user,
    logOutUser,
    loginUser,
    setLoading,
    loading,
    updateUserProfile,
    logInWithGoogle,
  };

  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
