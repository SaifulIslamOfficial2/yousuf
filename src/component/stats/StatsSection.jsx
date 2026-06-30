import { useEffect, useRef, useState } from "react";
import { FaUsers, FaPassport, FaBuilding, FaStar } from "react-icons/fa";
import { useLang } from "../../i18n/LanguageContext";

const Counter = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = target / (2000 / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref} className="text-4xl font-bold">{count}{suffix}</span>;
};

const StatsSection = () => {
  const { t } = useLang();
  const stats = [
    { icon: <FaUsers />, value: 1000, suffix: "+", label: t.stats.clients, color: "text-blue-600", bg: "bg-blue-50" },
    { icon: <FaPassport />, value: 500, suffix: "+", label: t.stats.visa, color: "text-green-600", bg: "bg-green-50" },
    { icon: <FaBuilding />, value: 200, suffix: "+", label: t.stats.business, color: "text-orange-500", bg: "bg-orange-50" },
    { icon: <FaStar />, value: 5, suffix: "+", label: t.stats.years, color: "text-yellow-500", bg: "bg-yellow-50" },
  ];
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-full flex items-center justify-center text-2xl mx-auto mb-4`}>{stat.icon}</div>
              <div className={stat.color}><Counter target={stat.value} suffix={stat.suffix} /></div>
              <p className="text-gray-600 mt-2 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default StatsSection;
