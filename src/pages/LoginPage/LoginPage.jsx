import { Link, useLocation, useNavigate } from "react-router-dom";
import googleLogo from "../../../src/assets/icons/google-logo.png";
import { useContext, useEffect, useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { UserContext } from "../../providers/AuthProvider/AuthProvider";
import { scrollToTop } from "../../utilities/scrollToTop";
import DynamicHelmet from "../../components/shared/DynamicHelmet/DynamicHelmet";

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
    } catch (error) {
      swal("ERROR", `${error?.message}`, "error");
    }
  };

  const handelShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div>
      <DynamicHelmet title="Login"/>

      <div className="hero md:min-h-screen container-fluid pt-12 pb-8 mb-12">
        <div className="w-full px-4">
          <div
            className={`max-w-xl border  bg-base-100 mx-auto md:p-12 py-8 px-6 border-gray-700"
              }`}
          >
            <h1 className="text-2xl font-bold text-center mb-8">
              Login your account
            </h1>
            <hr />
            <form onSubmit={handelLoginForm} className="mt-5 text-black">

              <div>
                <label className="label">
                  <strong className="label-text">Email address</strong>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="focus:  input w-full   bg-[#f3f3f3]"
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
                  className="focus:  w-full input  bg-[#f3f3f3]"
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
                <button className="btn w-full   font-bold bg-[#AB7442] hover:bg-gray-700 text-gray-100">
                  Log in
                </button>
              </div>

            </form>

            <div>
              <div className="text-center mb-4">
                <h2 className="text-2xl">Or</h2>
                <p>Log In with</p>
              </div>
              <div className="flex justify-center gap-5">
                <button
                  onClick={handelLogInWithGoogle}
                  className="btn flex items-center gap-2  "
                >
                  <img className="w-8" src={googleLogo} alt="Google" />
                  <span> Google</span>
                </button>
              </div>
            </div>
            <p className="text-center mt-5">
              Don`t have an account?{" "}
              <Link
                to={"/register"}
                className=" cursor-pointer text-[#AB7442] font-semibold"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
