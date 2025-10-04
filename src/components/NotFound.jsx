import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl border-4 border-amber-300/50 p-12 text-center">
          {/* Icon */}
          <div className="text-8xl mb-6 animate-bounce">
            📜❌
          </div>

          {/* Title */}
          <h1 className="text-5xl font-serif font-bold text-amber-900 mb-4">
            Lost in the Vedas?
          </h1>

          {/* Subtitle */}
          <p className="text-2xl text-amber-700 font-serif mb-8">
            The path you seek does not exist
          </p>

          {/* Poetic Message */}
          <div className="bg-amber-100 p-6 rounded-lg border-l-4 border-amber-600 mb-8">
            <p className="text-lg text-amber-800 font-serif italic leading-relaxed">
              "Like a seeker wandering through ancient texts,<br />
              You've stumbled upon uncharted territory.<br />
              Fear not—the way back is clear."
            </p>
          </div>

          {/* Error Code */}
          <div className="mb-8">
            <span className="inline-block px-6 py-2 bg-red-100 text-red-700 rounded-full font-serif text-sm uppercase tracking-wider">
              Error 404 - Page Not Found
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              to="/"
              className="px-8 py-4 bg-amber-600 text-white font-serif text-lg rounded-lg hover:bg-amber-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🏠 Return Home
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="px-8 py-4 bg-gray-200 text-gray-800 font-serif text-lg rounded-lg hover:bg-gray-300 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              ← Go Back
            </button>
          </div>

          {/* Quick Links */}
          <div className="border-t border-amber-200 pt-6">
            <p className="text-sm text-amber-700 font-serif mb-4">
              Quick Navigation:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/deity-network"
                className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-all text-sm"
              >
                🕸️ Deity Network
              </Link>
              <Link
                to="/hymns"
                className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-all text-sm"
              >
                📜 Hymns
              </Link>
              <Link
                to="/rigveda-online"
                className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-all text-sm"
              >
                📚 Topics
              </Link>
              <Link
                to="/ten-mandalas"
                className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-all text-sm"
              >
                📖 Mandalas
              </Link>
              <Link
                to="/surprise-me"
                className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-all text-sm"
              >
                ✨ Surprise Me
              </Link>
            </div>
          </div>
        </div>

        {/* Fun Fact */}
        <div className="mt-6 text-center">
          <p className="text-sm text-amber-800 font-serif">
            💡 <strong>Did you know?</strong> The Rig Veda contains 10,552 verses across 1,028 hymns!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
