import { useEffect, useState, useRef } from "react";
import {
  FaPlus,
  FaTrashAlt,
  FaTimes,
  FaImages,
  FaUpload,
  FaCheck,
} from "react-icons/fa";
import api, { apiError } from "../../../api/client";

export default function GalleryManagement() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("অফিস");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const fetchList = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/gallery");
      setList(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(apiError(e, "গ্যালারি লোড ব্যর্থ"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleFiles = (e) => {
    const list = Array.from(e.target.files || []);
    const filtered = list.filter((f) => {
      if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(f.type)) {
        return false;
      }
      if (f.size > 8 * 1024 * 1024) return false;
      return true;
    });
    setFiles(filtered);
  };

  const openModal = () => {
    setFiles([]);
    setTitle("");
    setDescription("");
    setCategory("অফিস");
    setShowModal(true);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("কমপক্ষে একটি ছবি নির্বাচন করুন");
      return;
    }
    setUploading(true);
    setProgress({ done: 0, total: files.length });
    try {
      for (let i = 0; i < files.length; i++) {
        const fd = new FormData();
        fd.append("title", title);
        fd.append("description", description);
        fd.append("category", category);
        fd.append("image", files[i]);
        await api.post("/api/gallery", fd);
        setProgress({ done: i + 1, total: files.length });
      }
      await fetchList();
      setShowModal(false);
    } catch (e) {
      alert(apiError(e, "আপলোড ব্যর্থ"));
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("এই ছবি মুছে ফেলবেন?")) return;
    try {
      await api.delete(`/api/gallery/${id}`);
      setList((l) => l.filter((x) => x._id !== id));
    } catch (e) {
      alert(apiError(e, "মুছে ফেলা ব্যর্থ"));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">গ্যালারি ম্যানেজমেন্ট</h1>
          <p className="text-gray-500 text-sm">গ্যালারিতে ছবি যোগ ও মুছুন</p>
        </div>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus /> ছবি যোগ করুন
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
          <FaImages className="mx-auto text-5xl text-gray-300 mb-3" />
          <p className="text-gray-600">গ্যালারিতে কোনো ছবি নেই</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {list.map((g) => (
            <div
              key={g._id}
              className="relative group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setPreview(g)}
                className="block w-full"
              >
                <img
                  src={g.image}
                  alt={g.title}
                  className="w-full h-40 object-cover"
                />
              </button>
              <div className="p-3">
                <p className="text-xs bg-gray-100 text-gray-600 inline-block px-2 py-0.5 rounded">
                  {g.category}
                </p>
                {g.title && (
                  <p className="text-sm font-medium text-gray-800 mt-1 line-clamp-1">
                    {g.title}
                  </p>
                )}
              </div>
              <button
                onClick={() => handleDelete(g._id)}
                className="absolute top-2 right-2 p-2 bg-rose-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                title="মুছুন"
              >
                <FaTrashAlt />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">নতুন ছবি যোগ করুন</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="file"
                ref={inputRef}
                accept="image/*"
                multiple
                onChange={handleFiles}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 transition"
              >
                <FaUpload className="text-3xl mb-2" />
                <span className="text-sm">ছবি নির্বাচন করতে ক্লিক করুন</span>
                <span className="text-xs text-gray-400 mt-1">
                  একসাথে একাধিক ছবি নির্বাচন করা যাবে
                </span>
              </button>

              {files.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    নির্বাচিত: {files.length} টি ছবি
                  </p>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    {files.map((f, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-100 px-2 py-1 rounded"
                      >
                        {f.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  শিরোনাম (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  বিভাগ
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  বিবরণ (ঐচ্ছিক)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {uploading && (
                <div className="bg-blue-50 text-blue-700 text-sm px-3 py-2 rounded">
                  আপলোড হচ্ছে: {progress.done} / {progress.total}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  বাতিল
                </button>
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <FaCheck /> {uploading ? "আপলোড হচ্ছে..." : "আপলোড"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview modal */}
      {preview && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setPreview(null)}
        >
          <button
            onClick={() => setPreview(null)}
            className="absolute top-4 right-4 p-3 bg-white/10 text-white rounded-full hover:bg-white/20"
          >
            <FaTimes />
          </button>
          <img
            src={preview.image}
            alt={preview.title}
            className="max-w-full max-h-[90vh] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
