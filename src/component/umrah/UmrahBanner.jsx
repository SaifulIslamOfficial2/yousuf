import umrahimg from "../../assets/image/investorImage/makkah.webp";
import { Link } from "react-router-dom";
import { useLang } from "../../i18n/LanguageContext";

const UmrahBanner = () => {
  const { t } = useLang();
  const u = t.umrah;
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-blue-600 font-semibold mb-2 tracking-wide">{u.tag}</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">{u.title}</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">{u.desc}</p>
          <div className="mt-6 bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-5 rounded-xl shadow-lg">
            <p className="font-semibold">{u.directFlight}</p>
            <p className="font-semibold">{u.transitFlight}</p>
          </div>
          <Link to="/contact" className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-full shadow-lg transition">
            {u.btn}
          </Link>
          <div className="mt-10 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold">Yousuf Consultancy</h3>
            <p className="text-yellow-300 text-sm">{u.trustedLabel}</p>
            <div className="mt-2 text-sm opacity-90">
              <p>{u.madinah}: +966 57 146 1938</p>
              <p>{u.jeddah}: +966 50983 2826</p>
              <p>{u.dhaka}: +88 01636050945</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <img src={umrahimg} alt="Umrah" className="w-full h-[420px] md:h-[520px] object-cover rounded-2xl shadow-xl" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent rounded-b-2xl"></div>
        </div>
      </div>
    </section>
  );
};
export default UmrahBanner;
