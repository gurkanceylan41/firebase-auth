import { useState } from "react";
import { register } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await register(email, password);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center bg-white justify-center ">
      <div className="w-[427px] h-[557px] ">
        <h1 className=" text-3xl font-extrabold  mb-6  text-indigo-600 text-center">
          Register
        </h1>

        <form className="grid gap-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                value={email}
                placeholder="you@example.com"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full h- sm:text-sm border-gray-300 rounded-md"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                type="password"
                value={password}
                placeholder="*****"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            disabled={!email || !password}
            type="submit"
            className="inline-flex disabled:opacity-50 items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>

          <div className="flex gap-2 justify-center mt-2 text-sm">
            <span>Don't have an account?</span>
            <Link className="text-blue-600 hover:text-blue-800" to="/login">
              Sign up here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
