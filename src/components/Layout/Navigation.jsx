import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom'; // ← ADD THIS IMPORT
import { ChevronDown } from 'lucide-react';

const Navigation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 }); // ← ADD THIS
  const dropdownTimeoutRef = useRef(null);
  const buttonRef = useRef(null); // ← ADD THIS
  const location = useLocation();

  // ← ADD THIS FUNCTION
  const updateDropdownPosition = () => {
    if (buttonRef.current && isDropdownOpen) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.left,
        width: 224 // w-56 = 14rem = 224px
      });
    }
  };

  // ← UPDATE THIS
  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 500);
  };

  // ← ADD THIS EFFECT
  useEffect(() => {
    updateDropdownPosition();
  }, [isDropdownOpen]);

  // ← ADD THIS EFFECT
  useEffect(() => {
    if (isDropdownOpen) {
      const handleScroll = () => updateDropdownPosition();
      const handleResize = () => updateDropdownPosition();

      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  const navItemClass = (path) => `
    nav-item relative px-4 py-2 rounded-lg font-[family:--font-family-body] 
    transition-all duration-300 ease-out
    ${isActive(path) 
      ? 'text-[--color-gold] bg-[--color-gold]/10' 
      : 'text-[--color-ink] hover:text-[--color-gold]'
    }
  `;

  const dropdownItemClass = (path) => `
    dropdown-item flex items-center gap-3 px-4 py-3 
    text-[--color-ink] hover:text-[--color-gold] 
    transition-all duration-300 rounded-lg
    ${isActive(path) ? 'bg-[--color-gold]/10 text-[--color-gold]' : ''}
  `;

  // ← ADD THIS PORTAL COMPONENT
  const DropdownPortal = () => {
    if (!isDropdownOpen) return null;

    return createPortal(
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'fixed',
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
          width: `${dropdownPosition.width}px`,
          zIndex: 1000000,
          backgroundColor: '#F5E6D3',
          border: '2px solid rgba(218, 165, 32, 0.3)',
          borderRadius: '0.5rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '0.5rem 0',
          animation: 'fade-in-down 0.3s ease-out'
        }}
      >
        <Link 
          to="/rigveda-on" 
          className={dropdownItemClass('/rigveda-on')}
          onClick={() => setIsDropdownOpen(false)}
        >
          <span className="text-xl">📖</span>
          <span>Rig Veda On...</span>
        </Link>
        
        <Link 
          to="/hymns" 
          className={dropdownItemClass('/hymns')}
          onClick={() => setIsDropdownOpen(false)}
        >
          <span className="text-xl">📜</span>
          <span>Hymns</span>
        </Link>
        
        <Link 
          to="/mandalas" 
          className={dropdownItemClass('/mandalas')}
          onClick={() => setIsDropdownOpen(false)}
        >
          <span className="text-xl">📔</span>
          <span>Ten Mandalas</span>
        </Link>
        
        <Link 
          to="/mandala-wheel" 
          className={dropdownItemClass('/mandala-wheel')}
          onClick={() => setIsDropdownOpen(false)}
        >
          <span className="text-xl">☸️</span>
          <span>Mandala Wheel</span>
        </Link>
        
        <Link 
          to="/star-map" 
          className={dropdownItemClass('/star-map')}
          onClick={() => setIsDropdownOpen(false)}
        >
          <span className="text-xl">⭐</span>
          <span>RigVeda Observatory</span>
        </Link>
      </div>,
      document.body
    );
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b-2 border-[--color-gold]/30 shadow-md" style={{ backgroundColor: '#F5E6D3' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16 gap-2">
            
            {/* Home */}
            <Link to="/" className={navItemClass('/')}>
              <span className="flex items-center gap-2">
                <span className="text-xl">🏠</span>
                <span className="hidden sm:inline">Home</span>
              </span>
            </Link>

            {/* Index Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                ref={buttonRef}
                className={`nav-item flex items-center gap-1 px-4 py-2 rounded-lg font-[family:--font-family-body] transition-all duration-300 ${
                  isDropdownOpen ? 'text-[--color-gold] bg-[--color-gold]/10' : 'text-[--color-ink] hover:text-[--color-gold]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-xl">📚</span>
                  <span className="hidden sm:inline">Index</span>
                </span>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            {/* Other Nav Items */}
            <Link to="/deity-network" className={navItemClass('/deity-network')}>
              <span className="flex items-center gap-2">
                <span className="text-xl">🕸️</span>
                <span className="hidden sm:inline">Deity Network</span>
              </span>
            </Link>

            <Link to="/surprise-me" className={navItemClass('/surprise-me')}>
              <span className="flex items-center gap-2">
                <span className="text-xl">✨</span>
                <span className="hidden sm:inline">Surprise Me!</span>
              </span>
            </Link>

            <Link to="/ask-rishi" className={navItemClass('/ask-rishi')}>
              <span className="flex items-center gap-2">
                <span className="text-xl">💬</span>
                <span className="hidden sm:inline">Ask the Rishi</span>
              </span>
            </Link>

            {/* About */}
            <Link to="/about" className={navItemClass('/about')}>
              <span className="flex items-center gap-2">
                <span className="text-xl">ℹ️</span>
                <span className="hidden sm:inline">About</span>
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16" />

      {/* ← RENDER PORTAL DROPDOWN */}
      <DropdownPortal />

      {/* CSS Styles */}
      <style>{`
        /* Glow effect for main nav items */
        .nav-item {
          position: relative;
          isolation: isolate;
          overflow: hidden;
        }

        .nav-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 0.5rem;
          background: radial-gradient(ellipse at center, rgba(218, 165, 32, 0.25) 0%, transparent 70%);
          transform: scale(0.8);
          transition: transform 0.4s ease-out, opacity 0.4s ease-out;
          pointer-events: none;
          z-index: 0;
          opacity: 0;
        }

        .nav-item > * {
          position: relative;
          z-index: 1;
        }

        .nav-item:hover::before {
          transform: scale(1);
          opacity: 1;
        }

        .nav-item:hover {
          box-shadow: 0 0 20px rgba(218, 165, 32, 0.4), inset 0 0 15px rgba(218, 165, 32, 0.1);
        }

        /* Glow effect for dropdown items */
        .dropdown-item {
          position: relative;
          isolation: isolate;
          overflow: hidden;
        }

        .dropdown-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 0.5rem;
          background: radial-gradient(ellipse at center, rgba(218, 165, 32, 0.2) 0%, transparent 70%);
          transform: scale(0.8);
          transition: transform 0.3s ease-out, opacity 0.3s ease-out;
          pointer-events: none;
          z-index: 0;
          opacity: 0;
        }

        .dropdown-item > * {
          position: relative;
          z-index: 1;
        }

        .dropdown-item:hover::before {
          transform: scale(1);
          opacity: 1;
        }

        .dropdown-item:hover {
          box-shadow: 0 0 15px rgba(218, 165, 32, 0.3), inset 0 0 10px rgba(218, 165, 32, 0.1);
        }

        /* Dropdown animation */
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navigation;
