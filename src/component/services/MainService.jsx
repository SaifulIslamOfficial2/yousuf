import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";
import { useLang } from "../../i18n/LanguageContext";

const MainService = () => {
  const [services, setServices] = useState([]);
  const { t, isRTL } = useLang();
  const s = t.services;

  useEffect(() => {
    fetch("serviceData.json").then((res) => res.json()).then((data) => setServices(data)).catch((err) => console.log(err));
  }, []);

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.2 } } };
  const item = { hidden: { opacity: 0, y: 80, scale: 0.8 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } } };

  return (
    <section className="py-20 bg-[#f7f9fc]" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#0B3B75]">{s.title}</h2>
          <p className="text-gray-600 mt-3">{s.subtitle}</p>
        </div>
        <motion.div variants={container} initial="hidden" animate="show" className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div key={index} variants={item}><ServiceCard service={service} /></motion.div>
          ))}
          <motion.div variants={item} whileHover={{ scale: 1.07 }}
            className="bg-gradient-to-r from-[#0B3B75] to-[#1E6FB8] rounded-2xl p-8 text-white flex flex-col justify-between relative overflow-hidden shadow-xl">
            <div>
              <h3 className="text-2xl font-bold leading-snug">{s.ctaTitle}</h3>
              <p className="mt-4 text-gray-200">{s.ctaDesc}</p>
            </div>
            <Link to="/contact" className="mt-6 bg-white/20 px-6 py-3 rounded-full font-semibold w-fit border border-white/30 backdrop-blur hover:bg-white hover:text-[#0B3B75] transition">
              {s.ctaBtn}
            </Link>
            <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full"></motion.div>
            <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute right-10 top-10 w-32 h-32 bg-white/10 rounded-full"></motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

import { Link } from "react-router-dom";
export default MainService;
