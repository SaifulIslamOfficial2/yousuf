import { Link } from "react-router-dom";
import img from "../../assets/image/investor.webp";

const CompanySetup = () => {
 return (
 <>
 {/* BANNER */}
 <div className="relative h-[280px] flex items-center justify-center">
 <img src={img} className="absolute w-full h-full object-cover"/>
 <div className="absolute inset-0 bg-black/60"></div>

 <div className="relative text-white text-center">
 <h1 className="text-4xl font-bold">Company Setup</h1>
 <p className="text-sm">Home / Company Setup</p>
 </div>
 </div>

 {/* CONTENT */}
 <section className="py-20 bg-[#f6f7fb]">
 <div className="container mx-auto px-6">

 <h2 className="text-2xl font-bold mb-4 text-[#0B3B75]">
 Company Setup in Saudi Arabia
 </h2>

 <p className="text-gray-600 mb-6">
 Complete company formation process including investor license, CR registration, and business setup.
 </p>

 <ul className="space-y-2 text-gray-600">
 <li>• Investor License (MISA)</li>
 <li>• Commercial Registration (CR)</li>
 <li>• Bank Account Setup</li>
 <li>• Office Setup</li>
 </ul>

 <div className="mt-10">
 <Link to="/investorForm" className="bg-purple-600 text-white px-8 py-3 rounded-full">
 Start Setup</Link>
 </div>

 </div>
 </section>
 </>
 );
};

export default CompanySetup;
