import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Investorimage from "../../assets/image/investor.webp";
import contactus from "../../assets/image/investorImage/contactus-1.webp"; // change image if needed
import { FaUserTie, FaFileAlt, FaMoneyBillWave, FaBuilding } from "react-icons/fa";

const InvestorLicense = () => {
 return (
 <section className=" bg-[#f6f7fb]">

 {/* TOP BANNER */}
<div className="relative h-[300px] flex items-center justify-center text-center">

 {/* BACKGROUND IMAGE */}
 <img
 src={Investorimage}
 alt="banner"
 className="absolute inset-0 w-full h-full object-cover"
 />

 {/* DARK OVERLAY */}
 <div className="absolute inset-0 bg-black/60"></div>

 {/* CONTENT */}
 <div className="relative z-10 text-white">
 <h1 className="text-4xl md:text-5xl font-bold mb-3">
 Investor License
 </h1>

 <p className="text-sm opacity-90">
 Home / <span className="text-red-400">Investor License</span>
 </p>
 </div>

</div>
 <div className="container mx-auto mt-4 p-6">

 <div className="grid lg:grid-cols-3 gap-10">

 {/* LEFT SIDEBAR */}
 <div className="space-y-6">

 {/* MENU */}
 <div className="bg-white rounded-xl shadow p-4">

 <Link to="/servicelicense" className="block">
 <div className="flex justify-between items-center px-4 py-3 rounded-lg hover:bg-blue-50 transition cursor-pointer">
 <span className="text-gray-700 text-sm">Service License</span>
 <span></span>
 </div>
 </Link>

 <Link to="/tradinglicense" className="block">
 <div className="flex justify-between items-center px-4 py-3 rounded-lg hover:bg-blue-50 transition cursor-pointer">
 <span className="text-gray-700 text-sm">Trading License</span>
 <span></span>
 </div>
 </Link>

 <Link to="/investorlicensepage" className="block">
 <div className="flex justify-between items-center px-4 py-3 rounded-lg hover:bg-blue-50 transition cursor-pointer">
 <span className="text-gray-700 text-sm">Investor License</span>
 <span></span>
 </div>
 </Link>

 <Link to="/companysetup" className="block">
 <div className="flex justify-between items-center px-4 py-3 rounded-lg hover:bg-blue-50 transition cursor-pointer">
 <span className="text-gray-700 text-sm">Company Setup</span>
 <span></span>
 </div>
 </Link>

 </div>

 {/* CONTACT CARD */}
 <div className="bg-white rounded-xl shadow overflow-hidden">
 <img
 src={contactus}
 alt="contact"
 className="w-full h-40 object-cover"
 />

 <div className="bg-[#0B3B75] text-white p-6 text-center">
 <h4 className="font-semibold mb-2">
 Need Help? Contact Us
 </h4>
 <p className="text-sm mb-4">
 Get expert support for your Saudi business setup.
 </p>

 <Link
 to="/contact"
 className="bg-red-500 px-5 py-2 rounded-full text-sm inline-block"
 >
 Contact Now
 </Link>
 </div>
 </div>

</div>

 {/* RIGHT CONTENT */}
 <div className="lg:col-span-2 space-y-10">

 {/* IMAGE */}
 <motion.img
 initial={{ opacity: 0, y: 40 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 src={Investorimage}
 alt="Investor"
 className="w-full rounded-xl shadow"
 />

 {/* TITLE */}
 <div>
 <h2 className="text-2xl font-bold text-[#0B3B75] mb-4">
 Investor License Details
 </h2>

 <p className="text-gray-600 text-sm leading-relaxed">
 Investor License (MISA License) allows foreign investors to legally establish a business in Saudi Arabia with 100% ownership. This license is the first and most important step to start your company.
 </p>
 </div>

 {/* LIST */}
 <ul className="space-y-3 text-gray-700 text-sm">
 <li>• 100% Foreign Ownership</li>
 <li>• Fast Approval Process</li>
 <li>• Access to Saudi Market</li>
 <li>• Multiple Business Activities</li>
 </ul>

 {/* ADDITIONAL */}
 <div>
 <h3 className="text-xl font-semibold mb-4">
 Required Documents
 </h3>

 <ul className="space-y-2 text-sm text-gray-600">
 <li>1. Passport Copy</li>
 <li>2. Business Plan</li>
 <li>3. Financial Statement</li>
 <li>4. Company Documents</li>
 </ul>
 </div>

 {/* BENEFITS */}
 <div>
 <h3 className="text-xl font-semibold mb-4">
 Benefits
 </h3>

 <ul className="space-y-2 text-sm text-gray-600">
 <li>• 100% Ownership</li>
 <li>• Easy Company Setup</li>
 <li>• Government Support</li>
 <li>• Fast Registration</li>
 </ul>
 </div>

 {/* DOWNLOAD BOX */}
 <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
 <div>
 <h4 className="font-semibold">Application Form</h4>
 <p className="text-sm text-gray-500">
 Download Investor License Form
 </p>
 </div>
 <Link to="/investorForm" className="bg-red-500 text-white px-5 py-2 rounded-lg text-sm">
 Apply Now
 </Link>
 </div>

 </div>

 </div>

 </div>

 {/* INVESTOR LICENSE PROCESS */}
<section className="py-24 bg-[#f6f7fb]">
 <div className="container mx-auto px-6 text-center">

 {/* HEADER */}
 <p className="text-red-500 font-semibold tracking-widest uppercase mb-3">
 Working Process
 </p>

 <h2 className="text-4xl md:text-5xl font-bold text-[#0B3B75] mb-16">
 4 Steps to Get Your Investor License
 </h2>

 {/* STEPS */}
 <div className="relative grid md:grid-cols-4 gap-10 items-center">

 {/* LINE */}
 <div className="hidden md:block absolute top-16 left-0 w-full border-t-2 border-dashed border-blue-300"></div>

 {/* STEP 1 */}
 <div className="relative z-10">
 <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl shadow">
 <FaUserTie />
 </div>

 <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[#0B3B75] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
 1
 </div>

 <h3 className="mt-6 font-semibold text-lg">Choose Business</h3>
 <p className="text-gray-500 text-sm mt-2">
 Select your business activity and investment type.
 </p>
 </div>

 {/* STEP 2 */}
 <div className="relative z-10">
 <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl shadow">
 <FaFileAlt />
 </div>

 <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[#0B3B75] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
 2
 </div>

 <h3 className="mt-6 font-semibold text-lg">Submit Documents</h3>
 <p className="text-gray-500 text-sm mt-2">
 Provide required documents for MISA approval.
 </p>
 </div>

 {/* STEP 3 */}
 <div className="relative z-10">
 <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl shadow">
 <FaMoneyBillWave />
 </div>

 <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[#0B3B75] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
 3
 </div>

 <h3 className="mt-6 font-semibold text-lg">Review & Payment</h3>
 <p className="text-gray-500 text-sm mt-2">
 Government reviews your application and process fee.
 </p>
 </div>

 {/* STEP 4 */}
 <div className="relative z-10">
 <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl shadow">
 <FaBuilding />
 </div>

 <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[#0B3B75] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
 4
 </div>

 <h3 className="mt-6 font-semibold text-lg">Get License</h3>
 <p className="text-gray-500 text-sm mt-2">
 Receive your investor license and start business.
 </p>
 </div>

 </div>

 </div>
</section>
 </section>
 );
};

export default InvestorLicense;
