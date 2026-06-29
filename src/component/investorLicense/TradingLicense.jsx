import { Link } from "react-router-dom";
import tradingImg from "../../assets/image/investor.webp";

const TradingLicense = () => {
 return (
 <>
 {/* BANNER */}
 <div className="relative h-[280px] flex items-center justify-center">
 <img src={tradingImg} className="absolute w-full h-full object-cover"/>
 <div className="absolute inset-0 bg-black/60"></div>

 <div className="relative text-white text-center">
 <h1 className="text-4xl font-bold">Trading License</h1>
 <p className="text-sm">Home / Trading License</p>
 </div>
 </div>

 {/* CONTENT */}
 <section className="py-20 bg-[#f6f7fb]">
 <div className="container mx-auto px-6">

 <h2 className="text-2xl font-bold mb-4 text-[#0B3B75]">
 Trading License in Saudi Arabia
 </h2>

 <p className="text-gray-600 mb-6">
 Trading license allows businesses to import, export, and sell goods in Saudi Arabia and internationally.
 </p>

 <ul className="space-y-2 text-gray-600">
 <li>• Import & Export Business</li>
 <li>• Wholesale & Retail</li>
 <li>• E-commerce</li>
 <li>• Product Distribution</li>
 </ul>

 <div className="mt-10">
 <Link to="/investorForm" className="bg-green-600 text-white px-8 py-3 rounded-full">
 Apply Now</Link>
 </div>

 </div>
 </section>
 </>
 );
};

export default TradingLicense;
