import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  FaPaperPlane, FaUser, FaEnvelope, FaPhone,
  FaCommentDots, FaCheckCircle, FaExclamationCircle,
} from "react-icons/fa";
import { useLang } from "../../i18n/LanguageContext";

const BASE = import.meta.env.VITE_BACKEND_URL || "";

const EMAILJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const ContactForm = () => {
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service: "", message: "",
  });
  const { t } = useLang();
  const cf = t.contactForm;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(`${BASE}/api/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("backend failed");

      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          from_name:  formData.name,
          from_email: formData.email,
          phone:      formData.phone || "N/A",
          service:    formData.service || "N/A",
          message:    formData.message,
          reply_to:   formData.email,
        },
        EMAILJS_KEY
      );

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("Form submit error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-10">
          <span className="bg-[#0B3B75] text-white text-sm px-4 py-1 rounded-full">
            {cf.tag}
          </span>
          <h2 className="text-3xl font-bold text-[#0B3B75] mt-4">{cf.title}</h2>
          <p className="text-gray-500 mt-2">{cf.subtitle}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder={cf.namePlaceholder}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E6FB8] text-sm"
              />
            </div>
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={cf.phonePlaceholder}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E6FB8] text-sm"
              />
            </div>
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder={cf.emailPlaceholder}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E6FB8] text-sm"
            />
          </div>

          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E6FB8] text-sm text-gray-600"
          >
            <option value="">{cf.selectService}</option>
            {cf.services.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>

          <div className="relative">
            <FaCommentDots className="absolute left-3 top-4 text-gray-400" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder={cf.messagePlaceholder}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E6FB8] text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3.5 bg-gradient-to-r from-[#0B3B75] to-[#1E6FB8] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-60"
          >
            {status === "loading" ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                {cf.sending}
              </>
            ) : (
              <><FaPaperPlane /> {cf.submitBtn}</>
            )}
          </button>

          {status === "success" && (
            <div className="flex items-center justify-center gap-2 py-3 bg-green-50 text-green-700 rounded-xl font-medium">
              <FaCheckCircle /> {cf.successMsg}
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 rounded-xl font-medium">
              <FaExclamationCircle /> {cf.errorMsg}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
