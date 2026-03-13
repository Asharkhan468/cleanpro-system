"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const userLogin = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Login Successful");

      setTimeout(() => {
        router.push("/admin");
      }, 1000);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-white">
      <ToastContainer />

      {/* Inner Container - Flex row on desktop, column on mobile */}
      <div className="flex flex-col md:flex-row w-full min-h-screen">
        {/* Welcome/Image Section - Hidden on mobile, visible on md and up */}
        <div className="hidden md:flex md:w-1/2 bg-black items-center justify-center relative">
          <div className="relative w-full h-full">
            <Image
              src="/clean.jpg"
              alt="Login illustration"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Login Form Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-16">
          <div className="w-full max-w-md">
            {/* Header Text */}
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-poppins font-bold text-gray-900 mb-4">
                Welcome Back
              </h1>
              <p className="text-base md:text-lg text-gray-600 font-poppins font-medium max-w-lg mx-auto">
                Enter your login details to continue managing your business.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={userLogin} className="space-y-8">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="block text-base md:text-lg font-poppins font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="w-full text-gray-500 placeholder:text-gray-500 px-4 py-3 rounded-lg border border-gray-300 font-poppins text-base md:text-lg outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-colors bg-white"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="block text-base md:text-lg font-poppins font-medium text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full px-4 py-3 text-gray-500 placeholder:text-gray-500 rounded-lg border border-gray-300 font-poppins text-base md:text-lg outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-colors bg-white"
                />

                {/* Remember Me Checkbox */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 accent-teal-600 cursor-pointer"
                  />
                  <label
                    htmlFor="remember"
                    className="text-base md:text-lg font-poppins text-gray-700 cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
              </div>

              {/* Login Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg text-base md:text-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Custom styles for Poppins font */}
      <style jsx global>{`
        .font-poppins {
          font-family: "Poppins", sans-serif;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
