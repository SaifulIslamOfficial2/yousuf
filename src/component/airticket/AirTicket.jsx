import {
 FaClipboardList,
 FaPlane,
 FaUsers,
 FaCreditCard,
 FaArrowRight,
} from "react-icons/fa";

// import worldmapbgimg from "../../assets/image/investorImage/worldmapbg.webp";

const steps = [
 {
 title: "Online Booking",
 desc: "Book your air ticket easily through our fast and secure system.",
 icon: <FaClipboardList />,
 },
 {
 title: "Flight Ticket",
 desc: "Get the best flight options at the most competitive prices.",
 icon: <FaPlane />,
 },
 {
 title: "Confirm Travel",
 desc: "Confirm your journey with complete guidance and support.",
 icon: <FaUsers />,
 },
 {
 title: "Easy Payments",
 desc: "Multiple secure payment options for your convenience.",
 icon: <FaCreditCard />,
 },
];

const AirTicket = () => {
 return (
 <section className="py-20 bg-[#f7f9fc] relative overflow-hidden">

 {/* WORLD MAP BACKGROUND */}
 <div
 className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-20"
 style={{
 backgroundImage: "url('../../assets/image/investorImage/worldmapbg.jpg')",
 }}
></div>

 {/* LIGHT OVERLAY */}
 <div className="absolute inset-0 bg-white/80"></div>

 {/* CONTENT */}
 <div className="max-w-7xl mx-auto px-6 relative">

 {/* TITLE */}
 <div className="text-center mb-16">
 <p className="text-blue-600 font-semibold mb-2">
 Booking Roadmap
 </p>

 <h2 className="text-4xl font-bold text-blue-600 leading-snug">
 4 Easy Steps <br /> For Your Air-Ticket Journey
 </h2>
 </div>

 {/* STEPS */}
 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">

 {steps.map((step, index) => (
 <div
 key={index}
 className="group p-6 rounded-xl hover:shadow-xl transition duration-300 bg-white/50 backdrop-blur-sm"
 >

 {/* ICON */}
 <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-[#0B3B75] text-white text-3xl mb-6 border-4 border-blue-100 group-hover:scale-110 transition duration-300">
 {step.icon}
 </div>

 {/* TITLE */}
 <h3 className="text-xl font-semibold mb-3 text-[#0B3B75]">
 {step.title}
 </h3>

 {/* DESC */}
 <p className="text-gray-600 text-sm leading-relaxed px-2">
 {step.desc}
 </p>

 {/* BUTTON */}
 <div className="mt-6 flex justify-center">
 <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0B3B75] text-white group-hover:bg-blue-600 transition duration-300 cursor-pointer">
 <FaArrowRight />
 </div>
 </div>

 </div>
 ))}

 </div>

 </div>
 </section>
 );
};

export default AirTicket;
