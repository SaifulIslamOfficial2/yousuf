import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaUser } from "react-icons/fa";
import { useLang } from "../../i18n/LanguageContext";

const BASE = import.meta.env.VITE_BACKEND_URL || "";

const formatDate = (d) => {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return new Date(d).toLocaleDateString();
  }
};

export default function BlogDetail() {
  const { id } = useParams();
  const { t } = useLang();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE}/api/blog/${id}`)
      .then((r) => r.json())
      .then((d) => setPost(d?.error ? null : d))
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B3B75]"></div>
      </div>
    );
  }
  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center">
        <div>
          <p className="text-gray-500">{t.common.noData}</p>
          <Link to="/blog" className="text-[#1E6FB8] underline mt-3 inline-block">
            {t.blog.backToBlog}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {post.image && (
        <div className="w-full h-[360px] md:h-[460px] overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}
      <article className="container mx-auto px-6 py-12 max-w-4xl">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-[#1E6FB8] hover:gap-3 transition-all mb-6"
        >
          <FaArrowLeft /> {t.blog.backToBlog}
        </Link>
        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
          {post.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-[#0B3B75] mt-4 leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-4">
          {post.author && (
            <span className="flex items-center gap-1">
              <FaUser /> {t.blog.by}: {post.author}
            </span>
          )}
          <span className="flex items-center gap-1">
            <FaCalendarAlt /> {t.blog.publishedOn}: {formatDate(post.createdAt)}
          </span>
        </div>
        {post.excerpt && (
          <p className="text-gray-600 text-lg mt-6 leading-relaxed italic border-l-4 border-[#1E6FB8] pl-4">
            {post.excerpt}
          </p>
        )}
        <div className="prose max-w-none text-gray-700 leading-relaxed mt-8 whitespace-pre-wrap">
          {post.content}
        </div>
      </article>
    </div>
  );
}
