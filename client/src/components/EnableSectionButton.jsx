import React from 'react';

export default function EnableSectionButton({ sectionName, onEnable, loading }) {
  return (
    <div className="text-center py-12">
      <p className="text-gray-600 mb-4">
        This section is currently disabled in your preferences
      </p>
      <button
        onClick={onEnable}
        disabled={loading}
        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
      >
        {loading ? 'Enabling...' : `Enable ${sectionName}`}
      </button>
    </div>
  );
}
