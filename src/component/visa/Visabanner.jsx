import { motion } from "framer-motion";
import travelgirl from "../../assets/image/investorImage/Ready-for-takeoff-with-style.webp";
import plane from "../../assets/image/investorImage/Sleek-modern-jet-in-flight.webp";
const VisaBanner = () => {
 return (
 <section className="py-3 bg-[#f5f7fb]">
 <div className="container mx-auto px-6">

 <div className="grid lg:grid-cols-2 rounded-2xl overflow-hidden shadow-xl">

 {/* LEFT SIDE (IMAGE + COLOR BG) */}
 <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 flex items-end justify-center">

 {/* Image */}
 <motion.img
 src={travelgirl}
 alt="Traveler"
 className="relative z-10 w-[300px] md:w-[350px]"
 initial={{ opacity: 0, x: -50 }}
 whileInView={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.7 }}
 />

 {/* Plane */}
 <motion.img
 src={plane}
 alt="plane"
 className="absolute left-10 bottom-20 w-24 opacity-80"
 animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
 transition={{ duration: 5, repeat: Infinity }}
 />

 {/* Decorative line */}
 <div className="absolute top-10 left-10 w-32 h-32 border-dashed border-white/40 rounded-full"></div>
 </div>

 {/* RIGHT SIDE */}
 <div className="bg-[#162e5c] text-white p-10 md:p-16 flex flex-col justify-center">

 {/* Tag */}
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 className="border border-white/40 px-4 py-1 rounded-full w-fit text-sm mb-5"
 >
 GET FREE ONLINE VISA
 </motion.p>

 {/* Title */}
 <motion.h2
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="text-3xl md:text-5xl font-bold leading-snug mb-6"
 >
 Reliable visa & <br /> immigration experts
 </motion.h2>

 {/* Button */}
 <motion.button
 whileHover={{ scale: 1.08 }}
 whileTap={{ scale: 0.95 }}
 className="bg-[#ff4d4d] hover:bg-[#ff3b3b] text-white px-8 py-3 rounded-full font-semibold w-fit shadow-lg"
 >
 • APPLY FOR VISA •
 </motion.button>

 </div>

 </div>

 </div>
 </section>
 );
};

export default VisaBanner;
