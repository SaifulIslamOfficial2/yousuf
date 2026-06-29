import { useEffect, useState } from "react";
import {
  FaSearch,
  FaTrashAlt,
  FaEdit,
  FaTimes,
  FaCheck,
  FaUserCircle,
} from "react-icons/fa";
import api, { apiError } from "../../../api/client";

const STATUS_OPTIONS = [
  { value: "pending", label: "অপেক্ষমাণ", color: "bg-amber-100 text-amber-700" },
  { value: "in_progress", label: "প্রক্রিয়াধীন", color: "bg-blue-100 text-blue-700" },
  { value: "approved", label: "অনুমোদিত", color: "bg-emerald-100 text-emerald-700" },
  { value: "rejected", label: "প্রত্যাখ্যাত", color: "bg-rose-100 text-rose-700" },
];

const getStatusMeta = (s) =>
  STATUS_OPTIONS.find((x) => x.value === s) || STATUS_OPTIONS[0];

const formatDate = (d) =>
  new Date(d).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function ApplicationsList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState(null);

  const fetchList = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/applications");
      setList(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(apiError(e, "আবেদন লোড ব্যর্থ"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("এই আবেদন মুছে ফেলবেন?")) return;
    try {
      await api.delete(`/api/applications/${id}`);
      setList((l) => l.filter((x) => x._id !== id));
    } catch (e) {
      alert(apiError(e, "মুছে ফেলা ব্যর্থ"));
    }
  };

  const handleStatusSave = async () => {
    if (!editing) return;
    try {
      const { data } = await api.put(
        `/api/applications/${editing._id}/status`,
        { status: editing.status, notes: editing.notes || "" }
      );
      setList((l) => l.map((x) => (x._id === editing._id ? data.application : x)));
      setEditing(null);
    } catch (e) {
      alert(apiError(e, "আপডেট ব্যর্থ"));
    }
  };

  const filtered = list.filter((a) => {
    if (filter !== "all" && a.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        (a.name || "").toLowerCase().includes(q) ||
        (a.email || "").toLowerCase().includes(q) ||
        (a.service || "").toLowerCase().includes(q) ||
        (a.phone || "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">আবেদন ম্যানেজমেন্ট</h1>
          <p className="text-gray-500 text-sm">সকল গ্রাহক আবেদন দেখুন ও পরিচালনা করুন</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="অনুসন্ধান..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">সব স্ট্যাটাস</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
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
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <FaUserCircle className="mx-auto text-5xl text-gray-300 mb-3" />
          <p className="text-gray-600">কোনো আবেদন পাওয়া যায়নি</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">নাম</th>
                  <th className="px-4 py-3 text-left font-semibold">যোগাযোগ</th>
                  <th className="px-4 py-3 text-left font-semibold">সার্ভিস</th>
                  <th className="px-4 py-3 text-left font-semibold">স্ট্যাটাস</th>
                  <th className="px-4 py-3 text-left font-semibold">তারিখ</th>
                  <th className="px-4 py-3 text-right font-semibold">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((a) => {
                  const meta = getStatusMeta(a.status);
                  return (
                    <tr key={a._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {a.name}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        <div>{a.email}</div>
                        {a.phone && (
                          <div className="text-xs text-gray-400">{a.phone}</div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{a.service || "—"}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${meta.color}`}
                        >
                          {meta.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {formatDate(a.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() =>
                              setEditing({
                                ...a,
                                notes: a.notes || "",
                              })
                            }
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="স্ট্যাটাস পরিবর্তন"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(a._id)}
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"
                            title="মুছুন"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                আবেদন আপডেট করুন
              </h2>
              <button
                onClick={() => setEditing(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded text-sm">
                <p className="font-semibold text-gray-800">{editing.name}</p>
                <p className="text-gray-600">{editing.email}</p>
              </div>

              {editing.message && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">বার্তা</p>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                    {editing.message}
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  স্ট্যাটাস
                </label>
                <select
                  value={editing.status}
                  onChange={(e) =>
                    setEditing({ ...editing, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  নোট (অভ্যন্তরীণ)
                </label>
                <textarea
                  value={editing.notes || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, notes: e.target.value })
                  }
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="অভ্যন্তরীণ নোট লিখুন..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setEditing(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  বাতিল
                </button>
                <button
                  onClick={handleStatusSave}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <FaCheck /> সংরক্ষণ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
