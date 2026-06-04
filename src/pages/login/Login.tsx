import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FiMail, FiUser, FiArrowLeft, FiLoader, FiCheckCircle } from "react-icons/fi";

export default function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validate = () => {
    const newErrors: { name?: string; email?: string } = {};
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!email) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Simulate API call/auth validation
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      // Save session credentials
      localStorage.setItem("user", JSON.stringify({ name, email, role: "ADMIN" }));
      localStorage.setItem("token", "mock-jwt-token-12345");

      // Redirect after showing checkmark animation
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#080018] text-white relative flex items-center justify-center p-4 overflow-hidden font-sans select-none">
      {/* Decorative Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50"></div>

      {/* Dynamic Ambient Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-700/15 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000ms]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-700/15 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[10000ms]"></div>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md">

        {/* Go Back Home */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 group transition-colors duration-200"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        {/* Glassmorphic Card */}
        <div className="glass rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/10 relative overflow-hidden">
          {/* Subtle inside gradient highlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-500/5 to-blue-500/5 pointer-events-none"></div>

          {/* Logo Section */}
          <div className="flex flex-col items-center mb-8 relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                LazyDevs
              </span>
              <div className="w-6 h-6 bg-purple-500 rounded-sm transform rotate-45 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center tracking-tight text-white mt-2">
              {isSuccess ? "Welcome Back!" : "Access Your Space"}
            </h2>
            <p className="text-gray-400 text-sm mt-2 text-center max-w-[280px]">
              {isSuccess
                ? "You have successfully signed in to your portal."
                : "Enter your name and email address to continue."}
            </p>
          </div>

          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-6 text-center animate-fade-in relative z-10">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/10">
                <FiCheckCircle size={32} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Login Successful</h3>
              <p className="text-sm text-gray-400 mb-6 max-w-xs">
                Welcome, <span className="text-purple-300 font-semibold">{name}</span>! You are successfully authenticated.
              </p>
              <Link
                to="/"
                className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 active:scale-[0.98] text-white rounded-xl font-semibold shadow-lg shadow-purple-600/30 transition-all duration-300 text-center flex items-center justify-center"
              >
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">

              {/* Name Input */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-purple-300/80">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-purple-400 transition-colors duration-200">
                    <FiUser size={18} />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className={`w-full bg-white/5 border ${errors.name ? "border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/10" : "border-white/10 focus:border-purple-500 focus:ring-purple-500/15"
                      } rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-white/20 focus:outline-none focus:ring-4 transition-all duration-300 text-sm`}
                  />
                </div>
                {errors.name && (
                  <p className="text-rose-400 text-xs mt-1 animate-slide-up">{errors.name}</p>
                )}
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-purple-300/80">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-purple-400 transition-colors duration-200">
                    <FiMail size={18} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={`w-full bg-white/5 border ${errors.email ? "border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/10" : "border-white/10 focus:border-purple-500 focus:ring-purple-500/15"
                      } rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-white/20 focus:outline-none focus:ring-4 transition-all duration-300 text-sm`}
                  />
                </div>
                {errors.email && (
                  <p className="text-rose-400 text-xs mt-1 animate-slide-up">{errors.email}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative group overflow-hidden py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none text-white rounded-xl font-semibold shadow-lg shadow-purple-600/30 transition-all duration-300 flex items-center justify-center gap-2 mt-8"
              >
                {/* Inside button shine effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-shine"></div>
                {isLoading ? (
                  <>
                    <FiLoader className="animate-spin" size={18} />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>
          )}

          {/* Bottom disclaimer */}
          {!isSuccess && (
            <div className="mt-8 text-center text-xs text-gray-500 border-t border-white/5 pt-6">
              By accessing the portal, you agree to our{" "}
              <a href="#" className="text-purple-400 hover:underline hover:text-purple-300">Terms</a> and{" "}
              <a href="#" className="text-purple-400 hover:underline hover:text-purple-300">Privacy</a>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
