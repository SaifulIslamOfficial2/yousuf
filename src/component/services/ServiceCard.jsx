import { Link } from "react-router-dom";
import {
 FaPlane,
 FaPassport,
 FaBriefcase,
 FaBuilding,
 FaFileAlt,
 FaArrowRight,
} from "react-icons/fa";

import image1 from "../../assets/image/investor.webp";
import image2 from "../../assets/image/visaimage.webp";
import image3 from "../../assets/image/Air-Ticket.webp";
import image4 from "../../assets/image/General-Services-scaled.webp";
import image5 from "../../assets/image/Professional-discussion-in-modern-office.webp";

// ICON MAP
const iconMap = {
 FaPlane: <FaPlane />,
 FaPassport: <FaPassport />,
 FaBriefcase: <FaBriefcase />,
 FaBuilding: <FaBuilding />,
 FaFileAlt: <FaFileAlt />,
};

// IMAGE MAP
const imageMap = {
 "Investor License": image1,
 "Visa Services": image2,
 "Air-Ticket": image3,
 "General Services": image4,
 "Business Services": image5,
};

// ROUTE MAP (IMPORTANT)
const routeMap = {
 "Investor License": "/investorlicense",
 "Visa Services": "/visaServices",
 "Air-Ticket": "/airticketmain",
 "General Services": "/general-services",
 "Business Services": "/business-services",
};

const ServiceCard = ({ service }) => {
 return (
 <Link to={routeMap[service.title] || "/"}>
 <div className="bg-white p-2 rounded-md relative group hover:shadow-2xl transition duration-300 border border-gray-100 cursor-pointer">

 {/* IMAGE */}
 <div className="overflow-hidden rounded-xl mb-4">
 <img
 src={imageMap[service.title]}
 alt={service.title}
 className="w-full h-[160px] object-cover group-hover:scale-110 transition duration-500"
 />
 </div>

 {/* TITLE */}
 <h3 className="text-lg font-semibold text-[#0B3B75] group-hover:text-[#1E6FB8] transition">
 {service.title}
 </h3>

 {/* DESC */}
 <p className="text-gray-500 text-sm mt-2">
 {service.desc}
 </p>

 {/* ICON */}
 <div className={`w-12 h-12 flex items-center justify-center rounded-full mt-4 text-xl ${service.color}`}>
 {iconMap[service.icon] || <FaFileAlt />}
 </div>

 {/* BUTTON */}
 <div className="absolute bottom-4 right-4">
 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md group-hover:bg-gradient-to-r group-hover:from-[#0B3B75] group-hover:to-[#1E6FB8] group-hover:text-white transition">
 <FaArrowRight />
 </div>
 </div>

 </div>
 </Link>
 );
};

export default ServiceCard;
