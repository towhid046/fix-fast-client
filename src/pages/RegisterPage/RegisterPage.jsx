import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/AuthProvider/AuthProvider";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { scrollToTop } from "./../../utilities/scrollToTop";
import swal from "sweetalert";
import { Slide } from "react-awesome-reveal";
// import MyHelmate from './../../components/Shared/MyHelmate/MyHelmate';

const RegisterPage = () => {
  const { createUser, updateUserProfile, setLoading, mode } =
    useContext(UserContext);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    scrollToTop();
  }, []);

  const handelRegisterForm = (e) => {
    e.preventDefault();

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;
    const userName = form.name.value;
    const imgUrl = form.imgurl.value;
    setPasswordError(null);

    if (password.length < 6) {
      setPasswordError("Password must be 6 character");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must be an Uppercase latter");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must be a lowercase latter");
      return;
    }

    createUser(email, password)
      .then((res) => {
        swal(
          "Register Success!",
          "You have successfully registered",
          "success"
        );
        navigate("/");
        updateUserProfile(userName, imgUrl)
          .then((result) => {
            setLoading(false);
          })
          .catch((error) => console.error(error));
        e.target.reset();
      })
      .catch((err) => {
        swal("Error", "This email already registered please login", "error");
        navigate("/login");
        setLoading(false);
      });
  };

  const handelShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handelPasswordOnChange = (e) => {
    const password = e.target.value;
    setPasswordError(null);

    if (password.length < 6) {
      setPasswordError("Password must be 6 character");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must be an Uppercase latter");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must be a lowercase latter");
      return;
    }
  };

  return (
    <div>
      {/* <MyHelmate title="Registration"/> */}
      <div className="hero md:min-h-screen container-fluid pt-12 mb-16">
        <div className="w-full px-4">
          <Slide direction="down">
            <div
              className={`max-w-xl   bg-base-100 border mx-auto md:p-12 py-8 px-6 ${
                mode ? "border-gray-300" : "border-gray-700"
              }`}
            >
              <h1 className="text-2xl font-bold text-center mb-8">
                Register your account
              </h1>
              <hr />
              <form onSubmit={handelRegisterForm} className="mt-5 text-black">
                <div>
                  <label className="label">
                    <strong className="label-text">Your Name</strong>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className="focus:  input w-full     bg-[#f3f3f3]"
                    required
                  />
                </div>

                <div>
                  <label className="label">
                    <strong className="label-text">Email</strong>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="focus:  input w-full     bg-[#f3f3f3]"
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <strong className="label-text">Photo URL</strong>
                  </label>
                  <input
                    type="text"
                    name="imgurl"
                    placeholder="Enter your photo url"
                    className="focus:  input w-full     bg-[#f3f3f3]"
                    required
                  />
                </div>
                <div className="relative">
                  <label className="label">
                    <strong className="label-text">Password</strong>
                  </label>
                  <input
                    onChange={handelPasswordOnChange}
                    type={isShowPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="focus:  w-full input     bg-[#f3f3f3]"
                    required
                  />

                  {/* password show eye off-on */}
                  <div className="absolute right-3 bottom-4">
                    {isShowPassword ? (
                      <span
                        className="cursor-pointer"
                        onClick={handelShowPassword}
                      >
                        <LuEye />
                      </span>
                    ) : (
                      <span
                        className="cursor-pointer"
                        onClick={handelShowPassword}
                      >
                        <LuEyeOff />
                      </span>
                    )}
                  </div>
                </div>
                <small className="text-red-600">{passwordError}</small>
                <div className="flex items-center gap-1 mt-6">
                  <input
                    type="checkbox"
                    id="terms-contition"
                    className="checkbox checkbox-sm  "
                    required
                  />
                  <label htmlFor="terms-contition" className="cursor-pointer">
                    <span>Accept Term & Conditions</span>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn w-full   font-bold bg-[#AB7442] hover:bg-gray-700 text-gray-100">
                    Register
                  </button>
                </div>
              </form>
              <p className="text-center mt-5">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className=" cursor-pointer text-[#AB7442] font-semibold"
                >
                  Login
                </Link>
              </p>
            </div>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;