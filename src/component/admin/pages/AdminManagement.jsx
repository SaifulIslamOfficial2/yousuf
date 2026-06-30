import { useEffect, useState } from "react";
import {
  FaPlus,
  FaTrashAlt,
  FaEdit,
  FaTimes,
  FaUserShield,
  FaCheck,
  FaCrown,
} from "react-icons/fa";
import api, { apiError } from "../../../api/client";
import { useAuth } from "../../../hooks/useAuth";
import { ALL_PERMISSIONS, PERMISSION_LABELS } from "../../../api/permissions";

const emptyForm = {
  name: "",
  email: "",
  password: "",
  permissions: [],
};

export default function AdminManagement() {
  const { user: currentUser } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/admins");
      setAdmins(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(apiError(e, "অ্যাডমিন লোড ব্যর্থ"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const togglePerm = (perm) =>
    setForm((f) => ({
      ...f,
      permissions: f.permissions.includes(perm)
        ? f.permissions.filter((p) => p !== perm)
        : [...f.permissions, perm],
    }));

  const handleAdd = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("সকল ফিল্ড পূরণ করুন");
      return;
    }
    if (form.password.length < 6) {
      alert("পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে");
      return;
    }
    setSaving(true);
    try {
      await api.post("/api/admins", form);
      await fetchAdmins();
      setShowAdd(false);
      setForm(emptyForm);
    } catch (e) {
      alert(apiError(e, "যোগ করা ব্যর্থ"));
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      await api.put(`/api/admins/${editing._id}`, {
        name: editing.name,
        permissions: editing.permissions,
      });
      await fetchAdmins();
      setEditing(null);
    } catch (e) {
      alert(apiError(e, "আপডেট ব্যর্থ"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, role) => {
    if (role === "admin") {
      alert("প্রধান অ্যাডমিন মুছে ফেলা যাবে না");
      return;
    }
    if (!confirm("এই সাব-অ্যাডমিন মুছে ফেলবেন?")) return;
    try {
      await api.delete(`/api/admins/${id}`);
      setAdmins((a) => a.filter((x) => x._id !== id));
    } catch (e) {
      alert(apiError(e, "মুছে ফেলা ব্যর্থ"));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">অ্যাডমিন ম্যানেজমেন্ট</h1>
          <p className="text-gray-500 text-sm">
            সাব-অ্যাডমিন তৈরি ও তাদের অনুমতি পরিচালনা করুন
          </p>
        </div>
        <button
          onClick={() => {
            setForm(emptyForm);
            setShowAdd(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus /> সাব-অ্যাডমিন যোগ করুন
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
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">নাম</th>
                  <th className="px-4 py-3 text-left font-semibold">ইমেইল</th>
                  <th className="px-4 py-3 text-left font-semibold">ভূমিকা</th>
                  <th className="px-4 py-3 text-left font-semibold">অনুমতি</th>
                  <th className="px-4 py-3 text-right font-semibold">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {admins.map((a) => (
                  <tr key={a._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">
                      <div className="flex items-center gap-2">
                        {a.role === "admin" ? (
                          <FaCrown className="text-amber-500" />
                        ) : (
                          <FaUserShield className="text-blue-500" />
                        )}
                        {a.name}
                        {a._id === currentUser?._id && (
                          <span className="text-xs text-gray-400">(আপনি)</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{a.email}</td>
                    <td className="px-4 py-3">
                      {a.role === "admin" ? (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                          প্রধান অ্যাডমিন
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          সাব-অ্যাডমিন
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {a.role === "admin" ? (
                        <span className="text-xs text-gray-500">সকল অনুমতি</span>
                      ) : a.permissions?.length ? (
                        <div className="flex flex-wrap gap-1">
                          {a.permissions.map((p) => (
                            <span
                              key={p}
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
                            >
                              {PERMISSION_LABELS[p] || p}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">কোনো অনুমতি নেই</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {a.role !== "admin" && (
                          <>
                            <button
                              onClick={() =>
                                setEditing({
                                  ...a,
                                  permissions: a.permissions || [],
                                })
                              }
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                              title="অনুমতি সম্পাদনা"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(a._id, a.role)}
                              className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"
                              title="মুছুন"
                            >
                              <FaTrashAlt />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                নতুন সাব-অ্যাডমিন যোগ করুন
              </h2>
              <button
                onClick={() => setShowAdd(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  নাম
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
                  পাসওয়ার্ড (ন্যূনতম ৬ অক্ষর)
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  অনুমতি নির্বাচন করুন
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {ALL_PERMISSIONS.map((p) => (
                    <label
                      key={p}
                      className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={form.permissions.includes(p)}
                        onChange={() => togglePerm(p)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      {PERMISSION_LABELS[p]}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowAdd(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  বাতিল
                </button>
                <button
                  onClick={handleAdd}
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

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                অনুমতি সম্পাদনা করুন
              </h2>
              <button
                onClick={() => setEditing(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-semibold text-gray-800">{editing.name}</p>
                <p className="text-sm text-gray-600">{editing.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  নাম
                </label>
                <input
                  type="text"
                  value={editing.name}
                  onChange={(e) =>
                    setEditing({ ...editing, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  অনুমতি
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {ALL_PERMISSIONS.map((p) => (
                    <label
                      key={p}
                      className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={editing.permissions.includes(p)}
                        onChange={() =>
                          setEditing({
                            ...editing,
                            permissions: editing.permissions.includes(p)
                              ? editing.permissions.filter((x) => x !== p)
                              : [...editing.permissions, p],
                          })
                        }
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      {PERMISSION_LABELS[p]}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setEditing(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  বাতিল
                </button>
                <button
                  onClick={handleEdit}
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
