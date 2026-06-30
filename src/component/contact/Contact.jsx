import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import contactbanner from "../../assets/image/madinah.webp";
import officePic from "../../assets/image/madina-head-office.webp";
import { useLang } from "../../i18n/LanguageContext";

const contactData = {
 MADINAH: {
 name: { en: "Madinah", bn: "মদিনা" },
 sub: { en: "Main Branch", bn: "প্রধান শাখা" },
 phone: "+966 57 146 1938", email: "yousufconsultancy46@gmail.com",
 location: { en: "Madinah, Saudi Arabia", bn: "মদিনা, সৌদি আরব" },
 hours: [
 { en: "Friday: 2 PM - 2 AM", bn: "শুক্রবার: বিকাল ২টা - রাত ২টা" },
 { en: "Sat – Thu: 2 PM - 2 AM", bn: "শনি – বৃহস্পতি: বিকাল ২টা - রাত ২টা" },
 ],
 mapSrc: "https://maps.google.com/maps?q=Madinah%20Saudi%20Arabia&t=&z=13&ie=UTF8&iwloc=&output=embed",
 },
 JEDDAH: {
 name: { en: "Jeddah", bn: "জেদ্দা" },
 sub: { en: "Saudi Arabia", bn: "সৌদি আরব" },
 phone: "+966 50 983 2826", email: "yousufconsultancy46@gmail.com",
 location: { en: "Jeddah, Saudi Arabia", bn: "জেদ্দা, সৌদি আরব" },
 hours: [
 { en: "Friday: 2 PM - 2 AM", bn: "শুক্রবার: বিকাল ২টা - রাত ২টা" },
 { en: "Sat – Thu: 2 PM - 2 AM", bn: "শনি – বৃহস্পতি: বিকাল ২টা - রাত ২টা" },
 ],
 mapSrc: "https://maps.google.com/maps?q=Jeddah%20Saudi%20Arabia&t=&z=13&ie=UTF8&iwloc=&output=embed",
 },
 DHAKA: {
 name: { en: "Dhaka", bn: "ঢাকা" },
 sub: { en: "Bangladesh", bn: "বাংলাদেশ" },
 phone: "+88 01636050945", email: "dhaka@yousufconsultancy.com",
 location: { en: "Dhaka, Bangladesh", bn: "ঢাকা, বাংলাদেশ" },
 hours: [
 { en: "Sat – Thu: 10 AM - 8 PM", bn: "শনি – বৃহস্পতি: সকাল ১০টা - রাত ৮টা" },
 { en: "Friday: Closed", bn: "শুক্রবার: বন্ধ" },
 ],
 mapSrc: "https://maps.google.com/maps?q=Dhaka%20Bangladesh&t=&z=13&ie=UTF8&iwloc=&output=embed",
 },
};

const Contact = () => {
 const [active, setActive] = useState("MADINAH");
 const { t, lang } = useLang();
 const cp = t.contactPage;
 const data = contactData[active];

 return (
 <div className="bg-[#f7f9f8]">
 <div className="h-[260px] relative flex items-center justify-center text-white text-center rounded-b-3xl overflow-hidden"
 style={{ backgroundImage: `url(${contactbanner})`, backgroundSize: "cover", backgroundPosition: "center" }}>
 <div className="absolute inset-0 bg-gradient-to-r from-[#0B3B75]/60 to-[#1E6FB8]/60"></div>
 <div className="relative z-10">
 <h1 className="text-4xl font-bold">{cp.title}</h1>
 <p className="text-sm mt-2">{data.name[lang]} ({data.sub[lang]})</p>
 </div>
 </div>

 <div className="text-center py-12">
 <p className="text-[#1E6FB8] text-sm font-semibold">{cp.infoTag}</p>
 <h2 className="text-4xl font-bold text-[#0B3B75]">{cp.infoTitle}</h2>
 </div>

 <div className="flex justify-center gap-4 flex-wrap mb-10">
 {Object.keys(contactData).map((key) => (
 <button key={key} onClick={() => setActive(key)}
 className={`px-6 py-3 rounded-xl border transition flex flex-col items-center ${active === key ? "text-white bg-gradient-to-r from-[#0B3B75] to-[#1E6FB8]" : "border-[#1E6FB8] text-[#0B3B75]"}`}>
 <span className="font-semibold">{contactData[key].name[lang]}</span>
 <p className="text-xs opacity-80">{contactData[key].sub[lang]}</p>
 </button>
 ))}
 </div>

 <div className="max-w-7xl mx-auto px-6 pb-16">
 <div className="bg-white rounded-2xl shadow-md p-6 grid md:grid-cols-3 gap-6 items-center">
 <div className="space-y-4">
 <div className="flex gap-3 items-center"><FaPhoneAlt className="text-[#1E6FB8]" /><div><p className="text-sm text-gray-400">{cp.call}</p><p className="font-semibold">{data.phone}</p></div></div>
 <div className="flex gap-3 items-center"><FaEnvelope className="text-[#1E6FB8]" /><div><p className="text-sm text-gray-400">{cp.emailLabel}</p><p className="font-semibold">{data.email}</p></div></div>
 <div className="flex gap-3 items-center"><FaMapMarkerAlt className="text-[#1E6FB8]" /><div><p className="text-sm text-gray-400">{cp.locationLabel}</p><p className="font-semibold">{data.location[lang]}</p></div></div>
 </div>
 <div className="border-l pl-5">
 {data.hours.map((h, i) => <p key={i} className="text-sm text-gray-600 mb-2">{h[lang]}</p>)}
 </div>
 <div><img src={officePic} alt="office" className="rounded-xl w-full h-[180px] object-cover" /></div>
 </div>
 </div>

 <div className="max-w-7xl mx-auto px-6 pb-20">
 <iframe className="w-full h-[400px] rounded-2xl" src={data.mapSrc} title="map" loading="lazy"></iframe>
 </div>
 </div>
 );
};
export default Contact;
