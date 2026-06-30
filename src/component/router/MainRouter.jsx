import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../mainlayout/MainLayout";
import ErrorPage from "../../assets/pages/Errorpage";
import Home from "../../assets/pages/Home";

// Existing public pages
import VisaTicket from "../visa/VisaTicket";
import Contact from "../contact/Contact";
import About from "../about/About";
import InvestorLicense from "../investorLicense/InvestorLicense";
import InvestorForm from "../investorLicense/InvestorForm";
import ServiceLicense from "../investorLicense/ServiceLicense";
import TradingLicense from "../investorLicense/TradingLicense";
import InvestorLicensePage from "../investorLicense/InvestorLicensePage";
import CompanySetup from "../investorLicense/CompanySetup";
import VisaServices from "../visa/VisaServices";
import AirTicketMain from "../airticket/AirTicketMain";

// New public pages
import TeamPage from "../pages/TeamPage";
import BlogPage from "../pages/BlogPage";
import BlogDetail from "../pages/BlogDetail";
import GalleryPage from "../pages/GalleryPage";
import ServicesPage from "../pages/ServicesPage";
import UmrahPage from "../pages/UmrahPage";

// Admin
import AdminLogin from "../admin/AdminLogin";
import AdminDashboard from "../admin/AdminDashboard";
import ProtectedRoute from "../../router/ProtectedRoute";

export const router = createBrowserRouter(
  [
    {
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/team", element: <TeamPage /> },
        { path: "/blog", element: <BlogPage /> },
        { path: "/blog/:id", element: <BlogDetail /> },
        { path: "/gallery", element: <GalleryPage /> },
        { path: "/services", element: <ServicesPage /> },
        { path: "/umrah", element: <UmrahPage /> },
        { path: "/contact", element: <Contact /> },
        { path: "/investorlicense", element: <InvestorLicense /> },
        { path: "/investorForm", element: <InvestorForm /> },
        { path: "/servicelicense", element: <ServiceLicense /> },
        { path: "/tradinglicense", element: <TradingLicense /> },
        { path: "/investorlicensepage", element: <InvestorLicensePage /> },
        { path: "/companysetup", element: <CompanySetup /> },
        { path: "/visaServices", element: <VisaServices /> },
        { path: "/visaticket", element: <VisaTicket /> },
        { path: "/airticketmain", element: <AirTicketMain /> },
      ],
    },
    {
      path: "/admin/login",
      element: <AdminLogin />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/admin/*",
      element: (
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
    },
  ],
  {
    future: { v7_startTransition: true, v7_relativeSplatPath: true },
  }
);
