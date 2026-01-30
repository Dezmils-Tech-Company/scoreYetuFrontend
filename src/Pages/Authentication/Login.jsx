import React, { useContext, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import api from "../../api/axiosInstance";

const Login = () => {
  const { signInUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [loading, setLoading] = useState(false);

  // Function to update user in backend
  const saveUserToDB = async (user) => {
    try {
      const payload = {
        email: user.email,
        name: user.displayName || "User",
        image: user.photoURL || null,
      };
      await api.put("/users", payload);
      // No need to handle response here explicitly
    } catch (error) {
      console.error("Failed to save user to DB:", error);
      // You can optionally show an error toast here if needed
    }
  };

  // Email/Password Login Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) return;

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please enter both email and password.",
      });
    }

    setLoading(true);

    signInUser(email, password)
      .then(async (result) => {
        // Save user info to backend
        await saveUserToDB(result.user);

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome back, ${result.user.displayName || "User"}!`,
          timer: 1500,
          showConfirmButton: false,
        });
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        const message =
          error.code === "auth/user-not-found"
            ? "No user found with this email."
            : error.code === "auth/wrong-password"
            ? "Incorrect password. Please try again."
            : error.message;

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: message,
        });
      });
  };

  // Google Login Handler
  const handleGoogleLogin = () => {
    setLoading(true);
    googleSignIn()
      .then(async (result) => {
        // Save user info to backend
        await saveUserToDB(result.user);

        Swal.fire({
          icon: "success",
          title: "Google Login Successful",
          text: `Welcome, ${result.user.displayName || "User"}!`,
          timer: 1500,
          showConfirmButton: false,
        });
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: error.message,
        });
      });
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-red-500/10 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="w-full max-w-md bg-green-900/10 rounded-xl shadow-lg "
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div className="bg-gray-300 backdrop-blur-lg border border-green-500/30 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 sm:p-8 md:p-10">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-red-600">
                Welcome Back
              </h2>
              <p className="text-green-600 text-sm">
                Sign in to continue to Score Yetu
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Email */}
              <div>
                <label className="block text-sm text-red-600 mb-1">
                  Email
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-gray-400 border border-green-600 rounded-lg px-4 py-2 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm text-red-600 mb-1">
                  Password
                </label>
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-gray-400 border border-green-600 rounded-lg px-4 py-2 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Centered Sign In Button */}
              <div className="md:col-span-2 flex justify-center">
                <motion.button
                  type="submit"
                  className={`w-full bg-red-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300
                    ${
                      loading
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-red-700"
                    }`}
                  whileHover={loading ? {} : { scale: 1.02 }}
                  whileTap={loading ? {} : { scale: 0.98 }}
                  disabled={loading}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 mx-auto text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  ) : (
                    "Sign In"
                  )}
                </motion.button>
              </div>
            </form>

            {/* OR Divider */}
             <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-green-600"></div>
        <span className="px-3 text-sm text-gray-800">OR</span>
        <div className="flex-grow border-t border-green-600"></div>
      </div>

            {/* Google Login */}
            <GoogleLogin onClick={handleGoogleLogin} />

            {/* Sign Up Link */}
            <p className="mt-6 text-center text-sm text-gray-800">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-green-400 hover:text-red-500 font-medium"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
