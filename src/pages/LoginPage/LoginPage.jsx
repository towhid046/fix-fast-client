import { Link, useLocation, useNavigate } from "react-router-dom";
import googleLogo from "../../../src/assets/icons/google-logo.png";
import { useContext, useEffect, useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { UserContext } from "../../providers/AuthProvider/AuthProvider";
import { scrollToTop } from "../../utilities/scrollToTop";
import DynamicHelmet from "../../components/shared/DynamicHelmet/DynamicHelmet";
import SectionHeader from "./../../components/shared/SectionHeader/SectionHeader";
import { Slide } from "react-awesome-reveal";

const Login = () => {
  const { loginUser, logInWithGoogle, setLoading } = useContext(UserContext);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    scrollToTop();
  }, []);

  const handelLoginForm = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await loginUser(email, password);
      swal("Login Success", "You have login successfully", "success");
      e.target.reset();
      navigate(location?.state ? location.state : "/");
    } catch (err) {
      toast.error(`Something went wrong! ${err?.message} `, {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const handelLogInWithGoogle = async () => {
    try {
      await logInWithGoogle();
      swal("Login Success", "You have login successfully", "success");
      navigate(location?.state ? location.state : "/");
    } catch (err) {
      console.error(err);
    }
  };

  const handelShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div>
      <DynamicHelmet title="Login" />
      <SectionHeader
        title="Log In Your account"
        description="Sign in to Your Account: Access Your Profile and Services"
      />

      <Slide direction="down">
        <div className="hero  pb-8 mb-12">
          <div className="w-full">
            <div
              className={`max-w-xl border rounded-lg bg-base-100 mx-auto md:p-12 py-5 px-4 "
              }`}
            >
              <div className="text-center">
                <div className="flex justify-center gap-5 mb-3">
                  <button
                    onClick={handelLogInWithGoogle}
                    className="btn flex items-center gap-2  w-full "
                  >
                    <img className="w-5" src={googleLogo} alt="Google" />
                    <span>Continue With Google</span>
                  </button>
                </div>
                <div>
                  <em className="text-2xl">Or</em>
                  <p>Log In with Email</p>
                </div>
              </div>

              <form onSubmit={handelLoginForm} className="mt-5 text-black">
                <div>
                  <label className="label">
                    <strong className="label-text">Email address</strong>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="bg-base-200 text-base-content w-full focus:outline-none border-2 focus:border-neutral-content  input"
                    required
                  />
                </div>

                <div className="relative">
                  <label className="label">
                    <strong className="label-text">Password</strong>
                  </label>
                  <input
                    type={isShowPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="input bg-base-200 text-base-content w-full focus:outline-none border-2 focus:border-neutral-content"
                    required
                  />

                  {/* password show eye off-on */}
                  <div className="absolute right-3 bottom-4 ">
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

                <div className="form-control my-5">
                  <button className="btn w-full   font-bold btn-error text-base-100">
                    Log in
                  </button>
                </div>
              </form>

              <p className="text-center mt-5">
                Don`t have an account?{" "}
                <Link
                  to={"/register"}
                  className=" cursor-pointer italic link link-neutral-content font-semibold"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Slide>
    </div>
  );
};

export default Login;
