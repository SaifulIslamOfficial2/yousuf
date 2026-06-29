import { useEffect, useState } from "react";
import {
  FaPlus,
  FaTrashAlt,
  FaEdit,
  FaTimes,
  FaCheck,
  FaKaaba,
  FaPlane,
  FaMinusCircle,
} from "react-icons/fa";
import api, { apiError } from "../../../api/client";
import ImageUploadField from "../ImageUploadField";

const emptyForm = {
  title: "",
  duration: "",
  price: "",
  description: "",
  flightType: "direct",
  includes: [],
  isActive: true,
};

export default function UmrahManagement() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [includeInput, setIncludeInput] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchList = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/umrah");
      setList(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(apiError(e, "প্যাকেজ লোড ব্যর্থ"));
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
    setIncludeInput("");
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditingId(p._id);
    setForm({
      title: p.title || "",
      duration: p.duration || "",
      price: p.price || "",
      description: p.description || "",
      flightType: p.flightType || "direct",
      includes: p.includes || [],
      isActive: p.isActive !== false,
      image: p.image,
    });
    setFile(null);
    setIncludeInput("");
    setShowModal(true);
  };

  const addInclude = () => {
    if (!includeInput.trim()) return;
    setForm((f) => ({ ...f, includes: [...f.includes, includeInput.trim()] }));
    setIncludeInput("");
  };

  const removeInclude = (i) =>
    setForm((f) => ({ ...f, includes: f.includes.filter((_, idx) => idx !== i) }));

  const handleSave = async () => {
    if (!form.title) {
      alert("শিরোনাম আবশ্যক");
      return;
    }
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("duration", form.duration || "");
      fd.append("price", String(form.price || 0));
      fd.append("description", form.description || "");
      fd.append("flightType", form.flightType);
      fd.append("includes", JSON.stringify(form.includes));
      fd.append("isActive", String(form.isActive));
      if (file) fd.append("image", file);

      if (editingId) await api.put(`/api/umrah/${editingId}`, fd);
      else await api.post("/api/umrah", fd);

      await fetchList();
      setShowModal(false);
    } catch (e) {
      alert(apiError(e, "সংরক্ষণ ব্যর্থ"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("এই প্যাকেজ মুছে ফেলবেন?")) return;
    try {
      await api.delete(`/api/umrah/${id}`);
      setList((l) => l.filter((x) => x._id !== id));
    } catch (e) {
      alert(apiError(e, "মুছে ফেলা ব্যর্থ"));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">ওমরাহ প্যাকেজ</h1>
          <p className="text-gray-500 text-sm">প্যাকেজ যোগ, সম্পাদনা ও মুছুন</p>
        </div>
        <button
          onClick={openAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus /> নতুন প্যাকেজ যোগ করুন
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
          <FaKaaba className="mx-auto text-5xl text-gray-300 mb-3" />
          <p className="text-gray-600">কোনো প্যাকেজ নেই</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {p.image ? (
                <img src={p.image} alt={p.title} className="w-full h-44 object-cover" />
              ) : (
                <div className="w-full h-44 bg-gray-100 flex items-center justify-center text-gray-300">
                  <FaKaaba className="text-4xl" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-gray-800">{p.title}</h3>
                  {!p.isActive && (
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                      নিষ্ক্রিয়
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-600">
                  {p.duration && (
                    <span className="bg-gray-100 px-2 py-0.5 rounded">{p.duration}</span>
                  )}
                  <span className="bg-gray-100 px-2 py-0.5 rounded flex items-center gap-1">
                    <FaPlane className="text-[10px]" />
                    {p.flightType === "direct" ? "সরাসরি" : "ট্রান্সিট"}
                  </span>
                  {p.price > 0 && (
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-semibold">
                      ৳ {p.price.toLocaleString("bn-BD")}
                    </span>
                  )}
                </div>
                {p.description && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{p.description}</p>
                )}
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => openEdit(p)}
                    className="flex-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 flex items-center justify-center gap-1"
                  >
                    <FaEdit /> সম্পাদনা
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
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
                {editingId ? "প্যাকেজ সম্পাদনা" : "নতুন প্যাকেজ যোগ"}
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
                label="প্যাকেজ ছবি"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    প্যাকেজ শিরোনাম <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    সময়কাল
                  </label>
                  <input
                    type="text"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    placeholder="যেমন: ১৪ দিন"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    মূল্য (টাকা)
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ফ্লাইটের ধরন
                  </label>
                  <select
                    value={form.flightType}
                    onChange={(e) =>
                      setForm({ ...form, flightType: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="direct">সরাসরি</option>
                    <option value="transit">ট্রান্সিট</option>
                  </select>
                </div>
                <div className="flex items-center pt-7">
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
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  বিস্তারিত বিবরণ
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  প্যাকেজে যা যা অন্তর্ভুক্ত
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={includeInput}
                    onChange={(e) => setIncludeInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addInclude())
                    }
                    placeholder="আইটেম লিখুন..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={addInclude}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-1"
                  >
                    <FaPlus /> যোগ
                  </button>
                </div>
                {form.includes.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {form.includes.map((it, i) => (
                      <span
                        key={i}
                        className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded flex items-center gap-2"
                      >
                        {it}
                        <button
                          type="button"
                          onClick={() => removeInclude(i)}
                          className="text-rose-500"
                        >
                          <FaMinusCircle />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
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
