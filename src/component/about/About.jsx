import { FaCheckCircle, FaPlane, FaPassport, FaBriefcase } from "react-icons/fa";
import aboutImg from "../../assets/image/investorImage/aboutimg.webp";
import { Link } from "react-router-dom";
import { useLang } from "../../i18n/LanguageContext";

const About = () => {
  const { t } = useLang();
  const a = t.about;
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <img src={aboutImg} alt="Yousuf Consultancy" className="rounded-2xl shadow-2xl w-full" />
          <div className="absolute -bottom-6 left-6 bg-[#0B3B75] text-white px-6 py-3 rounded-xl shadow-lg">
            <p className="text-lg font-semibold">{a.badge}</p>
          </div>
        </div>
        <div>
          <p className="text-[#0B3B75] font-semibold mb-3">{a.tag}</p>
          <h2 className="text-4xl font-bold text-gray-800 leading-snug">
            {a.title}<br /><span className="text-red-500">{a.titleHighlight}</span>
          </h2>
          <p className="text-gray-600 mt-5 leading-relaxed">{a.desc}</p>
          <div className="mt-6 space-y-3 text-gray-700">
            <div className="flex items-center gap-3"><FaCheckCircle className="text-green-500 shrink-0" /><p>{a.point1}</p></div>
            <div className="flex items-center gap-3"><FaPassport className="text-blue-500 shrink-0" /><p>{a.point2}</p></div>
            <div className="flex items-center gap-3"><FaPlane className="text-orange-500 shrink-0" /><p>{a.point3}</p></div>
            <div className="flex items-center gap-3"><FaBriefcase className="text-purple-500 shrink-0" /><p>{a.point4}</p></div>
          </div>
          <Link to="/contact" className="inline-block mt-8 px-6 py-3 bg-[#0B3B75] text-white rounded-full font-semibold hover:bg-[#1E6FB8] transition">{a.btn}</Link>
        </div>
      </div>
    </section>
  );
};
export default About;
