import { FaGlobe, FaPhone, FaEnvelope, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";

export default function WebsiteControl() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">ওয়েবসাইট কন্ট্রোল</h1>
        <p className="text-gray-500 text-sm">
          ওয়েবসাইটের বিভিন্ন বিভাগ নিয়ন্ত্রণ করুন
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg flex items-start gap-3">
        <FaInfoCircle className="mt-1 flex-shrink-0" />
        <div className="text-sm">
          <p className="font-semibold mb-1">তথ্য</p>
          <p>
            ওয়েবসাইটের প্রতিটি বিভাগ এখন নিজস্ব ম্যানেজমেন্ট পেজ থেকে নিয়ন্ত্রণ
            করা যায়। সাইডবার থেকে সংশ্লিষ্ট বিভাগ নির্বাচন করুন।
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center">
              <FaGlobe />
            </div>
            <h3 className="font-bold text-gray-800">যোগাযোগ তথ্য</h3>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-gray-400" />
              <span>yousufconsultancy46@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone className="text-gray-400" />
              <span>+966 XX XXX XXXX</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-gray-400" />
              <span>জেদ্দা, সৌদি আরব</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            যোগাযোগ তথ্য পরিবর্তনের জন্য Footer.jsx ফাইল আপডেট করুন
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-500 text-white rounded-lg flex items-center justify-center">
              <FaInfoCircle />
            </div>
            <h3 className="font-bold text-gray-800">ম্যানেজমেন্ট গাইড</h3>
          </div>
          <ul className="text-sm text-gray-600 space-y-1.5 list-disc list-inside">
            <li>টিম সদস্য - সাইডবার থেকে "টিম ম্যানেজমেন্ট"</li>
            <li>ওমরাহ প্যাকেজ - সাইডবার থেকে "ওমরাহ প্যাকেজ"</li>
            <li>ব্লগ পোস্ট - সাইডবার থেকে "ব্লগ"</li>
            <li>সার্ভিস - সাইডবার থেকে "সার্ভিস"</li>
            <li>গ্যালারি ছবি - সাইডবার থেকে "গ্যালারি"</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
