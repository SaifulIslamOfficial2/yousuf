import NavBar from '../navbar/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'
import WhatsAppButton from '../whatsapp/WhatsAppButton'

function MainLayout() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default MainLayout;
