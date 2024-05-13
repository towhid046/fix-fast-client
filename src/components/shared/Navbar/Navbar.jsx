import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { LuMenu } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { Tooltip } from "react-tooltip";

const Navbar = () => {
  const [theme, setTheme] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/all-services"}>Services</NavLink>
      </li>
      {user && (
        <li className="relative dashboard-nav-link">
          <span className="flex items-center gap-2 cursor-pointer hover:text-[#dd3333]">
            Dashboard
            <IoIosArrowDown className="down-arrow-icon transition-transform transform text-lg duration-500" />
          </span>
          <ul className="absolute top-0 w-max bg-base-100 p-4 transition-all duration-500 ease-in-out  flex flex-col gap-3 rounded-b-lg shadow-xl ">
            <li>
              <NavLink to={"/add-service"}>Add Service</NavLink>
            </li>
            <li>
              <NavLink to={"/manage-services"}>Manage Service</NavLink>
            </li>
            <li>
              <NavLink to={"/booked-services"}>Booked Services</NavLink>
            </li>
            <li>
              <NavLink to={"/todo-services"}>Service To Do</NavLink>
            </li>
          </ul>
        </li>
      )}
    </>
  );

  const menuLinks = (
    <ul
      className={`${
        isChecked ? "flex flex-col" : "hidden"
      } absolute bg-base-100 px-8 md:py-10 md:px-14 py-4 gap-4 md:gap-5 mt-12 rounded-b-xl flex flex-col w-max transition duration-500  ease-in-out menu-items-common font-medium  border-b`}
    >
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/all-services"}>Services</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to={"/add-service"}>Add Service</NavLink>
          </li>
          <li>
            <NavLink to={"/manage-services"}>Manage Service</NavLink>
          </li>
          <li>
            <NavLink to={"/booked-services"}>Booked Services</NavLink>
          </li>
          <li>
            <NavLink to={"/todo-services"}>Service To Do</NavLink>
          </li>
        </>
      )}
    </ul>
  );

  const handleMenuChecked = () => {
    setIsChecked(!isChecked);
  };

  const handleLogOutUser = async () => {
    try {
      await logOutUser();
      swal("Log Out Success!", "You have successfully Log out", "success");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const html = document.getElementById("html");
    if (theme) {
      html.attributes[2].value = "dark";
      return;
    }
    html.attributes[2].value = "light";
  }, [theme]);

  const handleThemeController = () => {
    setTheme(!theme);
  };

  return (
    <nav className="shadow-sm px-3 bg-base-100 sticky z-50 top-0">
      <div className="navbar  container mx-auto px-2">
        <div className="navbar-start ">
          <div className={`flex items-center lg:hidden relative`}>
            <button className="text-3xl" onClick={handleMenuChecked}>
              <span className="transition ease-in-out duration-1000">
                {isChecked ? <RxCross2 /> : <LuMenu />}
              </span>
            </button>
            <aside
              className="absolute top-0 left-0"
              onClick={handleMenuChecked}
            >
              {menuLinks}
            </aside>
          </div>

          <div className="ml-4 lg:ml-0">
            <Link to={"/"} className="flex items-center gap-2">
              <HiOutlineWrenchScrewdriver className="text-3xl text-[#dd3333] hidden md:flex" />
              <h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#dd3333] to-neutral inline-block text-transparent bg-clip-text">
                FixFast
              </h2>
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex main-manu menu-items-common  gap-10 text-base font-medium px-1">
            {links}
          </ul>
        </div>

        <div className="navbar-end gap-6 items-center">
          {/* theme controller */}
          <div className="mt-2">
            <button
              className="text-[26px] tooltip tooltip-left"
              data-tooltip-id="my-tooltip"
              data-tooltip-content={`${theme ? "Light Theme" : "Dark Theme"}`}
              onClick={handleThemeController}
            >
              {theme ? <MdOutlineLightMode /> : <MdDarkMode />}
            </button>
          </div>

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={user?.displayName}
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">Profile</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li onClick={handleLogOutUser}>
                  <button className="flex items-center justify-between">
                    Logout
                    <FiLogOut className="text-error text-xl" />
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <Link
                to="/login"
                className="text-2xl tooltip tooltip-left"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Login"
              >
                <FiUserPlus />
              </Link>
            </div>
          )}
        </div>
      </div>
      <Tooltip id="my-tooltip" />
    </nav>
  );
};

export default Navbar;
