import React from 'react';

const ShimmerLoader = ({ rows = 8 }) => {
  return (
    <div className="w-full h-full bg-white rounded-lg overflow-hidden">
      {/* Table structure with shimmer effect */}
      <div className="animate-pulse">
        {Array.from({ length: rows }).map((_, index) => (
          <div 
            key={index} 
            className="flex items-center p-4 border-b border-gray-100 last:border-b-0"
          >
            {/* Hospital Name Column */}
            <div className="flex-1 w-60 pr-4">
              <div className="h-6 bg-gray-200 rounded  mb-1"></div>
              <div className="h-3 bg-gray-100 rounded "></div>
            </div>

            
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShimmerLoader;