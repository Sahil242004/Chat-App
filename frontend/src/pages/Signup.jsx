import { Eye, EyeOff, Loader, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const Signup = () => {
  const { isSigningUp, signup } = useAuthStore();
  let [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  let [showPass, setShowPass] = useState(false);

  const validateForm = (formData) => {
    if (!formData.fullName) return toast.error("full name is required");
    if (!formData.email) return toast.error("email is required");
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(formData.email))
      return toast.error("valid email is required");

    if (!formData.password) return toast.error("password is required");
    if (formData.password.length < 6)
      return toast.error("password should be more than 6 characters");

    return true;
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const success = validateForm(formData);
    if (success === true) return signup(formData);
  };

  return (
    <div className="min-h-[calc(100vh-32px)] bg-navbar  p-8 flex justify-center ">
      <div className="w-86 shadow-lg h-full pb-12 my-auto border  bg-chat-heading text-text  pt-12 px-6 rounded-md ">
        <h1 className="font-semibold space-x-1 text-white flex justify-center items-center">
          <User /> <span>Sign up</span>
        </h1>
        <hr className="mt-3 mb-10" />
        <form onSubmit={handleSubmit}>
          <div className="mt-3">
            <label htmlFor="fullname" className="block text-xs mb-2">
              Full name
            </label>
            <input
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              id="fullname"
              className="border w-full text-xs px-2 py-1 focus:outline-none focus:ring-0 focus:border-base-content"
              placeholder="Enter Username"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="email" className="block text-xs mb-2">
              Email
            </label>
            <input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              id="email"
              className="border w-full text-xs px-2 py-1 focus:outline-none focus:ring-0 focus:border-base-content"
              placeholder=" Email"
              type="email"
            />
          </div>
          <div className="mt-3 relative">
            <label htmlFor="pass" className="block text-xs mb-2">
              Password
            </label>
            {showPass ? (
              <Eye
                onClick={() => setShowPass((prev) => !prev)}
                className="size-3 absolute right-2 top-8"
              />
            ) : (
              <EyeOff
                onClick={() => setShowPass((prev) => !prev)}
                className="size-3 absolute right-2 top-8"
              />
            )}

            <input
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              id="pass"
              className="border w-full text-xs px-2 py-1 focus:outline-none focus:ring-0 focus:border-base-content"
              placeholder="Password"
              type={`${showPass ? "text" : "password"}`}
            />
          </div>
          <button className="w-full flex justify-center items-center border mt-6 text-sm px-2 py-1 bg-base-100 border-base-100 hover:bg-base-200">
            {isSigningUp ? (
              <>
                <Loader className="size-5 animate-spin" /> loading...
              </>
            ) : (
              "Sign up"
            )}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-xs">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-white">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
