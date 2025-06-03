import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const Form = ({ isSignInPage = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [userRole, setUserRole] = useState("staff");
  const navigate = useNavigate(); 
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", { ...data, phoneNumber: phoneValue });
    navigate('/');
  };

  return (
    <div>
      <h2 className="text-5xl font-bold text-[var(--text-primary)] text-center mt-30 mb-15">
        Welcome {isSignInPage && "Back"} to <span className="text-[var(--primary-color)] font-bold">NovaCare</span>
      </h2>
      <div className="flex items-center justify-center bg-[var(--background-light)] px-4 md:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-20 max-w-screen-xl w-full">

          {/* Illustration */}
          <div className="hidden lg:block w-2/3">
            <img src="/images/form_img.png" alt="Login Visual" className="w-full h-[500px] object-contain" />
          </div>

          {/* Login Form */}
          <div className="w-full md:w-2/3 lg:w-1/2 bg-[var(--background-color)] shadow-xl rounded-lg p-10">
            <p className="text-[var(--text-secondary)] text-center mb-6 text-xl">
              {isSignInPage ? "Sign in to get explored" : "Sign up now to get started"}
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>

              {/* Full Name */}
              {!isSignInPage && (
                <div className="mb-4">
                  <label className="block text-[var(--text-primary)] mb-2">Full Name</label>
                  <input
                    type="text"
                    {...register("fullName", { required: "Full Name is required" })}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2  bg-blue-50"
                    placeholder="Enter full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                  )}
                </div>
              )}

              {/* Phone Number */}
              {!isSignInPage && (
                <div className="mb-4">
                  <label className="block text-[var(--text-primary)] mb-2">Phone</label>
                  <PhoneInput
                    defaultCountry="NP"
                    value={phoneValue}
                    onChange={setPhoneValue}
                    placeholder="Enter phone number"
                    {...register("phoneValue", { required: "Phone number is required" })}
                    className="bg-blue-50 border border-gray-300 rounded-md px-3 py-2 PhoneInput"
                  />
                  {errors.phoneValue && (
                    <p className="text-red-500 text-sm mt-1">{errors.phoneValue.message}</p>
                  )}
                </div>
              )}

              {/* User Role Dropdown */}
              {!isSignInPage && (
                <div className="mb-4">
                  <label className="block text-[var(--text-primary)] mb-2">Role</label>
                  <select
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2  bg-blue-50"
                  >
                    <option value="doctor">Doctor</option>
                    <option value="staff">Front Desk Staff</option>
                  </select>
                </div>
              )}

              {/* Email */}
              <div className="mb-4">
                <label className="block text-[var(--text-primary)] mb-2">Email</label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2  bg-blue-50"
                  placeholder="Enter email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="mb-6 relative">
                <label className="block text-[var(--text-primary)] mb-2">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: "Password is required" })}
                  placeholder="Enter password"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2  bg-blue-50"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
                <span
                  className="absolute top-11 right-4 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[var(--primary-color)] hover:bg-sky-500 text-white py-2 rounded-md font-semibold transition"
              >
                {isSignInPage ? "Login" : "Sign Up"}
              </button>
            </form>

            {/* Toggle Link */}
            <p className="text-md text-center mt-6 text-[var(--text-secondary)]">
              {isSignInPage ? "Don't have an account?" : "Already have an account?"}{" "}
              <a  className="text-[var(--primary-color)] hover:underline cursor-pointer" onClick={() =>
                    navigate(`/${isSignInPage ? "sign-up" : "login"}`)  
                  }>
                {isSignInPage ? "Sign Up" : "Login"}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
