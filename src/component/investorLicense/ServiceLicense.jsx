import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import serviceImg from "../../assets/image/investor.webp";
import investorpageimg from "../../assets/image/investorImage/invespageImage.webp"; // change image if needed

const ServiceLicense = () => {
 return (
 <>
 {/* TOP BANNER */}
 <div className="relative h-[300px] flex items-center justify-center text-center">
 <img
 src={serviceImg}
 alt="Service License"
 className="absolute inset-0 w-full h-full object-cover"
 />
 <div className="absolute inset-0 bg-black/60"></div>

 <div className="relative z-10 text-white">
 <h1 className="text-4xl md:text-5xl font-bold mb-3">
 Service License
 </h1>
 <p className="text-sm">
 Home / <span className="text-red-400">Service License</span>
 </p>
 </div>
 </div>

 {/* MAIN SECTION */}
 <section className="py-20 bg-[#f6f7fb]">
 <div className="container mx-auto px-6">

 <div className="grid lg:grid-cols-3 gap-10">

 {/* SIDEBAR */}
 <div className="space-y-6 self-start">

 <div className="bg-white rounded-xl shadow p-4 space-y-2">

 <NavLink
 to="/service-license"
 className={({ isActive }) =>
 `flex justify-between px-4 py-3 rounded-lg ${
 isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
 }`
 }
 >
 Service License</NavLink>

 <NavLink
 to="/investorlicensepage"
 className={({ isActive }) =>
 `flex justify-between px-4 py-3 rounded-lg ${
 isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
 }`
 }
 >
 Investor License</NavLink>

 </div>

</div>

 {/* CONTENT */}
 <div className="lg:col-span-2 space-y-10">

 {/* IMAGE */}
 <motion.img
 initial={{ opacity: 0, y: 40 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 src={investorpageimg}
 className="w-full rounded-xl shadow"
 />

 {/* TITLE */}
 <div>
 <h2 className="text-2xl font-bold text-[#0B3B75] mb-4">
 Service License in Saudi Arabia
 </h2>

 <p className="text-gray-600 text-sm leading-relaxed">
 A Service License in Saudi Arabia allows businesses to provide professional and specialized services such as IT solutions, consultancy, marketing, education, and other non-trading activities. It is one of the most popular licenses for foreign investors who want to start a service-based company.
 </p>
 </div>

 {/* SERVICES LIST */}
 <div>
 <h3 className="text-xl font-semibold mb-4">
 Types of Services Allowed
 </h3>

 <ul className="space-y-2 text-gray-600 text-sm">
 <li>• IT & Software Development</li>
 <li>• Business Consultancy</li>
 <li>• Digital Marketing Agencies</li>
 <li>• Education & Training Services</li>
 <li>• Engineering & Professional Services</li>
 </ul>
 </div>

 {/* REQUIREMENTS */}
 <div>
 <h3 className="text-xl font-semibold mb-4">
 Requirements
 </h3>

 <ul className="space-y-2 text-gray-600 text-sm">
 <li>1. Valid Passport Copy</li>
 <li>2. Business Activity Selection</li>
 <li>3. Office Address in Saudi Arabia</li>
 <li>4. Company Documents (if foreign company)</li>
 </ul>
 </div>

 {/* BENEFITS */}
 <div>
 <h3 className="text-xl font-semibold mb-4">
 Benefits of Service License
 </h3>

 <ul className="space-y-2 text-gray-600 text-sm">
 <li>• 100% Foreign Ownership</li>
 <li>• Low Setup Cost</li>
 <li>• Fast Approval</li>
 <li>• High Demand in Saudi Market</li>
 </ul>
 </div>

 {/* COST */}
 <div>
 <h3 className="text-xl font-semibold mb-4">
 Estimated Cost
 </h3>

 <p className="text-gray-600 text-sm">
 The cost of a Service License in Saudi Arabia typically ranges from 
 <span className="font-semibold text-blue-600"> SAR 20,000 – 30,000</span> depending on business activity and setup requirements.
 </p>
 </div>

 {/* CTA */}
 <div className="text-center pt-6">
 <Link
 to="/investorForm"
 className="bg-gradient-to-r from-[#0B3B75] to-[#1E6FB8] text-white px-10 py-4 rounded-full font-semibold hover:scale-105 transition"
 >
 Apply for Service License</Link>
 </div>

 </div>

 </div>

 </div>
 </section>
 </>
 );
};

export default ServiceLicense;
