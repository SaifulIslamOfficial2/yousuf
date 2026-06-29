import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaChartBar,
  FaGlobe,
  FaFileAlt,
  FaUserShield,
  FaUsers,
  FaKaaba,
  FaNewspaper,
  FaBriefcase,
  FaImages,
  FaCog,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

const ITEMS = [
  { id: "dashboard", label: "ড্যাশবোর্ড", icon: FaHome, perm: null },
  { id: "analytics", label: "এনালিটিক্স", icon: FaChartBar, perm: "analytics" },
  { id: "website-control", label: "ওয়েবসাইট কন্ট্রোল", icon: FaGlobe, perm: "website" },
  { id: "applications", label: "আবেদনসমূহ", icon: FaFileAlt, perm: "applications" },
  { id: "admins", label: "অ্যাডমিন ম্যানেজমেন্ট", icon: FaUserShield, perm: "__SUPER__" },
  { id: "team", label: "টিম সদস্য", icon: FaUsers, perm: "team" },
  { id: "umrah", label: "ওমরাহ প্যাকেজ", icon: FaKaaba, perm: "umrah" },
  { id: "blog", label: "ব্লগ পোস্ট", icon: FaNewspaper, perm: "blog" },
  { id: "services", label: "সার্ভিস", icon: FaBriefcase, perm: "services" },
  { id: "gallery", label: "গ্যালারি", icon: FaImages, perm: "gallery" },
  { id: "settings", label: "প্রোফাইল ও সেটিংস", icon: FaCog, perm: null },
];

export default function AdminSidebar({
  isOpen,
  setIsOpen,
  currentPage,
  setCurrentPage,
}) {
  const { user, logout, hasPermission, isSuperAdmin } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const visible = ITEMS.filter((it) => {
    if (!it.perm) return true;
    if (it.perm === "__SUPER__") return isSuperAdmin;
    return hasPermission(it.perm);
  });

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-[#0B1F44] to-[#0B3B75] text-white transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } flex flex-col`}
      >
        <div className="md:hidden p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">মেন্যু</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-lg"
            aria-label="Close menu"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src="/logo_main.png" alt="Yousuf" className="w-10 h-10 rounded bg-white p-1" />
            <div>
              <h1 className="text-base font-bold leading-tight">Yousuf Consultancy</h1>
              <p className="text-xs text-blue-200">অ্যাডমিন প্যানেল</p>
            </div>
          </div>
        </div>

        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white/20"
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {(user?.name || "A").charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate">{user?.name || "অ্যাডমিন"}</p>
              <p className="text-xs text-blue-200">
                {isSuperAdmin ? "প্রধান অ্যাডমিন" : "সাব-অ্যাডমিন"}
              </p>
            </div>
          </div>
        </div>

        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {visible.map((item) => {
            const Icon = item.icon;
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${
                  active
                    ? "bg-blue-500 text-white shadow"
                    : "text-blue-100 hover:bg-white/10"
                }`}
              >
                <Icon size={16} className="flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-200 hover:bg-red-500/20 transition-colors text-sm"
          >
            <FaSignOutAlt size={16} /> লগআউট
          </button>
        </div>
      </aside>
    </>
  );
}
