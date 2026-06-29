import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaUser, FaArrowRight, FaNewspaper } from "react-icons/fa";
import { useLang } from "../../i18n/LanguageContext";

const BASE = import.meta.env.VITE_BACKEND_URL || "";

const formatDate = (d, lang = "bn") => {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString(lang === "bn" ? "bn-BD" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return new Date(d).toLocaleDateString();
  }
};

export default function BlogPage() {
  const { t, lang } = useLang();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE}/api/blog`)
      .then((r) => r.json())
      .then((d) => setPosts(Array.isArray(d) ? d : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#f7f9fc] min-h-screen">
      <div className="relative h-[260px] bg-gradient-to-r from-[#0B3B75] to-[#1E6FB8] flex items-center justify-center text-white text-center">
        <div>
          <h1 className="text-4xl font-bold">{t.blog.pageTitle}</h1>
          <p className="text-sm mt-2 opacity-90">{t.blog.subtitle}</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B3B75] mx-auto"></div>
            <p className="text-gray-500 mt-4">{t.common.loading}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <FaNewspaper className="mx-auto text-6xl text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">{t.blog.noPosts}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((p) => (
              <article
                key={p._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
              >
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-r from-[#0B3B75] to-[#1E6FB8] flex items-center justify-center text-white">
                    <FaNewspaper className="text-5xl opacity-50" />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt /> {formatDate(p.createdAt, lang)}
                    </span>
                    {p.author && (
                      <span className="flex items-center gap-1">
                        <FaUser /> {p.author}
                      </span>
                    )}
                  </div>
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full w-fit mb-2">
                    {p.category}
                  </span>
                  <h3 className="text-lg font-semibold text-[#0B3B75] mb-2 line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 flex-1">
                    {p.excerpt || (p.content || "").slice(0, 140)}
                  </p>
                  <Link
                    to={`/blog/${p._id}`}
                    className="mt-4 inline-flex items-center gap-2 text-[#1E6FB8] font-semibold text-sm hover:gap-3 transition-all"
                  >
                    {t.blog.readMore} <FaArrowRight />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
