import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="text-white text-xl mb-4">Loading...</div>
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-white"></div>
    </div>
  );
};

export default Loading;
