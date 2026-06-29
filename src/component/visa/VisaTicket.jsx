import { motion } from "framer-motion";
import { FaPassport, FaDollarSign, FaUndoAlt, FaGlobe, FaFileAlt } from "react-icons/fa";
import aboutImg from "../../assets/image/Get-your-Visa-And-ticket.webp";

const container = {
 hidden: {},
 show: {
 transition: {
 staggerChildren: 0.2,
 },
 },
};

const item = {
 hidden: { opacity: 0, y: 40 },
 show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const VisaTicket = () => {
 return (
 <section className="py-16 bg-[#f7f9fc] overflow-hidden">
 <div className="container mx-auto px-6">

 {/* TOP */}
 <motion.div
 initial={{ opacity: 0, y: -50 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.7 }}
 viewport={{ once: true }}
 className="grid lg:grid-cols-2 gap-10 items-center"
 >

 {/* LEFT COUNTER */}
 <div className="flex items-center gap-4">

 <div className="border-2 border-dashed border-[#1E6FB8] p-6 text-6xl font-bold text-[#0B3B75]">
 100+
 </div>

 <div className=" rounded-md text-white font-semibold 
bg-gradient-to-r from-[#16166b] to-[#1105f3] 
hover:from-[#1105f3] hover:to-[#16166b] 
transition-all duration-300 text-white px-4 py-6 text-center rotate-[-90deg] rounded">
 <p className="text-sm tracking-widest">COUNTRIES</p>
 <p className="font-bold uppercase">DESTINATION</p>
 </div>

 </div>

 {/* RIGHT TEXT */}
 <div>
 <p className="text-[#1E6FB8] font-semibold mb-2 uppercase">
 ABOUT VISA & TICKET SERVICES
 </p>

 <h2 className="text-3xl md:text-4xl font-bold text-[#0B3B75] leading-snug">
 Make Every Journey Unforgettable with Expert Visa Support
 </h2>

 <p className="mt-4 text-gray-500">
 We are a fast-growing visa consultancy based in Saudi Arabia, specializing in tourist and visit visas worldwide.
 Whether you're planning a holiday, family visit, or international trip, our expert team ensures a smooth and hassle-free process.
 </p>
 </div>
 </motion.div>

 {/* BOTTOM */}
 <div className="grid lg:grid-cols-2 gap-10 mt-12 items-center">

 {/* IMAGE */}
 <motion.div
 initial={{ opacity: 0, x: -80 }}
 whileInView={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.7 }}
 viewport={{ once: true }}
 >
 <img
 src={aboutImg}
 alt="visa service"
 className="rounded-lg shadow-lg"
 />
 </motion.div>

 {/* SERVICES */}
 <motion.div
 variants={container}
 initial="hidden"
 whileInView="show"
 viewport={{ once: true }}
 className="space-y-6"
 >

 {[
 { icon: <FaPassport />, title: "Premium Visa Processing", desc: "Fast and reliable visa services for any destination with complete documentation support." },
 { icon: <FaGlobe />, title: "Worldwide Visa Coverage", desc: "We process visas for 100+ countries, helping you travel anywhere in the world." },
 { icon: <FaDollarSign />, title: "Best Price Guarantee", desc: "Get the most competitive rates. Found better? We’ll match it." },
 { icon: <FaUndoAlt />, title: "Easy Cancellation", desc: "Flexible booking with quick and simple cancellation options." },
 { icon: <FaFileAlt />, title: "Document Assistance", desc: "We help prepare and verify all documents for smooth approval." },
 ].map((itemData, index) => (
 <motion.div
 key={index}
 variants={item}
 whileHover={{ scale: 1.03 }}
 className="flex items-start gap-4 bg-white p-5 rounded-xl shadow hover:shadow-2xl transition border border-gray-100"
 >
 {/* ICON */}
 <div className="bg-gradient-to-r from-[#0B3B75] to-[#1E6FB8] text-white p-3 rounded-full text-lg">
 {itemData.icon}
 </div>

 {/* TEXT */}
 <div>
 <h4 className="font-semibold text-lg text-[#0B3B75]">
 {itemData.title}
 </h4>
 <p className="text-gray-500 text-sm">
 {itemData.desc}
 </p>
 </div>
 </motion.div>
 ))}

 </motion.div>

 </div>

 </div>
 </section>
 );
};

export default VisaTicket;
