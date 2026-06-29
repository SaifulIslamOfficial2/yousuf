import { useEffect, useState } from "react";
import {
  FaPlus,
  FaTrashAlt,
  FaEdit,
  FaTimes,
  FaCheck,
  FaBriefcase,
} from "react-icons/fa";
import api, { apiError } from "../../../api/client";
import ImageUploadField from "../ImageUploadField";

const emptyForm = {
  name: "",
  description: "",
  shortDescription: "",
  price: "",
  category: "সাধারণ",
  isActive: true,
};

export default function ServicesManagement() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchList = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/services");
      setList(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(apiError(e, "সার্ভিস লোড ব্যর্থ"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFile(null);
    setShowModal(true);
  };

  const openEdit = (s) => {
    setEditingId(s._id);
    setForm({
      name: s.name || "",
      description: s.description || "",
      shortDescription: s.shortDescription || "",
      price: s.price || "",
      category: s.category || "সাধারণ",
      isActive: s.isActive !== false,
      image: s.image,
    });
    setFile(null);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.description) {
      alert("নাম এবং বিবরণ আবশ্যক");
      return;
    }
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("description", form.description);
      fd.append("shortDescription", form.shortDescription || "");
      fd.append("price", String(form.price || 0));
      fd.append("category", form.category || "সাধারণ");
      fd.append("isActive", String(form.isActive));
      if (file) fd.append("image", file);

      if (editingId) await api.put(`/api/services/${editingId}`, fd);
      else await api.post("/api/services", fd);

      await fetchList();
      setShowModal(false);
    } catch (e) {
      alert(apiError(e, "সংরক্ষণ ব্যর্থ"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("এই সার্ভিস মুছে ফেলবেন?")) return;
    try {
      await api.delete(`/api/services/${id}`);
      setList((l) => l.filter((x) => x._id !== id));
    } catch (e) {
      alert(apiError(e, "মুছে ফেলা ব্যর্থ"));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">সার্ভিস ম্যানেজমেন্ট</h1>
          <p className="text-gray-500 text-sm">সার্ভিস যোগ, সম্পাদনা ও মুছুন</p>
        </div>
        <button
          onClick={openAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus /> নতুন সার্ভিস যোগ করুন
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
      ) : list.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <FaBriefcase className="mx-auto text-5xl text-gray-300 mb-3" />
          <p className="text-gray-600">কোনো সার্ভিস নেই</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((s) => (
            <div
              key={s._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {s.image ? (
                <img src={s.image} alt={s.name} className="w-full h-44 object-cover" />
              ) : (
                <div className="w-full h-44 bg-gray-100 flex items-center justify-center text-gray-300">
                  <FaBriefcase className="text-4xl" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">
                    {s.category}
                  </span>
                  {!s.isActive && (
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                      নিষ্ক্রিয়
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-gray-800">{s.name}</h3>
                {s.shortDescription && (
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {s.shortDescription}
                  </p>
                )}
                {s.price > 0 && (
                  <p className="text-sm text-emerald-700 font-semibold mt-2">
                    ৳ {s.price.toLocaleString("bn-BD")}
                  </p>
                )}
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => openEdit(s)}
                    className="flex-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 flex items-center justify-center gap-1"
                  >
                    <FaEdit /> সম্পাদনা
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
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
                {editingId ? "সার্ভিস সম্পাদনা" : "নতুন সার্ভিস"}
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
                label="সার্ভিস ছবি"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    সার্ভিসের নাম <span className="text-rose-500">*</span>
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
                    বিভাগ
                  </label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    মূল্য (ঐচ্ছিক)
                  </label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  সংক্ষিপ্ত বিবরণ
                </label>
                <textarea
                  value={form.shortDescription}
                  onChange={(e) =>
                    setForm({ ...form, shortDescription: e.target.value })
                  }
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  পূর্ণ বিবরণ <span className="text-rose-500">*</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm({ ...form, isActive: e.target.checked })
                  }
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                সক্রিয় (ওয়েবসাইটে দেখাবে)
              </label>

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
