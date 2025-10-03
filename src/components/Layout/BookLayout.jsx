import React from 'react';
import "../../styles/textures.css";
import Navigation from './Navigation';



/**
 * BookLayout Component
 * 
 * A full-page container with ancient manuscript aesthetics for the Rig Veda Explorer.
 * Features parchment background, Sanskrit title, and responsive design.
 * 
 * @param {React.ReactNode} children - The page content to display
 * @param {number} [pageNumber] - Optional page number to display in bottom-right
 * @returns {JSX.Element} The book layout component
 */
const BookLayout = ({ children, pageNumber }) => {
  return (
    <>
      <Navigation />
      
      <div className="min-h-screen w-full texture-parchment relative overflow-hidden">
        {/* Sanskrit Title - Top Left Corner */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-amber-600 drop-shadow-sm">
            ऋग्वेद
          </h1>
          <div className="text-xs sm:text-sm text-amber-700/80 font-serif mt-1">
            Rig Veda
          </div>
        </div>


        {/* Page Number - Bottom Right Corner (if provided) */}
        {pageNumber && (
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10">
            <div className="text-sm sm:text-base text-amber-800/70 font-serif bg-amber-50/50 px-2 py-1 rounded-sm border border-amber-200/50">
              {pageNumber}
            </div>
          </div>
        )}


        {/* Main Content Container */}
        <div className="w-full max-w-none sm:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          {/* Content Wrapper with subtle inner shadow */}
          <div className="relative">
            {/* Subtle inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 via-transparent to-amber-100/10 rounded-lg pointer-events-none" />
            
            {/* Main Content */}
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </div>


        {/* Decorative Corner Elements */}
        <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 opacity-10">
          <div className="w-full h-full border-l-2 border-t-2 border-amber-600 rounded-tl-lg" />
        </div>
        <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 opacity-10">
          <div className="w-full h-full border-r-2 border-t-2 border-amber-600 rounded-tr-lg" />
        </div>
        <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 opacity-10">
          <div className="w-full h-full border-l-2 border-b-2 border-amber-600 rounded-bl-lg" />
        </div>
        <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 opacity-10">
          <div className="w-full h-full border-r-2 border-b-2 border-amber-600 rounded-br-lg" />
        </div>


        {/* Subtle Page Edge Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Left edge aging */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-800/20 via-amber-700/10 to-amber-800/20" />
          {/* Right edge aging */}
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-800/20 via-amber-700/10 to-amber-800/20" />
          {/* Top edge aging */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-800/20 via-amber-700/10 to-amber-800/20" />
          {/* Bottom edge aging */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-800/20 via-amber-700/10 to-amber-800/20" />
        </div>
      </div>
    </>
  );
};


export default BookLayout;
