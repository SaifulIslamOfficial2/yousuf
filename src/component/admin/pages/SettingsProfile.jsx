import { useState, useRef } from "react";
import {
  FaUser,
  FaKey,
  FaCamera,
  FaCheck,
  FaUserCircle,
} from "react-icons/fa";
import api, { apiError } from "../../../api/client";
import { useAuth } from "../../../hooks/useAuth";

const TABS = [
  { id: "profile", label: "প্রোফাইল", icon: FaUser },
  { id: "password", label: "পাসওয়ার্ড", icon: FaKey },
];

export default function SettingsProfile() {
  const { user, updateUser } = useAuth();
  const [tab, setTab] = useState("profile");

  // Profile form
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [profileMsg, setProfileMsg] = useState(null);
  const [profileSaving, setProfileSaving] = useState(false);

  // Avatar
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarSaving, setAvatarSaving] = useState(false);
  const avatarInputRef = useRef(null);

  // Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState(null);
  const [passwordSaving, setPasswordSaving] = useState(false);

  const showMsg = (setter, type, text) => {
    setter({ type, text });
    setTimeout(() => setter(null), 4000);
  };

  const handleAvatarPick = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(f.type)) {
      alert("শুধুমাত্র JPG, PNG বা WEBP গ্রহণযোগ্য");
      return;
    }
    if (f.size > 8 * 1024 * 1024) {
      alert("ফাইলের আকার ৮MB এর মধ্যে রাখুন");
      return;
    }
    setAvatarFile(f);
    setAvatarPreview(URL.createObjectURL(f));
  };

  const handleAvatarSave = async () => {
    if (!avatarFile) return;
    setAvatarSaving(true);
    try {
      const fd = new FormData();
      fd.append("avatar", avatarFile);
      const { data } = await api.post("/api/admin/avatar", fd);
      updateUser({ avatar: data.avatar });
      setAvatarFile(null);
      setAvatarPreview(null);
      showMsg(setProfileMsg, "success", "প্রোফাইল ছবি আপডেট হয়েছে");
    } catch (e) {
      showMsg(setProfileMsg, "error", apiError(e, "আপলোড ব্যর্থ"));
    } finally {
      setAvatarSaving(false);
    }
  };

  const handleProfileSave = async () => {
    setProfileSaving(true);
    try {
      const { data } = await api.put("/api/admin/profile", { name, email, phone });
      updateUser({ name: data.user.name, email: data.user.email, phone: data.user.phone });
      showMsg(setProfileMsg, "success", "প্রোফাইল আপডেট হয়েছে");
    } catch (e) {
      showMsg(setProfileMsg, "error", apiError(e, "আপডেট ব্যর্থ"));
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordSave = async () => {
    if (!currentPassword || !newPassword) {
      showMsg(setPasswordMsg, "error", "সকল ফিল্ড পূরণ করুন");
      return;
    }
    if (newPassword.length < 6) {
      showMsg(setPasswordMsg, "error", "নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষর");
      return;
    }
    if (newPassword !== confirmPassword) {
      showMsg(setPasswordMsg, "error", "পাসওয়ার্ড দুইটি মিলেনি");
      return;
    }
    setPasswordSaving(true);
    try {
      await api.post("/api/admin/change-password", { currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      showMsg(setPasswordMsg, "success", "পাসওয়ার্ড পরিবর্তিত হয়েছে");
    } catch (e) {
      showMsg(setPasswordMsg, "error", apiError(e, "পরিবর্তন ব্যর্থ"));
    } finally {
      setPasswordSaving(false);
    }
  };

  const Msg = ({ data }) =>
    data ? (
      <div
        className={`px-4 py-3 rounded text-sm ${
          data.type === "success"
            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
            : "bg-rose-50 text-rose-700 border border-rose-200"
        }`}
      >
        {data.text}
      </div>
    ) : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">সেটিংস ও প্রোফাইল</h1>
        <p className="text-gray-500 text-sm">আপনার অ্যাকাউন্ট পরিচালনা করুন</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {/* Tabs */}
        <div className="border-b border-gray-100 flex">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 px-4 py-3 flex items-center justify-center gap-2 text-sm font-medium transition border-b-2 ${
                  tab === t.id
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-500 border-transparent hover:text-gray-700"
                }`}
              >
                <Icon /> {t.label}
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {tab === "profile" && (
            <div className="space-y-6">
              {/* Avatar section */}
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100">
                <div className="relative">
                  {avatarPreview || user?.avatar ? (
                    <img
                      src={avatarPreview || user.avatar}
                      alt="avatar"
                      className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-300">
                      <FaUserCircle className="text-5xl" />
                    </div>
                  )}
                  <button
                    onClick={() => avatarInputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 shadow"
                    title="ছবি পরিবর্তন"
                  >
                    <FaCamera className="text-xs" />
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={avatarInputRef}
                    onChange={handleAvatarPick}
                    className="hidden"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <p className="font-bold text-gray-800">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                  {avatarFile && (
                    <button
                      onClick={handleAvatarSave}
                      disabled={avatarSaving}
                      className="mt-2 px-4 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1"
                    >
                      <FaCheck /> {avatarSaving ? "সংরক্ষণ..." : "ছবি সংরক্ষণ"}
                    </button>
                  )}
                </div>
              </div>

              <Msg data={profileMsg} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    নাম
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ইমেইল
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ফোন
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleProfileSave}
                disabled={profileSaving}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                <FaCheck /> {profileSaving ? "সংরক্ষণ হচ্ছে..." : "প্রোফাইল সংরক্ষণ"}
              </button>
            </div>
          )}

          {tab === "password" && (
            <div className="space-y-4 max-w-md">
              <Msg data={passwordMsg} />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  বর্তমান পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  নতুন পাসওয়ার্ড (ন্যূনতম ৬ অক্ষর)
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  নতুন পাসওয়ার্ড পুনরায় লিখুন
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <button
                onClick={handlePasswordSave}
                disabled={passwordSaving}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                <FaCheck /> {passwordSaving ? "পরিবর্তন হচ্ছে..." : "পাসওয়ার্ড পরিবর্তন"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
