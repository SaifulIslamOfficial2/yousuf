import { useEffect, useState } from "react";
import {
  FaPlus,
  FaTrashAlt,
  FaEdit,
  FaTimes,
  FaCheck,
  FaNewspaper,
} from "react-icons/fa";
import api, { apiError } from "../../../api/client";
import ImageUploadField from "../ImageUploadField";

const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  author: "",
  category: "সাধারণ",
  isPublished: false,
};

const formatDate = (d) =>
  new Date(d).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function BlogManagement() {
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
      const { data } = await api.get("/api/blog?all=true");
      setList(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(apiError(e, "ব্লগ লোড ব্যর্থ"));
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

  const openEdit = (b) => {
    setEditingId(b._id);
    setForm({
      title: b.title || "",
      excerpt: b.excerpt || "",
      content: b.content || "",
      author: b.author || "",
      category: b.category || "সাধারণ",
      isPublished: !!b.isPublished,
      image: b.image,
    });
    setFile(null);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.content) {
      alert("শিরোনাম এবং কন্টেন্ট আবশ্যক");
      return;
    }
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("excerpt", form.excerpt || "");
      fd.append("content", form.content);
      fd.append("author", form.author || "");
      fd.append("category", form.category || "সাধারণ");
      fd.append("isPublished", String(form.isPublished));
      if (file) fd.append("image", file);

      if (editingId) await api.put(`/api/blog/${editingId}`, fd);
      else await api.post("/api/blog", fd);

      await fetchList();
      setShowModal(false);
    } catch (e) {
      alert(apiError(e, "সংরক্ষণ ব্যর্থ"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("এই ব্লগ পোস্ট মুছে ফেলবেন?")) return;
    try {
      await api.delete(`/api/blog/${id}`);
      setList((l) => l.filter((x) => x._id !== id));
    } catch (e) {
      alert(apiError(e, "মুছে ফেলা ব্যর্থ"));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">ব্লগ ম্যানেজমেন্ট</h1>
          <p className="text-gray-500 text-sm">ব্লগ পোস্ট তৈরি, সম্পাদনা ও প্রকাশ</p>
        </div>
        <button
          onClick={openAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus /> নতুন পোস্ট
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
          <FaNewspaper className="mx-auto text-5xl text-gray-300 mb-3" />
          <p className="text-gray-600">কোনো পোস্ট নেই</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((b) => (
            <div
              key={b._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {b.image ? (
                <img src={b.image} alt={b.title} className="w-full h-44 object-cover" />
              ) : (
                <div className="w-full h-44 bg-gray-100 flex items-center justify-center text-gray-300">
                  <FaNewspaper className="text-4xl" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                    {b.category}
                  </span>
                  {b.isPublished ? (
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">
                      প্রকাশিত
                    </span>
                  ) : (
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                      খসড়া
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-gray-800 line-clamp-2">{b.title}</h3>
                {b.excerpt && (
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {b.excerpt}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-2">
                  {formatDate(b.createdAt)}
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => openEdit(b)}
                    className="flex-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 flex items-center justify-center gap-1"
                  >
                    <FaEdit /> সম্পাদনা
                  </button>
                  <button
                    onClick={() => handleDelete(b._id)}
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
                {editingId ? "পোস্ট সম্পাদনা" : "নতুন পোস্ট"}
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
                label="ফিচার্ড ছবি"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  শিরোনাম <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    লেখক
                  </label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  সারসংক্ষেপ
                </label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) =>
                    setForm({ ...form, excerpt: e.target.value })
                  }
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  পূর্ণ কন্টেন্ট <span className="text-rose-500">*</span>
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  rows="10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  সাধারণ টেক্সট, লাইনব্রেক সংরক্ষিত হবে
                </p>
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) =>
                    setForm({ ...form, isPublished: e.target.checked })
                  }
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                ওয়েবসাইটে প্রকাশ করুন
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
