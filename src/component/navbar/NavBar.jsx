import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/image/logo_no_bg_v2.webp";
import { FaBars, FaTimes } from "react-icons/fa";
import { useLang } from "../../i18n/LanguageContext";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, lang, toggleLang } = useLang();

  const navLinks = [
    { to: "/", label: t.nav.home, end: true },
    { to: "/about", label: t.nav.about },
    { to: "/services", label: t.nav.services },
    { to: "/investorlicense", label: t.nav.investorLicense },
    { to: "/team", label: t.nav.team },
    { to: "/blog", label: t.nav.blog },
    { to: "/gallery", label: t.nav.gallery },
    { to: "/contact", label: t.nav.contact },
  ];

  const activeCls = "text-[#1E6FB8] font-semibold";
  const normalCls = "text-gray-700 hover:text-[#1E6FB8] transition-colors duration-200";

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        <Link to="/" className="flex-shrink-0">
          <img className="h-14 w-auto" src={logo} alt="Yousuf Consultancy" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-5 font-medium">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) => (isActive ? activeCls : normalCls)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:text-[#0B3B75] hover:border-[#1E6FB8] transition text-sm font-semibold"
            title="Switch Language"
          >
            <span>{lang === "bn" ? "EN" : "বাং"}</span>
          </button>
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-lg text-white font-semibold bg-gradient-to-r from-[#0B3B75] to-[#1E6FB8] hover:opacity-90 transition shadow-md"
          >
            {t.nav.contactBtn}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          {/* Mobile Language Toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-semibold"
          >
            {lang === "bn" ? "EN" : "বাং"}
          </button>
          <button
            className="text-[#0B3B75] text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-4 py-4 gap-1">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg font-medium transition ${
                    isActive
                      ? "bg-[#f0f5ff] text-[#1E6FB8]"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="block text-center px-4 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#0B3B75] to-[#1E6FB8]"
            >
              {t.nav.contactBtn}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
