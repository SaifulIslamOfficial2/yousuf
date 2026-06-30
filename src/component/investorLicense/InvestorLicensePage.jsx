import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import img from "../../assets/image/investor.webp";
import investorlicensepic from "../../assets/image/investorImage/investorLicensepic.webp"; // change image if needed

const InvestorLicensePage = () => {
 return (
 <>
 {/* TOP BANNER */}
 <div className="relative h-[300px] flex items-center justify-center text-center">
 <img
 src={img}
 className="absolute w-full h-full object-cover"
 />
 <div className="absolute inset-0 bg-black/60"></div>

 <div className="relative text-white">
 <h1 className="text-4xl md:text-5xl font-bold">
 Investor License
 </h1>
 <p className="text-sm mt-2">
 Home / <span className="text-red-400">Investor License</span>
 </p>
 </div>
 </div>

 {/* MAIN SECTION */}
 <section className="py-20 bg-[#f6f7fb]">
 <div className="container mx-auto px-6">

 <div className="grid lg:grid-cols-3 gap-10 items-start">

 {/* SIDEBAR */}
 <div className="bg-white rounded-xl shadow p-4 space-y-2">

 <NavLink
 to="/servicelicense"
 className={({ isActive }) =>
 `block px-4 py-3 rounded-lg ${
 isActive ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100"
 }`
 }
 >
 Service License</NavLink>

 <NavLink
 to="/investor-license"
 className={({ isActive }) =>
 `block px-4 py-3 rounded-lg ${
 isActive ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100"
 }`
 }
 >
 Investor License</NavLink>

 </div>

 {/* CONTENT */}
 <div className="lg:col-span-2 space-y-10">

 {/* IMAGE */}
 <motion.img
 initial={{ opacity: 0, y: 40 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 src={investorlicensepic}
 className="w-full rounded-xl shadow-lg"
 />

 {/* TITLE */}
 <div>
 <h2 className="text-3xl font-bold text-[#0B3B75] mb-4">
 Investor License (MISA) in Saudi Arabia
 </h2>

 <p className="text-gray-600 leading-relaxed">
 The Investor License issued by MISA (Ministry of Investment Saudi Arabia) allows foreign investors to legally establish and operate a business with 100% ownership. It is the first and most important step to enter the Saudi market.
 </p>
 </div>

 {/* BENEFITS */}
 <div className="bg-white p-6 rounded-xl shadow">
 <h3 className="text-xl font-semibold mb-4 text-[#0B3B75]">
 Key Benefits
 </h3>

 <ul className="space-y-2 text-gray-600">
 <li>• 100% Foreign Ownership</li>
 <li>• Fast & Easy Approval</li>
 <li>• Access to Saudi Market</li>
 <li>• Multiple Business Activities</li>
 </ul>
 </div>

 {/* REQUIREMENTS */}
 <div className="bg-white p-6 rounded-xl shadow">
 <h3 className="text-xl font-semibold mb-4 text-[#0B3B75]">
 Requirements
 </h3>

 <ul className="space-y-2 text-gray-600">
 <li>1. Passport Copy</li>
 <li>2. Business Plan</li>
 <li>3. Financial Statement</li>
 <li>4. Company Documents</li>
 </ul>
 </div>

 {/* PROCESS */}
 <div className="bg-white p-6 rounded-xl shadow">
 <h3 className="text-xl font-semibold mb-4 text-[#0B3B75]">
 Step-by-Step Process
 </h3>

 <ul className="space-y-2 text-gray-600">
 <li>• Apply via MISA Portal</li>
 <li>• Submit Documents</li>
 <li>• Government Review</li>
 <li>• License Approval</li>
 </ul>
 </div>

 {/* COST */}
 <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl shadow">
 <h3 className="text-xl font-semibold mb-4 text-[#0B3B75]">
 Estimated Cost
 </h3>

 <p className="text-gray-600">
 Investor License cost typically ranges from 
 <span className="font-semibold text-blue-600"> SAR 30,000 – 40,000+</span> depending on business type and requirements.
 </p>
 </div>

 {/* CTA */}
 <div className="text-center pt-6">
 <Link
 to="/investorForm"
 className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0B3B75] to-[#1E6FB8] text-white px-10 py-4 rounded-full font-semibold hover:scale-105 transition shadow-lg"
 >
 Apply Now</Link>
 </div>

 </div>

 </div>

 </div>
 </section>
 </>
 );
};

export default InvestorLicensePage;
