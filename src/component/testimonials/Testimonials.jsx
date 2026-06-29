import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import { useLang } from "../../i18n/LanguageContext";

const reviews = [
  { name: "মোঃ রফিকুল ইসলাম", location: "ঢাকা, বাংলাদেশ", rating: 5, text: "Yousuf Consultancy এর মাধ্যমে আমার Saudi Investor License খুব দ্রুত এবং সহজে হয়েছে। সম্পূর্ণ প্রক্রিয়া তারা নিজেরা handle করেছে।", initials: "রফ", color: "bg-blue-500" },
  { name: "আবদুল করিম", location: "চট্টগ্রাম, বাংলাদেশ", rating: 5, text: "Visa processing এ তারা অনেক professional। আমার family visa মাত্র ১০ দিনে হয়ে গেছে। Highly recommended!", initials: "আক", color: "bg-green-500" },
  { name: "Md Jahangir Alam", location: "Sylhet, Bangladesh", rating: 5, text: "Air ticket booking এ সবচেয়ে ভালো দাম পেয়েছি এখানে। They always find the best deals!", initials: "JA", color: "bg-orange-500" },
  { name: "সালমা বেগম", location: "রাজশাহী, বাংলাদেশ", rating: 5, text: "Umrah package নিয়ে গিয়েছিলাম। সব ব্যবস্থা অনেক সুন্দর ছিল। আল্লাহ তাদের কবুল করুক।", initials: "সা", color: "bg-purple-500" },
  { name: "Md Hasanuzzaman", location: "Cumilla, Bangladesh", rating: 5, text: "Company setup এ তারা শুরু থেকে শেষ পর্যন্ত সব করে দিয়েছে। কোনো ঝামেলা ছাড়াই business শুরু করতে পেরেছি।", initials: "HZ", color: "bg-red-500" },
];

const Testimonials = () => {
  const { t } = useLang();
  const tm = t.testimonials;
  return (
    <section className="py-20 bg-[#f7f9fc]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="bg-[#0B3B75] text-white text-sm px-4 py-1 rounded-full">{tm.tag}</span>
          <h2 className="text-3xl font-bold text-[#0B3B75] mt-4">{tm.title}</h2>
          <p className="text-gray-500 mt-3">{tm.subtitle}</p>
        </div>
        <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 3500, disableOnInteraction: false }} loop={true} pagination={{ clickable: true }} spaceBetween={24} slidesPerView={1} breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }} className="pb-10">
          {reviews.map((review, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition h-full border border-gray-100">
                <FaQuoteLeft className="text-[#1E6FB8] text-2xl mb-4 opacity-30" />
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{review.text}</p>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${review.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}>{review.initials}</div>
                  <div>
                    <p className="font-semibold text-[#0B3B75] text-sm">{review.name}</p>
                    <p className="text-gray-400 text-xs">{review.location}</p>
                    <div className="flex gap-1">{[...Array(review.rating)].map((_, j) => <FaStar key={j} className="text-yellow-400 text-xs" />)}</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
export default Testimonials;
