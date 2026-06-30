import ServiceCarousel from "../services/ServiceCarousel";
import AirTicket from "./AirTicket";
import AirTicketBanner from "./AirTicketBanner";

const AirTicketMain = () => {
 return (
 <div className="bg-[#f7f9fc]">

 {/* TOP BANNER */}
 <AirTicketBanner />

 {/* STEPS SECTION */}
 <AirTicket />

 {/* OPTIONAL SERVICE SLIDER */}
 

 </div>
 );
};

export default AirTicketMain;
