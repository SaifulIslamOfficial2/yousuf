import { FaGlobe, FaFileAlt, FaChartLine, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLang } from "../../i18n/LanguageContext";

const Features = () => {
  const { t } = useLang();
  const f = t.features;
  const cards = [
    { icon: <FaGlobe />, title: f.card1Title, desc: f.card1Desc },
    { icon: <FaFileAlt />, title: f.card2Title, desc: f.card2Desc },
    { icon: <FaChartLine />, title: f.card3Title, desc: f.card3Desc },
  ];
  return (
    <section className="bg-[#eef3f9]">
      <div className="grid lg:grid-cols-2">
        <div className="p-12 lg:p-20 flex flex-col justify-center">
          <span className="bg-[#0B3B75] text-white text-sm px-4 py-1 rounded-full w-fit mb-5">{f.tag}</span>
          <h2 className="text-4xl font-bold text-[#0B3B75] leading-snug">{f.title}</h2>
          <p className="text-gray-500 mt-6 leading-relaxed max-w-md">{f.desc}</p>
          <Link to="/contact" className="mt-8 bg-[#0B3B75] text-white px-6 py-3 rounded-xl flex items-center gap-2 w-fit hover:scale-105 transition">
            {f.btn} <FaArrowRight />
          </Link>
        </div>
        <div className="border-l">
          {cards.map((card, i) => (
            <div key={i} className={`p-10 flex gap-6 items-start ${i < cards.length - 1 ? "border-b" : ""}`}>
              <div className="text-4xl text-[#0B3B75]">{card.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-[#0B3B75]">{card.title}</h3>
                <p className="text-gray-500 mt-2">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Features;
