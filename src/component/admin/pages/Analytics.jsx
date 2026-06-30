import { useEffect, useState } from "react";
import {
  FaChartBar,
  FaClock,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaFileAlt,
} from "react-icons/fa";
import api, { apiError } from "../../../api/client";

const STATUS_META = [
  { key: "pending", label: "অপেক্ষমাণ", color: "bg-amber-500", icon: FaClock },
  {
    key: "inProgress",
    label: "প্রক্রিয়াধীন",
    color: "bg-blue-500",
    icon: FaSpinner,
  },
  {
    key: "approved",
    label: "অনুমোদিত",
    color: "bg-emerald-500",
    icon: FaCheckCircle,
  },
  {
    key: "rejected",
    label: "প্রত্যাখ্যাত",
    color: "bg-rose-500",
    icon: FaTimesCircle,
  },
];

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/analytics");
        setData(data);
      } catch (e) {
        setError(apiError(e, "এনালিটিক্স লোড ব্যর্থ"));
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

  const stats = data?.applicationStats || {};
  const total = stats.total || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">এনালিটিক্স</h1>
        <p className="text-gray-500 text-sm">
          আবেদনের বিস্তারিত পরিসংখ্যান ও ট্র্যাফিক ডেটা
        </p>
      </div>

      {/* Application stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <FaFileAlt className="text-blue-500" />
            আবেদন পরিসংখ্যান
          </h2>
          <span className="text-sm text-gray-500">মোট: {total}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATUS_META.map(({ key, label, color, icon: Icon }) => {
            const value = stats[key] || 0;
            const pct = total > 0 ? Math.round((value / total) * 100) : 0;
            return (
              <div
                key={key}
                className="border border-gray-100 rounded-lg p-4"
              >
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Icon className="text-gray-400" />
                  {label}
                </div>
                <div className="text-2xl font-bold text-gray-800">{value}</div>
                <div className="mt-2 h-1.5 bg-gray-100 rounded overflow-hidden">
                  <div
                    className={`h-full ${color}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="text-xs text-gray-400 mt-1">{pct}%</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Traffic stats placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
          <FaChartBar className="text-blue-500" />
          ট্র্যাফিক ওভারভিউ
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 border border-gray-100 rounded-lg">
            <p className="text-sm text-gray-500">মোট ভিজিটর</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {data?.totalVisitors || 0}
            </p>
          </div>
          <div className="text-center p-4 border border-gray-100 rounded-lg">
            <p className="text-sm text-gray-500">পেজ ভিউ</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {data?.totalPageViews || 0}
            </p>
          </div>
          <div className="text-center p-4 border border-gray-100 rounded-lg">
            <p className="text-sm text-gray-500">সক্রিয় সেশন</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {data?.activeSessions || 0}
            </p>
          </div>
          <div className="text-center p-4 border border-gray-100 rounded-lg">
            <p className="text-sm text-gray-500">গড় সময়</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {data?.avgSessionDuration || "—"}
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-4 text-center">
          বিস্তারিত ট্র্যাফিক ডেটা পেতে Google Analytics ইন্টিগ্রেশন প্রয়োজন
        </p>
      </div>
    </div>
  );
}
