import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { motion } from "framer-motion";
import {
  HiOutlineExclamationCircle,
  HiOutlineCheckCircle,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineLockClosed,
} from "react-icons/hi";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("ইমেইল এবং পাসওয়ার্ড উভয়ই প্রয়োজন");
      return;
    }
    setLoading(true);
    const result = await login(email, password);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate("/admin/dashboard"), 800);
    } else {
      setError(result.error || "লগইন ব্যর্থ");
    }
    setLoading(false);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative shapes */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative z-10"
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="text-center mb-8">
          <img
            src="/logo_main.png"
            alt="Yousuf Consultancy"
            className="w-44 h-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800">অ্যাডমিন প্যানেল</h1>
          <p className="text-sm text-gray-500 mt-1">নিরাপদ লগইন প্রয়োজন</p>
        </div>

        {error && (
          <motion.div
            className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <HiOutlineExclamationCircle className="text-red-600 text-xl flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </motion.div>
        )}

        {success && (
          <motion.div
            className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <HiOutlineCheckCircle className="text-green-600 text-xl flex-shrink-0" />
            <p className="text-green-700 text-sm font-medium">লগইন সফল! ড্যাশবোর্ডে যাচ্ছি...</p>
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              ইমেইল ঠিকানা
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800"
              placeholder="আপনার ইমেইল লিখুন"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              পাসওয়ার্ড
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label="Toggle password"
              >
                {showPassword ? (
                  <HiOutlineEyeOff className="w-5 h-5" />
                ) : (
                  <HiOutlineEye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed mt-6 transition-all"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                লগইন হচ্ছে...
              </span>
            ) : success ? (
              "প্রবেশ করছি..."
            ) : (
              "লগইন করুন"
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-8 flex items-center justify-center gap-1.5">
          <HiOutlineLockClosed /> JWT অথেনটিকেশন দ্বারা সুরক্ষিত
        </p>
      </motion.div>
    </motion.div>
  );
}
