import { useRef, useState } from "react";
import { FaUpload, FaTrashAlt, FaImage } from "react-icons/fa";

/**
 * ImageUploadField — local preview + file selection.
 * Props:
 *   currentUrl   – existing absolute URL (server-hosted)
 *   onFileChange – (File | null) => void
 *   label        – Bangla label
 */
export default function ImageUploadField({
  currentUrl,
  onFileChange,
  label = "ছবি",
  height = "h-48",
}) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const pick = () => inputRef.current?.click();

  const onChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
      alert("শুধুমাত্র JPG, PNG, WEBP বা GIF ফাইল গ্রহণযোগ্য");
      e.target.value = "";
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      alert("ফাইলের আকার ৮MB এর মধ্যে রাখুন");
      e.target.value = "";
      return;
    }
    setPreview(URL.createObjectURL(file));
    onFileChange(file);
  };

  const clear = () => {
    setPreview(null);
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const display = preview || currentUrl;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={onChange}
      />

      {display ? (
        <div className="relative group">
          <img
            src={display}
            alt="preview"
            className={`w-full ${height} object-cover rounded-lg border border-gray-200`}
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3 rounded-lg">
            <button
              type="button"
              onClick={pick}
              className="px-3 py-1.5 bg-white text-gray-800 rounded text-sm font-medium flex items-center gap-2"
            >
              <FaUpload /> পরিবর্তন
            </button>
            {preview && (
              <button
                type="button"
                onClick={clear}
                className="px-3 py-1.5 bg-rose-600 text-white rounded text-sm font-medium flex items-center gap-2"
              >
                <FaTrashAlt /> বাতিল
              </button>
            )}
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={pick}
          className={`w-full ${height} border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 transition`}
        >
          <FaImage className="text-3xl mb-2" />
          <span className="text-sm">ছবি আপলোড করতে ক্লিক করুন</span>
          <span className="text-xs text-gray-400 mt-1">JPG, PNG (সর্বোচ্চ ৮MB)</span>
        </button>
      )}
    </div>
  );
}
