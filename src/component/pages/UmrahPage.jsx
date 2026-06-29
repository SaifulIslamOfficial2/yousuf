import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaKaaba, FaPlane, FaCheckCircle, FaClock, FaArrowRight } from "react-icons/fa";
import { useLang } from "../../i18n/LanguageContext";

const BASE = import.meta.env.VITE_BACKEND_URL || "";

export default function UmrahPage() {
  const { t } = useLang();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE}/api/umrah`)
      .then((r) => r.json())
      .then((d) => setPackages(Array.isArray(d) ? d.filter((p) => p.isActive !== false) : []))
      .catch(() => setPackages([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#f7f9fc] min-h-screen">
      <div className="relative h-[260px] bg-gradient-to-r from-[#0B3B75] to-[#1E6FB8] flex items-center justify-center text-white text-center">
        <div>
          <h1 className="text-4xl font-bold">{t.umrah.tag}</h1>
          <p className="text-sm mt-2 opacity-90">{t.umrah.desc}</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B3B75] mx-auto"></div>
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <FaKaaba className="mx-auto text-6xl text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">{t.common.noData}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
              >
                {p.image ? (
                  <img src={p.image} alt={p.title} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-r from-[#0B3B75] to-[#1E6FB8] flex items-center justify-center text-white">
                    <FaKaaba className="text-5xl opacity-60" />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-[#0B3B75]">{p.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                    {p.duration && (
                      <span className="flex items-center gap-1">
                        <FaClock /> {p.duration}
                      </span>
                    )}
                    {p.flightType && (
                      <span className="flex items-center gap-1">
                        <FaPlane />{" "}
                        {p.flightType === "direct" ? "ডিরেক্ট" : "ট্রানজিট"}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-3 line-clamp-3 flex-1">
                    {p.description}
                  </p>
                  {Array.isArray(p.includes) && p.includes.length > 0 && (
                    <ul className="mt-3 space-y-1 text-sm text-gray-700">
                      {p.includes.slice(0, 4).map((it, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <FaCheckCircle className="text-green-500 text-xs" /> {it}
                        </li>
                      ))}
                    </ul>
                  )}
                  {p.price && (
                    <p className="text-[#1E6FB8] font-bold mt-4 text-lg">
                      ৳ {Number(p.price).toLocaleString("bn-BD")}
                    </p>
                  )}
                  <Link
                    to="/contact"
                    className="mt-4 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0B3B75] to-[#1E6FB8] text-white py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition"
                  >
                    {t.umrah.btn} <FaArrowRight />
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
