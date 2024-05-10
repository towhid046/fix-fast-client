import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import useAuth from "../../../hooks/useAuth";
import swal  from 'sweetalert';
const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate()

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/all-services"}>Services</NavLink>
      </li>
      {user && (
        <li>
          <details>
            <summary>Dashboard</summary>
            <ul className="p-2">
              <li>
                <NavLink to={"/add-service"}>Add Service</NavLink>
              </li>
              <li>
                <NavLink to={"/manage-service"}>Manage Service</NavLink>
              </li>
              <li>
                <NavLink to={"/booked-services"}>Booked Services</NavLink>
              </li>
              <li>
                <NavLink to={"/service-to-do"}>Service To Do</NavLink>
              </li>
            </ul>
          </details>
        </li>
      )}
    </>
  );

  const handleLogOutUser = async () => {
    try {
      await logOutUser();
      swal(
        "Log Out Success!",
        "You have successfully Log out",
        "success"
      );
      navigate('/')
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="shadow-sm bg-base-100 sticky z-50 top-0">
      <div className="navbar  container mx-auto px-2">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu gap-3 menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>
          <Link to={"/"}>
            <img className="w-24" src={logo} alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu gap-3 menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img title={user?.displayName} src={user?.photoURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li onClick={handleLogOutUser}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-success">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
