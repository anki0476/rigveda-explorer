import React from 'react';

const SearchSkeleton = ({ count = 3 }) => {
  return (
    <div className="space-y-4 p-4">
      {[...Array(count)].map((_, idx) => (
        <div 
          key={idx} 
          className="flex items-start gap-3 animate-pulse"
          style={{
            animation: `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
            animationDelay: `${idx * 0.1}s`
          }}
        >
          {/* Icon Skeleton */}
          <div 
            className="skeleton-box"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'linear-gradient(90deg, rgba(218, 165, 32, 0.1) 25%, rgba(218, 165, 32, 0.2) 50%, rgba(218, 165, 32, 0.1) 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s infinite'
            }}
          />
          
          {/* Text Content Skeleton */}
          <div className="flex-1 space-y-2">
            {/* Title */}
            <div 
              className="skeleton-box"
              style={{
                width: `${70 + (idx * 10)}%`,
                height: '20px',
                borderRadius: '4px',
                background: 'linear-gradient(90deg, rgba(218, 165, 32, 0.1) 25%, rgba(218, 165, 32, 0.2) 50%, rgba(218, 165, 32, 0.1) 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite'
              }}
            />
            
            {/* Subtitle */}
            <div 
              className="skeleton-box"
              style={{
                width: '40%',
                height: '16px',
                borderRadius: '4px',
                background: 'linear-gradient(90deg, rgba(218, 165, 32, 0.1) 25%, rgba(218, 165, 32, 0.2) 50%, rgba(218, 165, 32, 0.1) 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite'
              }}
            />
            
            {/* Description lines */}
            <div 
              className="skeleton-box"
              style={{
                width: '90%',
                height: '14px',
                borderRadius: '4px',
                background: 'linear-gradient(90deg, rgba(218, 165, 32, 0.1) 25%, rgba(218, 165, 32, 0.2) 50%, rgba(218, 165, 32, 0.1) 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite'
              }}
            />
            <div 
              className="skeleton-box"
              style={{
                width: '60%',
                height: '14px',
                borderRadius: '4px',
                background: 'linear-gradient(90deg, rgba(218, 165, 32, 0.1) 25%, rgba(218, 165, 32, 0.2) 50%, rgba(218, 165, 32, 0.1) 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchSkeleton;
