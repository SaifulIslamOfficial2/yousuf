import { FaArrowRight } from "react-icons/fa";
import bannerImg1 from "../../assets/image/investorImage/service2.webp"; 
import bannerImg2 from "../../assets/image/investorImage/tiketGirl.webp"; // replace image
// replace image

const AirTicketBanner = () => {
 return (
 <section className="py-20 bg-[#f7f7f7]">
 <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

 {/* LEFT IMAGE SIDE */}
 <div className="relative">

 {/* IMAGE 1 */}
 <img
 src={bannerImg1}
 alt="air ticket"
 className="rounded-2xl w-[80%] shadow-lg"
 />

 {/* IMAGE 2 */}
 <img
 src={bannerImg2}
 alt="air ticket"
 className="absolute bottom-[-40px] right-0 w-[70%] rounded-2xl shadow-xl border-4 border-white"
 />

 {/* DECORATION */}
 <div className="absolute -bottom-10 left-10 text-[#0B3B75] text-6xl opacity-20">
 
 </div>
 </div>

 {/* RIGHT CONTENT */}
 <div>

 {/* SMALL TITLE */}
 <p className="text-[#0B3B75] font-semibold mb-3">
 About Our Air-Ticket Service
 </p>

 {/* MAIN TITLE */}
 <h2 className="text-4xl font-bold leading-snug text-gray-800">
 Book Flight Tickets <br />
 Worldwide With{" "}
 <span className="text-red-500">Best Price</span> Guarantee
 </h2>

 {/* DESC */}
 <p className="text-gray-600 mt-5 leading-relaxed">
 We provide fast, reliable and affordable air ticket booking services
 for both domestic and international travel. Enjoy hassle-free booking,
 best deals, and 24/7 customer support for your journey.
 </p>

 {/* FEATURES */}
 <div className="grid grid-cols-2 gap-6 mt-6">

 <div>
 <h4 className="font-semibold text-gray-800">
 Global Ticket Booking
 </h4>
 <p className="text-sm text-gray-500">
 Book flights worldwide easily
 </p>
 </div>

 <div>
 <h4 className="font-semibold text-gray-800">
 Best Price Guarantee
 </h4>
 <p className="text-sm text-gray-500">
 Get lowest airfare deals
 </p>
 </div>

 </div>

 {/* LIST */}
 <ul className="mt-6 space-y-3 text-gray-600 text-sm">

 <li>• Instant flight booking with trusted airlines</li>
 <li>• Special discounts on international tickets</li>
 <li>• Flexible travel options & easy changes</li>
 <li>• Assistance with visa & travel documents</li>

 </ul>

 {/* BUTTON */}
 <button className="mt-8 flex items-center gap-3 px-6 py-3 border rounded-full font-semibold hover:bg-[#0B3B75] hover:text-white transition">

 Book Now
 <span className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full">
 <FaArrowRight />
 </span>

 </button>

 </div>

 </div>
 </section>
 );
};

export default AirTicketBanner;
