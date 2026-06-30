import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBriefcase, FaArrowRight } from "react-icons/fa";
import { useLang } from "../../i18n/LanguageContext";

const BASE = import.meta.env.VITE_BACKEND_URL || "";

export default function ServicesPage() {
  const { t } = useLang();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE}/api/services`)
      .then((r) => r.json())
      .then((d) =>
        setServices(Array.isArray(d) ? d.filter((s) => s.isActive !== false) : [])
      )
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#f7f9fc] min-h-screen">
      <div className="relative h-[260px] bg-gradient-to-r from-[#0B3B75] to-[#1E6FB8] flex items-center justify-center text-white text-center">
        <div>
          <h1 className="text-4xl font-bold">{t.services.title}</h1>
          <p className="text-sm mt-2 opacity-90">{t.services.subtitle}</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B3B75] mx-auto"></div>
            <p className="text-gray-500 mt-4">{t.common.loading}</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <FaBriefcase className="mx-auto text-6xl text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">{t.services.noServices}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s) => (
              <div
                key={s._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
              >
                {s.image ? (
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-r from-[#0B3B75] to-[#1E6FB8] flex items-center justify-center text-white">
                    <FaBriefcase className="text-5xl opacity-60" />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full w-fit">
                    {s.category}
                  </span>
                  <h3 className="text-lg font-semibold text-[#0B3B75] mt-3">
                    {s.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mt-2 flex-1">
                    {s.shortDescription || s.description}
                  </p>
                  {s.price && (
                    <p className="text-[#1E6FB8] font-bold mt-3">৳ {s.price}</p>
                  )}
                  <Link
                    to="/contact"
                    className="mt-4 inline-flex items-center gap-2 text-[#1E6FB8] font-semibold text-sm hover:gap-3 transition-all"
                  >
                    {t.services.learnMore} <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
