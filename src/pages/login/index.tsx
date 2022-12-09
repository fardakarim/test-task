import React from "react";
import { login } from "$store/features/auth.slice";
import { AppDispatch } from "$store/index";
import { User } from "$types/user.type";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email address is a required field")
      .email("Invalid email"),
    password: yup
      .string()
      .required("Password is a required field")
      .min(8, "Too Short!")
      .max(50, "Too Long!"),
  })
  .required();

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = handleSubmit(async (values) => {
    // send login request
    if (values.email != "user@gmail.com" || values.password != "12345") {
      toast.info("Email address or Password is incorrect");
      return;
    }
    const user: Partial<User> = {
      email: values.email,
      password: values.password,
    };

    dispatch(login(user));
    navigate("/");
  });

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div className="gap-5 w-[400px] shadow-md p-10 rounded-lg">
        <h6 className="text-center text-lg font-medium text-gray-500 mb-5">
          LOGIN TO ACCOUNT
        </h6>
        <div className="flex flex-col text-gray-500 my-2 py-2 text-sm border-y">
          <p>
            <span className="font-medium">Email address:</span> user@gmail.com
          </p>
          <p>
            <span className="font-medium">Password:</span> 12345
          </p>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm">Email address</label>
            <input
              type="text"
              // style={errors.email?.message ? { border: "1px solid red" } : {}}
              className={`p-2 bg-gray-100 rounded ${
                errors.email?.message ? "border-rose-500" : ""
              }`}
              {...register("email")}
            />
            <p className="text-red-600">{errors.email?.message}</p>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm">Password</label>
            <input
              type="password"
              className="p-2 bg-gray-100 rounded"
              {...register("password")}
            />
            <p className="text-red-600">{errors.password?.message}</p>
          </div>

          {/* Forgot Password */}
          <div className="flex flex-col gap-1">
            <Link to="/forgotpassword" className="text-blue-600">
              Forgot password?
            </Link>
          </div>

          {/* Button */}
          <div className="flex flex-col gap-1">
            <button className="py-2 px-5 rounded bg-indigo-500 text-white">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
