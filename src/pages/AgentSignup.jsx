import { Eye, EyeOff, Loader2 } from "lucide-react";
import { React, useState } from "react";

const AgentSignup = () => {
  const [showPass, setShowPass] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const hanldeSubmit = () => {};

  return (
    <div className="flex flex-col justify-center items-center h-screen font-dmsans">
      {/* <div className="mb-[1rem]">
        Enter your agent details to create account.
      </div> */}
      <div className="bg-[rgba(0,0,0,0.7)] rounded-3xl h-[35rem] w-[30rem] flex flex-col shadow-xl items-center">
        <div className="text-3xl font-bold pt-[2rem] flex flex-col ">
          Create Account
        </div>
        <form
          onSubmit={hanldeSubmit}
          className="space-y-6 w-[90%] p-[2rem] pt-[0.5rem] m-auto mb-0 mt-0"
        >
          <label className="flex flex-col gap-2 pt-[1rem]">
            Full Name
            <input
              type="text"
              placeholder="Full Name"
              className="h-13 rounded-md bg-[rgb(0,0,0,0.8)] pl-2 border-none"
            />
          </label>
          <label className="flex flex-col gap-2 ">
            Agent ID
            <input
              type="text"
              placeholder="Agent ID"
              className="h-13 rounded-md bg-[rgb(0,0,0,0.8)] border-none pl-2"
            />
          </label>
          <label className="flex flex-col gap-2">
            Password
            <input
              type="text"
              placeholder="••••••"
              className="h-13 rounded-md bg-[rgb(0,0,0,0.8)] border-none pl-2"
            />
          </label>
          <button type="submit" className="btn btn-primary w-full mt-4">
            Sign Up
          </button>
        </form>
        <div className="text-center">
          <p className="text-base-content/60">
            Already have an account?{" "}
            <span className="text-blue-400">Sign In</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentSignup;
