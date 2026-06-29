import { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaWhatsapp, FaUser } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useLang } from "../../i18n/LanguageContext";

const BASE = import.meta.env.VITE_BACKEND_URL || "";

const TeamCarousel = () => {
  const { t } = useLang();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE}/api/team`)
      .then((r) => r.json())
      .then((data) => setMembers(Array.isArray(data) ? data : []))
      .catch(() => setMembers([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-[#f7f9fc]">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0B3B75] mx-auto"></div>
        </div>
      </section>
    );
  }

  if (members.length === 0) return null;

  return (
    <section className="py-20 bg-[#f7f9fc]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <p className="inline-block bg-[#0B3B75] text-white px-4 py-1 rounded-full text-sm">
            {t.team.tag}
          </p>
          <h2 className="text-4xl font-bold mt-4 text-[#0B3B75]">{t.team.title}</h2>
        </div>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={members.length > 4}
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: Math.min(4, members.length) },
          }}
        >
          {members.map((m) => (
            <SwiperSlide key={m._id}>
              <div className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition h-[380px] flex flex-col">
                <div className="flex justify-center mb-5">
                  {m.image ? (
                    <img
                      src={m.image}
                      className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-50"
                      alt={m.name}
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#0B3B75] to-[#1E6FB8] flex items-center justify-center text-white text-2xl font-bold">
                      <FaUser />
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-lg text-[#0B3B75]">{m.name}</h3>
                <p className="text-sm text-blue-500">{m.position}</p>
                {m.bio && (
                  <p className="text-gray-500 text-sm mt-3 leading-relaxed flex-1 line-clamp-3">
                    {m.bio}
                  </p>
                )}
                <div className="border-t my-4"></div>
                <div className="flex justify-center gap-4 text-gray-500">
                  {m.socialLinks?.facebook && (
                    <a href={m.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                      <FaFacebookF className="hover:text-[#0B3B75] cursor-pointer" />
                    </a>
                  )}
                  {m.socialLinks?.linkedin && (
                    <a href={m.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                      <FaLinkedinIn className="hover:text-[#0B3B75] cursor-pointer" />
                    </a>
                  )}
                  {m.socialLinks?.twitter && (
                    <a href={m.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                      <FaTwitter className="hover:text-[#0B3B75] cursor-pointer" />
                    </a>
                  )}
                  {m.socialLinks?.whatsapp && (
                    <a
                      href={`https://wa.me/${m.socialLinks.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaWhatsapp className="hover:text-green-500 cursor-pointer" />
                    </a>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TeamCarousel;
