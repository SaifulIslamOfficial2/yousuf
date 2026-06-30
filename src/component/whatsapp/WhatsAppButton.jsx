// nicher right corner er floating whatsapp button

import { useState } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import { useLang } from "../../i18n/LanguageContext";

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { t } = useLang();
  const w = t.whatsapp;
  const whatsappUrl = `https://wa.me/966571461938?text=${encodeURIComponent(w.defaultMsg)}`;

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3">
      {showTooltip && (
        <div className="bg-white rounded-2xl shadow-2xl p-4 w-72 border border-green-100">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <FaWhatsapp className="text-white text-xl" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">Yousuf Consultancy</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                  {w.status}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <FaTimes />
            </button>
          </div>
          <p className="text-gray-600 text-sm mb-3 leading-relaxed">{w.desc}</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl font-semibold text-sm transition"
          >
            {w.btn}
          </a>
        </div>
      )}
      <button
        onClick={() => setShowTooltip(!showTooltip)}
        className="w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 relative"
        aria-label="WhatsApp"
      >
        <span className="absolute w-16 h-16 rounded-full bg-green-400 animate-ping opacity-40"></span>
        <FaWhatsapp className="text-white text-3xl relative z-10" />
      </button>
    </div>
  );
};

export default WhatsAppButton;
