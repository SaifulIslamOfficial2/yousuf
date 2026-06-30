import Features from '../../component/features/Features'
import Hero from '../../component/hero/Hero'
import TeamCarousel from '../../component/ourTeam/TeamCarousel'
import MainService from '../../component/services/MainService'
import UmrahBanner from '../../component/umrah/UmrahBanner'
import VisaTicket from '../../component/visa/VisaTicket'
import StatsSection from '../../component/stats/StatsSection'
import Testimonials from '../../component/testimonials/Testimonials'
import ContactForm from '../../component/contactForm/ContactForm'

function Home() {
  return (
    <div>
      <Hero />
      <StatsSection />
      <UmrahBanner />
      <MainService />
      <VisaTicket />
      <Features />
      <Testimonials />
      <TeamCarousel />
      <ContactForm />
    </div>
  );
}

export default Home;
