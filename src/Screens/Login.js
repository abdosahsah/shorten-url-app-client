import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../Redux/slices/auth";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const email = useRef();
  const password = useRef();

  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      userLogin({
        email: email.current.value,
        password: password.current.value,
      })
    );
    email.current.value = "";
    password.current.value = "";
  };

  useEffect(() => {
    if (users.isAuthenticated) {
      navigate("/");
    } else {
      setError(users.error);
      navigate("/login");
    }
  }, [users, error]);

  return (
    <div className="w-1/3 mx-auto mt-20">
      <h1 className="text-3xl font-bold">Login</h1>
      <form className="flex flex-col gap-y-5 mt-5" onSubmit={handleSubmit}>
        {error && <small className="text-red-500">{error}</small>}
        <input
          className="p-2 border border-gray-300 rounded"
          ref={email}
          type="email"
          name="email"
          placeholder="Email Address"
        />

        <input
          className="p-2 border border-gray-300 rounded"
          ref={password}
          type="password"
          name="password"
          placeholder="Password"
        />

        <button
          className="py-2 mt-2 bg-orange-700 hover:bg-orange-800 text-white text-lg"
          type="submit"
        >
          Login
        </button>
      </form>
      <div className="mt-5">
        <span>You don't have an account?</span>
        <Link className="text-orange-700 ml-1" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
