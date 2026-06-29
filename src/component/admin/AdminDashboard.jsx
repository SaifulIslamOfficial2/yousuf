import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

import DashboardContent from "./pages/DashboardContent";
import ApplicationsList from "./pages/ApplicationsList";
import AdminManagement from "./pages/AdminManagement";
import TeamManagement from "./pages/TeamManagement";
import UmrahManagement from "./pages/UmrahManagement";
import BlogManagement from "./pages/BlogManagement";
import ServicesManagement from "./pages/ServicesManagement";
import GalleryManagement from "./pages/GalleryManagement";
import Analytics from "./pages/Analytics";
import WebsiteControl from "./pages/WebsiteControl";
import SettingsProfile from "./pages/SettingsProfile";

const PERM_FOR_PAGE = {
  applications: "applications",
  team: "team",
  umrah: "umrah",
  blog: "blog",
  services: "services",
  gallery: "gallery",
  analytics: "analytics",
  "website-control": "website",
};

const PageNotAllowed = () => (
  <div className="bg-white p-12 rounded-lg shadow text-center">
    <h2 className="text-2xl font-bold text-gray-800 mb-2">প্রবেশাধিকার নেই</h2>
    <p className="text-gray-600">এই পেজ দেখার জন্য আপনার অনুমতি নেই।</p>
  </div>
);

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { token, loading, logout, hasPermission, isSuperAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");

  useEffect(() => {
    if (!loading && !token) navigate("/admin/login");
  }, [loading, token, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    if (currentPage === "admins" && !isSuperAdmin) return <PageNotAllowed />;
    const requiredPerm = PERM_FOR_PAGE[currentPage];
    if (requiredPerm && !hasPermission(requiredPerm)) return <PageNotAllowed />;

    switch (currentPage) {
      case "dashboard":
        return <DashboardContent goTo={setCurrentPage} />;
      case "applications":
        return <ApplicationsList />;
      case "admins":
        return <AdminManagement />;
      case "team":
        return <TeamManagement />;
      case "umrah":
        return <UmrahManagement />;
      case "blog":
        return <BlogManagement />;
      case "services":
        return <ServicesManagement />;
      case "gallery":
        return <GalleryManagement />;
      case "analytics":
        return <Analytics />;
      case "website-control":
        return <WebsiteControl />;
      case "settings":
        return <SettingsProfile />;
      default:
        return <DashboardContent goTo={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader
          currentPage={currentPage}
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
          onLogout={handleLogout}
        />

        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-8">{renderPage()}</div>
        </main>
      </div>
    </div>
  );
}
