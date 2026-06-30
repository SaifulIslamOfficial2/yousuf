import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaUser, FaPhone, FaIdCard, FaUpload } from "react-icons/fa";
import logo from "../../assets/image/investorImage/logo_no_bg_v2.webp"
const InvestorForm = () => {
 const [form, setForm] = useState({
 owner_name: "",
 owner_email: "",
 owner_phone: "",
 nominee_name: "",
 nominee_phone: "",
 nominee_relation: "",
 });

 const handleChange = (e) => {
 setForm({ ...form, [e.target.name]: e.target.value });
 };

 const handleSubmit = (e) => {
 e.preventDefault();

 emailjs
 .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form, "YOUR_PUBLIC_KEY")
 .then(() => {
 alert("Application Submitted ");
 })
 .catch(() => {
 alert("Error ");
 });
 };

 return (
 <section className="py-24 bg-gradient-to-br from-[#0B3B75] to-[#1E6FB8]">
 <div className="max-w-5xl mx-auto px-6">

 <div className="bg-white rounded-3xl shadow-2xl p-10">
 <a className="flex items-center justify-center ">
 <img className="h-28 w-auto" src={logo} alt="Logo" />
 </a>
 {/* TOP BANNER */}
 <div className="mb-8 rounded-2xl bg-gradient-to-r from-[#0B3B75] to-[#1E6FB8] text-white p-6 flex items-center gap-4 shadow-lg">
 <FaUpload className="text-3xl" />
 <div>
 <h3 className="text-xl font-semibold">
 Upload Required Documents
 </h3>
 <p className="text-sm opacity-90">
 Please submit all necessary files to complete your application
 </p>
 </div>
 </div>

 {/* TITLE */}
 <div className="text-center mb-10">
 <h2 className="text-3xl font-bold text-[#0B3B75]">
 Investor License Application
 </h2>
 <p className="text-gray-500 mt-2">
 Complete your details to start your Saudi investor license process
 </p>
 </div>

 <form onSubmit={handleSubmit} className="space-y-10">

 {/* OWNER SECTION */}
 <div>
 <h3 className="text-xl font-semibold mb-4 text-[#0B3B75]">
 Owner Information
 </h3>

 <div className="grid md:grid-cols-2 gap-6">

 <div className="relative">
 <FaUser className="absolute top-4 left-3 text-gray-400" />
 <input
 type="text"
 name="owner_name"
 placeholder="Owner Full Name"
 onChange={handleChange}
 className="w-full pl-10 p-3 border rounded-lg"
 required
 />
 </div>

 <div className="relative">
 <FaPhone className="absolute top-4 left-3 text-gray-400" />
 <input
 type="text"
 name="owner_phone"
 placeholder="Owner Phone Number"
 onChange={handleChange}
 className="w-full pl-10 p-3 border rounded-lg"
 required
 />
 </div>

 <div className="relative">
 <FaIdCard className="absolute top-4 left-3 text-gray-400" />
 <input
 type="email"
 name="owner_email"
 placeholder="Owner Email"
 onChange={handleChange}
 className="w-full pl-10 p-3 border rounded-lg"
 required
 />
 </div>

 {/* FILE INPUTS */}
 <div className="relative">
 <label className="text-sm font-medium">Owner Passport Copy</label>
 <div className="flex items-center border rounded-lg mt-1 px-3 py-2">
 <FaUpload className="text-gray-400 mr-2" />
 <input type="file" className="w-full outline-none" required />
 </div>
 </div>

 <div className="relative">
 <label className="text-sm font-medium">Owner Iqama Copy</label>
 <div className="flex items-center border rounded-lg mt-1 px-3 py-2">
 <FaUpload className="text-gray-400 mr-2" />
 <input type="file" className="w-full outline-none" required />
 </div>
 </div>

 </div>
 </div>

 {/* NOMINEE SECTION */}
 <div>
 <h3 className="text-xl font-semibold mb-4 text-[#0B3B75]">
 Nominee Information
 </h3>

 <div className="grid md:grid-cols-2 gap-6">

 <div className="relative">
 <FaUser className="absolute top-4 left-3 text-gray-400" />
 <input
 type="text"
 name="nominee_name"
 placeholder="Nominee Full Name"
 onChange={handleChange}
 className="w-full pl-10 p-3 border rounded-lg"
 required
 />
 </div>

 <div className="relative">
 <FaPhone className="absolute top-4 left-3 text-gray-400" />
 <input
 type="text"
 name="nominee_phone"
 placeholder="Nominee Phone Number"
 onChange={handleChange}
 className="w-full pl-10 p-3 border rounded-lg"
 required
 />
 </div>

 <div className="relative">
 <FaUser className="absolute top-4 left-3 text-gray-400" />
 <input
 type="text"
 name="nominee_relation"
 placeholder="Relation (Wife, Brother, etc)"
 onChange={handleChange}
 className="w-full pl-10 p-3 border rounded-lg"
 />
 </div>

 {/* FILE INPUTS */}
 <div className="relative">
 <label className="text-sm font-medium">Nominee Passport Copy</label>
 <div className="flex items-center border rounded-lg mt-1 px-3 py-2">
 <FaUpload className="text-gray-400 mr-2" />
 <input type="file" className="w-full outline-none" required />
 </div>
 </div>

 <div className="relative">
 <label className="text-sm font-medium">Nominee Iqama Copy</label>
 <div className="flex items-center border rounded-lg mt-1 px-3 py-2">
 <FaUpload className="text-gray-400 mr-2" />
 <input type="file" className="w-full outline-none" required />
 </div>
 </div>

 <div className="md:col-span-2">
 <label className="text-sm font-medium">
 Owner + Nominee Photo
 </label>
 <div className="flex items-center border rounded-lg mt-1 px-3 py-2">
 <FaUpload className="text-gray-400 mr-2" />
 <input type="file" className="w-full outline-none" required />
 </div>
 </div>

 </div>
 </div>

 {/* SUBMIT */}
 <div className="text-center">
 <button className="bg-gradient-to-r from-[#0B3B75] to-[#1E6FB8] text-white px-10 py-3 rounded-full font-semibold hover:scale-105 transition">
 Submit Application</button>
 </div>

 </form>

 </div>
 </div>
 </section>
 );
};

export default InvestorForm;
