import { useEffect, useState } from "react";
import { FaImages, FaTimes } from "react-icons/fa";
import { useLang } from "../../i18n/LanguageContext";

const BASE = import.meta.env.VITE_BACKEND_URL || "";

export default function GalleryPage() {
  const { t } = useLang();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    fetch(`${BASE}/api/gallery`)
      .then((r) => r.json())
      .then((d) => setItems(Array.isArray(d) ? d : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#f7f9fc] min-h-screen">
      <div className="relative h-[260px] bg-gradient-to-r from-[#0B3B75] to-[#1E6FB8] flex items-center justify-center text-white text-center">
        <div>
          <h1 className="text-4xl font-bold">{t.gallery.pageTitle}</h1>
          <p className="text-sm mt-2 opacity-90">{t.gallery.subtitle}</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B3B75] mx-auto"></div>
            <p className="text-gray-500 mt-4">{t.common.loading}</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <FaImages className="mx-auto text-6xl text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">{t.gallery.noImages}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((it) => (
              <div
                key={it._id}
                onClick={() => setLightbox(it)}
                className="cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all group"
              >
                <img
                  src={it.image}
                  alt={it.title || "gallery"}
                  className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-[100] flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-3xl hover:text-gray-300"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <FaTimes />
          </button>
          <img
            src={lightbox.image}
            alt={lightbox.title || "gallery"}
            className="max-h-[85vh] max-w-[95vw] object-contain rounded-lg"
          />
          {lightbox.title && (
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-lg bg-black/50 px-4 py-2 rounded">
              {lightbox.title}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
