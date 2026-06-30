import { useState } from "react";
import {
  FaBars,
  FaSignOutAlt,
  FaBell,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

const TITLE_MAP = {
  dashboard: "ড্যাশবোর্ড",
  analytics: "এনালিটিক্স",
  "website-control": "ওয়েবসাইট কন্ট্রোল",
  applications: "আবেদনসমূহ",
  admins: "অ্যাডমিন ম্যানেজমেন্ট",
  team: "টিম সদস্য",
  umrah: "ওমরাহ প্যাকেজ",
  blog: "ব্লগ পোস্ট",
  services: "সার্ভিস",
  gallery: "গ্যালারি",
  settings: "প্রোফাইল ও সেটিংস",
};

export default function AdminHeader({ currentPage, onSidebarToggle, onLogout }) {
  const { user, isSuperAdmin } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const title = TITLE_MAP[currentPage] || "ড্যাশবোর্ড";

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onSidebarToggle}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            <FaBars size={20} />
          </button>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h2>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition"
            title="ওয়েবসাইট দেখুন"
          >
            <FaExternalLinkAlt /> ওয়েবসাইট
          </a>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Notifications"
            >
              <FaBell size={18} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-40">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-800">নোটিফিকেশন</h3>
                  </div>
                  <div className="p-4 text-sm text-gray-500 text-center">
                    নতুন কোনো নোটিফিকেশন নেই
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-gray-800">
                {user?.name || "অ্যাডমিন"}
              </p>
              <p className="text-xs text-gray-500">
                {isSuperAdmin ? "প্রধান অ্যাডমিন" : "সাব-অ্যাডমিন"}
              </p>
            </div>
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-50"
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {(user?.name || "A").charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <button
            onClick={onLogout}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="লগআউট"
          >
            <FaSignOutAlt size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
