import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../Redux/slices/auth";

function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <nav className="bg-orange-700 text-white">
      <div className="flex flex-row justify-between container mx-auto py-8 px-10 md:px-0">
        <div>
          <h1 className="text-lg font-bold">Shorten URL</h1>
        </div>

        <ul className="flex flex-row gap-x-5">
          {/* If user is authenticated, show logout else show login and register */}
          {isAuthenticated ? (
            <li
              className="cursor-pointer hover:underline"
              onClick={handleLogout}
            >
              Logout
            </li>
          ) : (
            <Fragment>
              <li className="hover:underline">
                <Link to="/login">Login</Link>
              </li>
              <li className="hover:underline">
                <Link to="/register">Register</Link>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
