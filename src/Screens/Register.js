import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../Redux/slices/auth";

function Register() {
  const fullname = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const { registerError } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      userRegister({
        fullname: fullname.current.value,
        email: email.current.value,
        password: password.current.value,
        confirmPassword: confirmPassword.current.value,
      })
    );

    navigate("/");

    fullname.current.value = "";
    email.current.value = "";
    password.current.value = "";
    confirmPassword.current.value = "";
  };

  return (
    <div className="w-1/3 mx-auto mt-20">
      <h1 className="text-3xl font-bold">Register</h1>
      {registerError && (
        <small className="text-red-500 mt-2">{registerError}</small>
      )}
      <form className="flex flex-col gap-y-5 mt-5" onSubmit={handleSubmit}>
        <input
          className="p-2 border border-gray-300 rounded"
          ref={fullname}
          type="text"
          name="fullname"
          placeholder="Full Name"
        />

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

        <input
          className="p-2 border border-gray-300 rounded"
          ref={confirmPassword}
          type="password"
          name="confirm-password"
          placeholder="Confirm Password"
        />

        <button
          className="py-2 mt-2 bg-orange-700 hover:bg-orange-800 text-white text-lg"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
