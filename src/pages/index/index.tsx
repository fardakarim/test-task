import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ContactForm } from "$types/contact.type";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    firstName: yup.string().required("First Name is a required field"),
    lastName: yup.string().required("Last Name is a required field"),
    email: yup
      .string()
      .required("Email address is a required field")
      .email("Invalid email"),
    phoneNumber: yup.string().required("Phone number is a required field"),
    message: yup.string().required("Message is a required field"),
  })
  .required();
const Index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
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
          CONTACT FORM
        </h6>
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          {/* FirstName */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm">First Name</label>
            <input
              type="text"
              className="p-2 bg-gray-100 rounded"
              {...register("firstName")}
            />
            <p className="text-red-600">{errors.firstName?.message}</p>
          </div>

          {/* LastName */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm">Last Name</label>
            <input
              type="text"
              className="p-2 bg-gray-100 rounded"
              {...register("lastName")}
            />
            <p className="text-red-600">{errors.lastName?.message}</p>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm">Email address</label>
            <input
              type="email"
              className="p-2 bg-gray-100 rounded"
              {...register("email")}
            />
            <p className="text-red-600">{errors.email?.message}</p>
          </div>

          {/* PhoneNumber */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm">Phone Number</label>
            <input
              type="password"
              className="p-2 bg-gray-100 rounded"
              {...register("phoneNumber")}
            />
            <p className="text-red-600">{errors.phoneNumber?.message}</p>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm">Message</label>
            <textarea
              className="p-2 bg-gray-100 rounded"
              {...register("message")}
            />
            <p className="text-red-600">{errors.message?.message}</p>
          </div>

          {/* Button */}
          <div className="flex flex-col gap-1">
            <button className="py-2 px-5 rounded bg-indigo-500 text-white">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
