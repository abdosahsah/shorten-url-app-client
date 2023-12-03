import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "../Screens/Login";
import { useEffect } from "react";
import { validateToken } from "../Redux/slices/auth";

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(validateToken(token));
    }
  }, [dispatch]);

  // Redirect to login page if user is not authenticated
  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Login />;
};

export default ProtectedRoute;
