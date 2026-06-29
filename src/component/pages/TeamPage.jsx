import { useEffect, useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaWhatsapp, FaUser } from "react-icons/fa";
import { useLang } from "../../i18n/LanguageContext";

const BASE = import.meta.env.VITE_BACKEND_URL || "";

export default function TeamPage() {
  const { t } = useLang();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE}/api/team`)
      .then((r) => r.json())
      .then((d) => setTeam(Array.isArray(d) ? d : []))
      .catch(() => setTeam([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#f7f9fc] min-h-screen">
      <div className="relative h-[260px] bg-gradient-to-r from-[#0B3B75] to-[#1E6FB8] flex items-center justify-center text-white text-center">
        <div>
          <h1 className="text-4xl font-bold">{t.team.pageTitle}</h1>
          <p className="text-sm mt-2 opacity-90">{t.team.subtitle}</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B3B75] mx-auto"></div>
            <p className="text-gray-500 mt-4">{t.common.loading}</p>
          </div>
        ) : team.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <FaUser className="mx-auto text-6xl text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">{t.team.noMembers}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {team.map((m) => (
              <div
                key={m._id}
                className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition"
              >
                <div className="flex justify-center mb-4">
                  {m.image ? (
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-28 h-28 rounded-full object-cover ring-4 ring-blue-50"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-gradient-to-r from-[#0B3B75] to-[#1E6FB8] flex items-center justify-center text-white text-3xl">
                      <FaUser />
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-lg text-[#0B3B75]">{m.name}</h3>
                <p className="text-sm text-blue-500 mb-2">{m.position}</p>
                {m.experience && (
                  <p className="text-xs text-gray-500">
                    {m.experience} {t.team.experience}
                  </p>
                )}
                {m.bio && (
                  <p className="text-gray-600 text-sm mt-3 leading-relaxed line-clamp-3">
                    {m.bio}
                  </p>
                )}
                <div className="flex justify-center gap-3 mt-4 text-gray-500">
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
