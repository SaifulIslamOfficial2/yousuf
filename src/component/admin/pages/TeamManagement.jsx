import { useEffect, useState } from "react";
import {
  FaPlus,
  FaTrashAlt,
  FaEdit,
  FaTimes,
  FaCheck,
  FaUsers,
} from "react-icons/fa";
import api, { apiError } from "../../../api/client";
import ImageUploadField from "../ImageUploadField";

const emptyForm = {
  name: "",
  position: "",
  bio: "",
  email: "",
  phone: "",
  experience: "",
  order: 0,
  socialLinks: { facebook: "", linkedin: "", twitter: "", whatsapp: "" },
};

export default function TeamManagement() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/team");
      setTeam(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(apiError(e, "টিম লোড ব্যর্থ"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFile(null);
    setShowModal(true);
  };

  const openEdit = (m) => {
    setEditingId(m._id);
    setForm({
      name: m.name || "",
      position: m.position || "",
      bio: m.bio || "",
      email: m.email || "",
      phone: m.phone || "",
      experience: m.experience || "",
      order: m.order || 0,
      socialLinks: {
        facebook: m.socialLinks?.facebook || "",
        linkedin: m.socialLinks?.linkedin || "",
        twitter: m.socialLinks?.twitter || "",
        whatsapp: m.socialLinks?.whatsapp || "",
      },
      image: m.image,
    });
    setFile(null);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.position) {
      alert("নাম এবং পদবি আবশ্যক");
      return;
    }
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("position", form.position);
      fd.append("bio", form.bio || "");
      fd.append("email", form.email || "");
      fd.append("phone", form.phone || "");
      fd.append("experience", form.experience || "");
      fd.append("order", String(form.order || 0));
      fd.append("socialLinks", JSON.stringify(form.socialLinks));
      if (file) fd.append("image", file);

      if (editingId) {
        await api.put(`/api/team/${editingId}`, fd);
      } else {
        await api.post("/api/team", fd);
      }
      await fetchTeam();
      setShowModal(false);
    } catch (e) {
      alert(apiError(e, "সংরক্ষণ ব্যর্থ"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("এই সদস্যকে মুছে ফেলবেন?")) return;
    try {
      await api.delete(`/api/team/${id}`);
      setTeam((t) => t.filter((x) => x._id !== id));
    } catch (e) {
      alert(apiError(e, "মুছে ফেলা ব্যর্থ"));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">টিম ম্যানেজমেন্ট</h1>
          <p className="text-gray-500 text-sm">টিম সদস্য যোগ, সম্পাদনা ও মুছুন</p>
        </div>
        <button
          onClick={openAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus /> নতুন সদস্য যোগ করুন
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto" />
          <p className="text-gray-500 mt-3">লোড হচ্ছে...</p>
        </div>
      ) : team.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <FaUsers className="mx-auto text-5xl text-gray-300 mb-3" />
          <p className="text-gray-600">কোনো টিম সদস্য নেই</p>
          <p className="text-sm text-gray-400 mt-1">
            উপরের বাটন থেকে নতুন সদস্য যোগ করুন
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {team.map((m) => (
            <div
              key={m._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {m.image ? (
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-300">
                  <FaUsers className="text-4xl" />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-bold text-gray-800">{m.name}</h3>
                <p className="text-sm text-blue-600">{m.position}</p>
                {m.experience && (
                  <p className="text-xs text-gray-500 mt-1">
                    অভিজ্ঞতা: {m.experience}
                  </p>
                )}
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => openEdit(m)}
                    className="flex-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 flex items-center justify-center gap-1"
                  >
                    <FaEdit /> সম্পাদনা
                  </button>
                  <button
                    onClick={() => handleDelete(m._id)}
                    className="flex-1 px-3 py-1.5 text-sm bg-rose-50 text-rose-600 rounded hover:bg-rose-100 flex items-center justify-center gap-1"
                  >
                    <FaTrashAlt /> মুছুন
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                {editingId ? "সদস্য সম্পাদনা" : "নতুন সদস্য যোগ"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4">
              <ImageUploadField
                currentUrl={form.image}
                onFileChange={setFile}
                label="প্রোফাইল ছবি"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    নাম <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    পদবি <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.position}
                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ইমেইল
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ফোন
                  </label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    অভিজ্ঞতা
                  </label>
                  <input
                    type="text"
                    value={form.experience}
                    onChange={(e) =>
                      setForm({ ...form, experience: e.target.value })
                    }
                    placeholder="যেমন: ৫ বছর"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ক্রম
                  </label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) =>
                      setForm({ ...form, order: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  সংক্ষিপ্ত পরিচিতি
                </label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  সোশ্যাল লিংক
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {["facebook", "linkedin", "twitter", "whatsapp"].map((s) => (
                    <input
                      key={s}
                      type="text"
                      placeholder={s.charAt(0).toUpperCase() + s.slice(1)}
                      value={form.socialLinks[s]}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          socialLinks: {
                            ...form.socialLinks,
                            [s]: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  বাতিল
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <FaCheck /> {saving ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
