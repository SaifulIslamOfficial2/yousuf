import { NavLink } from "react-router-dom";
import bimanTicket from "../../assets/image/2230596-biman-2310566.webp";
import pasportgirl from "../../assets/image/ChatGPT-Image-Apr-7-2026-02-56-42-PM.webp";
import img3 from "../../assets/image/hero-image-investor-license.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useLang } from "../../i18n/LanguageContext";

const images = [img3, pasportgirl, bimanTicket];

const Hero = () => {
  const { t } = useLang();
  return (
    <Swiper modules={[Pagination, Autoplay]} autoplay={{ delay: 3500 }} loop={true} pagination={{ clickable: true }}>
      {t.hero.slides.map((slide, i) => (
        <SwiperSlide key={i}>
          <div className="relative py-16 md:py-24 bg-[#f7f9fc]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
                  <p className="text-2xl mb-2 font-bold bg-gradient-to-r from-[#0B3B75] to-[#1E6FB8] bg-clip-text text-transparent">{slide.subtitle}</p>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B3B75] leading-tight mb-4">
                    {slide.title}<br />
                    <span className="bg-gradient-to-r from-[#16166b] to-[#3A33B8] bg-clip-text text-transparent">{slide.highlight}</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:text-lg">{slide.desc}</p>
                  <div className="mt-8 flex justify-center lg:justify-start gap-4">
                    <NavLink to="/investorlicense" className="px-6 py-3 rounded-md text-white bg-gradient-to-r from-[#0B3B75] to-[#1E6FB8] hover:opacity-90 transition">{slide.btn1}</NavLink>
                    <NavLink to="/contact" className="px-6 py-3 rounded-md text-white font-semibold bg-gradient-to-r from-[#16166b] to-[#1105f3] hover:opacity-90 transition">{slide.btn2}</NavLink>
                  </div>
                </div>
                <div className="mt-12 lg:mt-0 lg:col-span-6 flex justify-center lg:justify-end">
                  <img className="w-full max-w-sm lg:max-w-none h-auto object-cover rounded-xl shadow-xl" src={images[i]} alt="hero" />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default Hero;
