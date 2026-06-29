import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import {
 FaPlane,
 FaPassport,
 FaBriefcase,
 FaBuilding,
 FaFileAlt,
 FaShieldAlt,
 FaGlobe,
 FaClipboardCheck,
 FaUsers,
 FaIdCard,
 FaStamp,
 FaHandshake,
} from "react-icons/fa";

// 12 SERVICES
const services = [
 { name: "Investor License", icon: <FaBuilding /> },
 { name: "Tourist Visa", icon: <FaPassport /> },
 { name: "Embassy Appointment", icon: <FaClipboardCheck /> },
 { name: "General Services", icon: <FaFileAlt /> },
 { name: "Tour Packages", icon: <FaGlobe /> },
 { name: "Air-Tickets", icon: <FaPlane /> },
 { name: "Driving License", icon: <FaIdCard /> },
 { name: "Business Solutions", icon: <FaBriefcase /> },
 { name: "Travel Insurance", icon: <FaShieldAlt /> },
 { name: "Translation", icon: <FaStamp /> },
 { name: "Family Visa", icon: <FaUsers /> },
 { name: "Absher & Muqeem", icon: <FaHandshake /> },
];

const ServiceCarousel = () => {
 return (
 <div className="py-16 bg-gray-100">

 <div className="max-w-7xl mx-auto px-6 pb-12"> {/* extra bottom space */}

 <Swiper
 modules={[Autoplay, Pagination]}
 spaceBetween={30}
 slidesPerView={5}
 autoplay={{
 delay: 2000,
 disableOnInteraction: false,
 }}
 loop={true}
 pagination={{ clickable: true }}
 breakpoints={{
 0: { slidesPerView: 2 },
 640: { slidesPerView: 3 },
 1024: { slidesPerView: 5 },
 }}
 >

 {services.map((service, index) => (
 <SwiperSlide key={index}>

 <div className="flex flex-col items-center justify-center gap-3 py-6 opacity-70 hover:opacity-100 transition group">

 {/* ICON */}
 <div className="text-4xl text-gray-700 group-hover:text-[#0B3B75] transition">
 {service.icon}
 </div>

 {/* TEXT */}
 <p className="text-sm text-gray-600 group-hover:text-[#0B3B75] transition text-center">
 {service.name}
 </p>

 </div>

 </SwiperSlide>
 ))}

 </Swiper>

 </div>
 </div>
 );
};

export default ServiceCarousel;
