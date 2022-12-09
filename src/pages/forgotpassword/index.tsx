import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface ForgotPassword {
  email: string;
}

const schema = yup
  .object({
    email: yup.string().required().email("Invalid email"),
  })
  .required();

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPassword>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    navigate("/");
  });

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div className="gap-5 w-[400px] shadow-md p-10 rounded-lg">
        <h6 className="text-center text-lg font-medium text-gray-500 mb-5">
          FORGOT PASSWORD?
        </h6>
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm">Email address</label>
            <input
              type="text"
              className="p-2 bg-gray-100 rounded"
              {...register("email")}
            />
            <p className="text-red-600">{errors.email?.message}</p>
          </div>

          {/* Button */}
          <div className="flex flex-col gap-1">
            <button className="py-2 px-5 rounded bg-indigo-500 text-white">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
