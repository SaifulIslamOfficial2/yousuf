import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLang } from "../../i18n/LanguageContext";
import logo from "../../assets/image/logo_no_bg_v2.webp";

const Footer = () => {
  const { t, lang } = useLang();
  const f = t.footer;

  const quickLinks = [
    { to: "/", label: f.links.home },
    { to: "/about", label: f.links.about },
    { to: "/team", label: f.links.team },
    { to: "/blog", label: f.links.blog },
    { to: "/gallery", label: f.links.gallery },
    { to: "/contact", label: f.links.contact },
  ];

  const serviceLinks = [
    { to: "/investorlicense", label: f.serviceLinks.investorLicense },
    { to: "/visaServices", label: f.serviceLinks.visaProcessing },
    { to: "/airticketmain", label: f.serviceLinks.airTicket },
    { to: "/services", label: f.serviceLinks.generalServices },
  ];

  const contacts = [
    { icon: <FaPhone />, text: "+966 57 146 1938", label: f.madinah },
    { icon: <FaPhone />, text: "+966 50 983 2826", label: f.jeddah },
    { icon: <FaPhone />, text: "+88 01636050945", label: f.dhaka },
    { icon: <FaEnvelope />, text: "info@yousufconsultancy.com", label: f.email },
    { icon: <FaMapMarkerAlt />, text: lang === "bn" ? "মদিনা, সৌদি আরব" : "Madinah, Saudi Arabia", label: f.headOffice },
  ];

  return (
    <footer className="pt-20 pb-6 bg-[#f7f9fc] border-t border-gray-200">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/"><img className="h-20 w-auto" src={logo} alt="Yousuf Consultancy" /></Link>
            <p className="text-gray-600 mt-4 text-sm leading-relaxed">{f.desc}</p>
            <div className="flex gap-3 mt-5">
              {[
                { Icon: FaFacebookF, href: "#", hover: "hover:bg-blue-600" },
                { Icon: FaWhatsapp, href: "https://wa.me/966571461938", hover: "hover:bg-green-500" },
                { Icon: FaInstagram, href: "#", hover: "hover:bg-pink-500" },
                { Icon: FaLinkedinIn, href: "#", hover: "hover:bg-blue-700" },
              ].map(({ Icon, href, hover }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-white rounded-full shadow hover:text-white transition ${hover}`}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#0B3B75] mb-4">{f.quickLinks}</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-600 hover:text-[#0B3B75] transition flex items-center gap-1.5"
                  >
                    <FaChevronRight className="text-[#1E6FB8] text-xs" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#0B3B75] mb-4">{f.ourServices}</h3>
            <ul className="space-y-2 text-sm">
              {serviceLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-600 hover:text-[#0B3B75] transition flex items-center gap-1.5"
                  >
                    <FaChevronRight className="text-[#1E6FB8] text-xs" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#0B3B75] mb-4">{f.contactInfo}</h3>
            <ul className="space-y-3 text-sm">
              {contacts.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600">
                  <span className="text-[#1E6FB8] mt-0.5 shrink-0">{c.icon}</span>
                  <div>
                    <span className="text-xs text-gray-400">{c.label}</span>
                    <p>{c.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Yousuf Consultancy. {f.rights}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
