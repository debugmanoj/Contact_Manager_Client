import React from 'react';

const FullPageLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white font-poppins">
      <div className="flex flex-col items-center space-y-3">
        <svg
          className="animate-spin h-10 w-10 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l4-4-4-4v4a10 10 0 00-10 10h4z"
          />
        </svg>
        <p className="text-sm text-gray-500 animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

export default FullPageLoader;
