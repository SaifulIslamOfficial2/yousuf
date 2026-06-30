import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b0f2f] to-[#1a1f4f] text-white px-6">

      <div className="text-center max-w-xl">

        {/* ERROR CODE */}
        <h1 className="text-7xl md:text-9xl font-extrabold text-yellow-400">
          404
        </h1>

        {/* TITLE */}
        <h2 className="mt-4 text-2xl md:text-3xl font-bold">
          Oops! Page Not Found
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-4 text-gray-300">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">

          <Link
            to="/"
            className="px-6 py-3  bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            Go Home
          </Link>

          <Link
            to="/contact"
            className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
          >
            Contact Us
          </Link>

        </div>

        {/* EXTRA TEXT */}
        <p className="mt-6 text-sm text-gray-400">
          Need help with visa or immigration? We’re here for you.
        </p>

      </div>

    </div>
  );
}

export default ErrorPage;
