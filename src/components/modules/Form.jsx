import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast, ToastContainer} from "react-toastify";

const Form = ({ isSignInPage = false }) => {
  debugger;
  const apiUrl = import.meta.env.API_URL;
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "staff",
      phone: "",
    },
  });

  const userRole = watch("role");
  const phoneValue = watch("phone");
  

 useEffect(() => {
  if (!isSignInPage) {
    register("phone", { required: "Phone number is required" });
  }
}, [register, isSignInPage]);


const onSubmit = async (data) => {
  try {
    const res = await
     fetch(
      `http://localhost:5000/api/${isSignInPage ? "login" : "register"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const resText = await res.text();
    const resData = resText ? JSON.parse(resText) : {};

    if (res.status === 400) {
      toast.error("Invalid Credentials");
    } else if (res.status === 200 && resData.token && isSignInPage) {
      localStorage.setItem("user:token", resData.token);
      localStorage.setItem("user:detail", JSON.stringify(resData.user));
      navigate("/");
    } else if (!isSignInPage && res.status === 201 || res.status === 204) {
      toast.success("Registered successfully. Please sign in!");
      navigate("/sign-in");
    } else {
      toast.error(resData.message || "Unexpected server response");
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("An error occurred");
  }
};


  return (
    <div>
      <h2 className="text-3xl font-bold text-[var(--text-primary)] text-center mt-15 mb-5">
        Welcome {isSignInPage && "Back"} to{" "}
        <span className="text-[var(--primary-color)] font-bold">NovaCare</span>
      </h2>
      <div className="flex items-center justify-center bg-[var(--background-light)] px-4 md:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-20 max-w-screen-xl w-full ">
          <div className="hidden lg:block w-2/3">
            <img
              src="/images/form_img.png"
              alt="Login Visual"
              className="w-full h-[500px] object-contain"
            />
          </div>

          <div className="w-full md:w-2/3 lg:w-1/2 bg-[var(--background-color)] shadow-xl rounded-lg p-10">
            <p className="text-gray-700 text-center mb-3 text-md">
              {isSignInPage
                ? "Sign in to get explored"
                : "Sign up now to get started"}
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              {!isSignInPage && (
                <div className="mb-3">
                  <label className="block text-[var(--text-primary)] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register("fullName", { required: "Full Name is required" })}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 bg-blue-50"
                    placeholder="Enter full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
              )}

              {!isSignInPage && (
                <div className="mb-3">
                  <label className="block text-[var(--text-primary)] mb-2">
                    Phone
                  </label>
                  <PhoneInput
                    defaultCountry="NP"
                    value={phoneValue}
                    onChange={(value) => setValue("phone", value)}
                    placeholder="Enter phone number"
                    className="bg-blue-50 border border-gray-300 rounded-md px-3 py-2 PhoneInput"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              )}

              {!isSignInPage && (
                <div className="mb-3">
                  <label className="block text-[var(--text-primary)] mb-2">
                    Role
                  </label>
                  <select
                    {...register("role", { required: true })}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 bg-blue-50"
                  >
                    <option value="doctor">Doctor</option>
                    <option value="staff">Front Desk Staff</option>
                    <option value="staff">Pharmacist</option>
                  </select>
                </div>
              )}

               {userRole === "doctor" && !isSignInPage && (
        <div className="mb-3">
          <label className="block text-[var(--text-primary)] mb-2">
            Specialist
          </label>
          <select
                {...register("specialist", { required: "Specialist is required" })}
      
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 bg-blue-50"
              >
                <option value="">Select a department</option>
                <option>General Medicine</option>
                <option>Pediatrics</option>
                <option>Orthopedics</option>
                <option>Cardiologist</option>
                <option>Dermatologist</option>
                <option>ENT</option>
                <option>Gynecologist</option>
                <option>Opthalmologist</option>
                <option>Hepatologist</option>
                <option>Nephrologist</option>
              </select>
          {errors.specialist && (
            <p className="text-red-500 text-sm mt-1">Specialist is required.</p>
          )}
        </div>
      )}

              <div className="mb-3">
                <label className="block text-[var(--text-primary)] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 bg-blue-50"
                  placeholder="Enter email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mb-6 relative">
                <label className="block text-[var(--text-primary)] mb-2">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: "Password is required" })}
                  placeholder="Enter password"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 bg-blue-50"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
                <span
                  className="absolute top-11 right-4 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--primary-color)] hover:bg-sky-500 text-white py-2 rounded-md font-semibold transition"
              >
                {isSignInPage ? "Login" : "Sign Up"}
              </button>
            </form>

            <p className="text-md text-center mt-6 text-[var(--text-secondary)]">
              {isSignInPage
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <a
                className="text-[var(--primary-color)] hover:underline cursor-pointer"
                onClick={() => navigate(`/${isSignInPage ? "sign-up" : "sign-in"}`)}
              >
                {isSignInPage ? "Sign Up" : "Login"}
              </a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={1500} />
    </div>
  );
};

export default Form;
