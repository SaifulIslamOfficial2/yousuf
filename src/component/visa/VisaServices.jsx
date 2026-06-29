import { motion } from "framer-motion";
import VisaBanner from "./Visabanner";
import visaimg1 from "../../assets/image/investorImage/immigration-img.webp";
import visaimg2 from "../../assets/image/investorImage/Family-ready-for-adventure-at-the-airport.webp";
import visaimg3 from "../../assets/image/investorImage/maidVisa.webp";
import visaimg4 from "../../assets/image/investorImage/frelance-visa.webp";
import visaimg5 from "../../assets/image/investorImage/golden.webp";

const services = [
 {
 title: "Tourist Visa",
 image: visaimg1,
 },
 {
 title: "Family Visa",
 image: visaimg2,
 },
 {
 title: "Maid Visa",
 image: visaimg3,
 },
 {
 title: "Golden Visa",
 image: visaimg5,
 },
 {
 title: "Freelance Visa",
 image: visaimg4,
 },
];

const VisaServices = () => {
 return (
 <section className="pt-20 bg-[#f7f9fc]">
 <VisaBanner />
 <div className="container mx-auto px-6">

 {/* TITLE */}
 <motion.div
 initial={{ opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.7 }}
 viewport={{ once: true }}
 className="text-center mb-14"
 >
 <p className="text-orange-500 text-sm font-semibold tracking-widest">
 VISA SERVICES
 </p>
 <h2 className="text-4xl font-bold text-[#0B3B75] mt-2">
 Visa Services Available
 </h2>
 </motion.div>

 {/* GRID */}
 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

 {services.map((service, index) => (
 <motion.div
 key={index}
 initial={{ opacity: 0, y: 60 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: index * 0.1 }}
 viewport={{ once: true }}
 whileHover={{ scale: 1.05 }}
 className="relative rounded-2xl overflow-hidden shadow-lg group"
 >
 {/* Image */}
 <img
 src={service.image}
 alt={service.title}
 className="w-full h-64 object-cover"
 />

 {/* Overlay */}
 <div className="absolute inset-0 bg-gradient-to-t from-[#0B3B75]/80 to-transparent" />

 {/* Content */}
 <div className="absolute bottom-0 p-5 text-white">
 <h3 className="text-xl font-bold">{service.title}</h3>
 <p className="text-sm opacity-80">
 Fast & reliable visa processing service.
 </p>
 </div>

 {/* Hover effect */}
 <div className="absolute inset-0 bg-[#0B3B75]/20 opacity-0 group-hover:opacity-100 transition" />
 </motion.div>
 ))}

 </div>

 </div>
 </section>
 );
};

export default VisaServices;
