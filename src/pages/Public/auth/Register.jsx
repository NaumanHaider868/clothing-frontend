import React from "react";
import "../../../assets/css/auth.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Yup validation schema
const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => console.log("Form Data:", data);

  return (
    <div className="flex items-center auth register">
      <div className="navbar">
        <div className="logo">
          <i></i>
        </div>
      </div>
      <div className="w-full max-w-md p-8 space-y-6 m-auto text-center">
        <h2 className="text-[30px] font-semibold">Create Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {["firstName", "lastName", "email", "password"].map((field, i) => (
            <div key={i}>
              <input
                type={
                  field === "password"
                    ? "password"
                    : field === "email"
                    ? "email"
                    : "text"
                }
                placeholder={
                  errors[field]
                    ? errors[field].message
                    : field === "lastName"
                    ? "Last Name"
                    : field === "firstName"
                    ? "First Name"
                    : field.charAt(0).toUpperCase() + field.slice(1)
                }
                {...register(field)}
                className={`w-full px-3 py-4 outline-none bg-transparent b-bottom ${
                  errors[field]
                    ? "placeholder-red-500 placeholder-font-bold"
                    : ""
                }`}
              />
              {/* {errors[field] && (
                <span className="text-red-500">{errors[field].message}</span>
              )} */}
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-4 bg-[#D9D9D9] hover:bg-[#c7c5c5] transition-colors duration-300"
          >
            Create
          </button>
        </form>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="hover:underline cursor-pointer">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
