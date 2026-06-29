import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ServiceCard from "./ServiceCard";
import { useLang } from "../../i18n/LanguageContext";

const AllServices = () => {
 const { services } = useContext(AuthContext);
 const { t } = useLang();

 return (
 <section className="bg-gray-100">

 {/* TOP BANNER */}
 <div className="relative h-[250px] flex items-center justify-center text-white text-center">
 <div
 className="absolute inset-0 bg-cover bg-center"
 style={{
 backgroundImage:
 "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1')",
 }}
 ></div>

 {/* OVERLAY */}
 <div className="absolute inset-0 bg-gradient-to-r from-[#0B3B75]/80 to-[#1E6FB8]/80"></div>

 {/* CONTENT */}
 <div className="relative z-10">
 <h1 className="text-4xl font-bold">{t.services.title}</h1>
 <p className="text-sm mt-2 opacity-80">
 Home / <span className="text-blue-300">Services</span>
 </p>
 </div>
 </div>

 {/* SERVICE CARDS */}
 <div className="max-w-7xl mx-auto px-6 py-16">

 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

 {services.map((service, index) => (
 <div
 key={index}
 className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition duration-300"
 >

 {/* IMAGE */}
 <div className="relative">
 <img
 src={service.image}
 alt={service.title}
 className="h-48 w-full object-cover"
 />

 {/* ICON FLOAT */}
 <div className="absolute bottom-[-20px] right-4 bg-white shadow-lg p-3 rounded-xl text-[#1E6FB8]">
 {service.icon}
 </div>
 </div>

 {/* CONTENT */}
 <div className="p-6 pt-10">
 <h3 className="text-lg font-semibold text-[#0B3B75] mb-2">
 {service.title}
 </h3>

 <p className="text-gray-500 text-sm mb-4">
 {service.desc}
 </p>

 <button className="text-[#1E6FB8] text-sm font-medium hover:underline">
 Learn More</button>
 </div>
 </div>
 ))}

 </div>
 </div>

 {/* CTA SECTION */}
 <div className="bg-gradient-to-r from-[#0B3B75] to-[#1E6FB8] py-16 text-center text-white relative overflow-hidden">

 {/* DOT PATTERN (optional) */}
 <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>

 <div className="relative z-10">
 <h2 className="text-3xl font-bold mb-3">
 Ready to Start Your Journey?
 </h2>
 <p className="text-sm mb-6 opacity-90">
 Get a free consultation and eligibility assessment from our expert team.
 </p>

 <button className="px-6 py-3 rounded-md bg-white text-[#0B3B75] font-semibold shadow hover:scale-105 transition">
 Book Free Consultation
 </button>
 </div>
 </div>

 </section>
 );
};

export default AllServices;
