import { useEffect, useState } from "react";
import {
  FaFileAlt,
  FaUsers,
  FaKaaba,
  FaNewspaper,
  FaBriefcase,
  FaImages,
  FaCheckCircle,
  FaClock,
  FaUserShield,
} from "react-icons/fa";
import api, { apiError } from "../../../api/client";
import { useAuth } from "../../../hooks/useAuth";

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
    <div
      className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}
    >
      <Icon className="text-white text-xl" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const QuickAction = ({ icon: Icon, label, onClick, color }) => (
  <button
    onClick={onClick}
    className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-3 hover:shadow-md hover:border-blue-300 transition text-left"
  >
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
      <Icon className="text-white" />
    </div>
    <span className="font-semibold text-gray-700">{label}</span>
  </button>
);

export default function DashboardContent({ goTo }) {
  const { user, hasPermission, isSuperAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/dashboard/stats");
        setStats(data);
      } catch (e) {
        setError(apiError(e, "পরিসংখ্যান লোড ব্যর্থ"));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto" />
        <p className="text-gray-500 mt-3">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow">
        <h1 className="text-2xl font-bold">স্বাগতম, {user?.name || "অ্যাডমিন"}</h1>
        <p className="text-blue-100 mt-1">
          ইউসুফ কনসালটেন্সি অ্যাডমিন প্যানেলে আপনাকে স্বাগত জানাচ্ছি
        </p>
      </div>

      {/* Stats grid */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">সংক্ষিপ্ত পরিসংখ্যান</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={FaFileAlt}
            label="মোট আবেদন"
            value={stats.totalApplications}
            color="bg-blue-500"
          />
          <StatCard
            icon={FaClock}
            label="অপেক্ষমাণ"
            value={stats.pendingApplications}
            color="bg-amber-500"
          />
          <StatCard
            icon={FaCheckCircle}
            label="অনুমোদিত"
            value={stats.completedApplications}
            color="bg-emerald-500"
          />
          <StatCard
            icon={FaUsers}
            label="টিম সদস্য"
            value={stats.totalTeamMembers}
            color="bg-purple-500"
          />
          <StatCard
            icon={FaKaaba}
            label="ওমরাহ প্যাকেজ"
            value={stats.totalUmrahPackages}
            color="bg-teal-500"
          />
          <StatCard
            icon={FaNewspaper}
            label="ব্লগ পোস্ট"
            value={stats.totalBlogPosts}
            color="bg-pink-500"
          />
          <StatCard
            icon={FaBriefcase}
            label="সার্ভিস"
            value={stats.totalServices}
            color="bg-indigo-500"
          />
          <StatCard
            icon={FaImages}
            label="গ্যালারি ছবি"
            value={stats.totalGallery}
            color="bg-rose-500"
          />
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">দ্রুত অ্যাকশন</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hasPermission("applications") && (
            <QuickAction
              icon={FaFileAlt}
              label="আবেদন দেখুন"
              onClick={() => goTo("applications")}
              color="bg-blue-500"
            />
          )}
          {hasPermission("team") && (
            <QuickAction
              icon={FaUsers}
              label="টিম ম্যানেজ করুন"
              onClick={() => goTo("team")}
              color="bg-purple-500"
            />
          )}
          {hasPermission("umrah") && (
            <QuickAction
              icon={FaKaaba}
              label="ওমরাহ প্যাকেজ"
              onClick={() => goTo("umrah")}
              color="bg-teal-500"
            />
          )}
          {hasPermission("blog") && (
            <QuickAction
              icon={FaNewspaper}
              label="নতুন ব্লগ লিখুন"
              onClick={() => goTo("blog")}
              color="bg-pink-500"
            />
          )}
          {hasPermission("services") && (
            <QuickAction
              icon={FaBriefcase}
              label="সার্ভিস ম্যানেজ"
              onClick={() => goTo("services")}
              color="bg-indigo-500"
            />
          )}
          {hasPermission("gallery") && (
            <QuickAction
              icon={FaImages}
              label="গ্যালারিতে যোগ করুন"
              onClick={() => goTo("gallery")}
              color="bg-rose-500"
            />
          )}
          {isSuperAdmin && (
            <QuickAction
              icon={FaUserShield}
              label="সাব-অ্যাডমিন ম্যানেজমেন্ট"
              onClick={() => goTo("admins")}
              color="bg-gray-700"
            />
          )}
        </div>
      </div>
    </div>
  );
}
