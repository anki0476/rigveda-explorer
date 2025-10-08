import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { 
  ChevronDown, 
  Home, 
  Gamepad2, 
  BookOpen, 
  Sparkles, 
  MessageCircleQuestion,
  Info,
  User,
  BookText,
  Scroll,
  CircleDot,
  Telescope,
  Network
} from 'lucide-react';

const Navigation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const dropdownTimeoutRef = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();

  const updateDropdownPosition = () => {
    if (buttonRef.current && isDropdownOpen) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.left,
        width: 256
      });
    }
  };

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

  useEffect(() => {
    updateDropdownPosition();
  }, [isDropdownOpen]);

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
    nav-item relative px-4 py-2 rounded-lg font-[family:--font-family-body] font-semibold
    transition-all duration-300 ease-out
    ${isActive(path) 
      ? 'text-[--color-gold] bg-[--color-gold]/10 shadow-[0_0_15px_rgba(218,165,32,0.3)]' 
      : 'text-[#3d2f1f] hover:text-[--color-gold] hover:bg-[--color-gold]/5 hover:shadow-[0_0_20px_rgba(218,165,32,0.4)]'
    }
  `;

  const dropdownItemClass = (path) => `
    dropdown-item flex items-center gap-3 px-4 py-3 
    text-[#3d2f1f] font-medium
    transition-all duration-300 rounded-lg
    ${isActive(path) 
      ? 'bg-[--color-gold]/10 text-[--color-gold] shadow-[0_0_12px_rgba(218,165,32,0.3)]' 
      : 'hover:text-[--color-gold] hover:bg-[--color-gold]/5 hover:shadow-[0_0_15px_rgba(218,165,32,0.35)]'
    }
  `;

  // Explore dropdown routes
  const exploreRoutes = [
    '/vedic-identity',
    '/rigveda-online', 
    '/hymns',
    '/ten-mandalas',
    '/mandala-wheel',
    '/rigveda-observatory'
  ];

  const DropdownPortal = () => {
    if (!isDropdownOpen) return null;

    return createPortal(
      <div
        className="dropdown-portal fixed z-[9999]"
        style={{
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
          width: `${dropdownPosition.width}px`,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="dropdown-menu bg-[--color-parchment] border-2 border-[--color-gold]/30 rounded-lg shadow-2xl p-2 backdrop-blur-sm">
          
          <Link to="/vedic-identity" className={dropdownItemClass('/vedic-identity')}>
            <User size={20} />
            <span>My Vedic Identity</span>
          </Link>
          
          <Link to="/rigveda-online" className={dropdownItemClass('/rigveda-online')}>
            <BookOpen size={20} />
            <span>Rig Veda Online</span>
          </Link>
          
          <Link to="/hymns" className={dropdownItemClass('/hymns')}>
            <Scroll size={20} />
            <span>Hymns</span>
          </Link>
          
          <Link to="/ten-mandalas" className={dropdownItemClass('/ten-mandalas')}>
            <BookText size={20} />
            <span>Ten Mandalas</span>
          </Link>
          
          <Link to="/mandala-wheel" className={dropdownItemClass('/mandala-wheel')}>
            <CircleDot size={20} />
            <span>Mandala Wheel</span>
          </Link>
          
          <Link to="/rigveda-observatory" className={dropdownItemClass('/rigveda-observatory')}>
            <Telescope size={20} />
            <span>RigVeda Observatory</span>
          </Link>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[--color-parchment]/95 backdrop-blur-sm border-b-2 border-[--color-gold]/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16 gap-2">
            
            {/* HOME */}
            <Link to="/" className={navItemClass('/')}>
              <div className="flex items-center gap-2">
                <Home size={20} />
                <span className="hidden sm:inline">HOME</span>
              </div>
            </Link>

            {/* EXPLORE (formerly INDEX) */}
            <div
              ref={buttonRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`
                  nav-item flex items-center gap-2 px-4 py-2 rounded-lg font-semibold
                  font-[family:--font-family-body] transition-all duration-300 
                  ${isDropdownOpen || exploreRoutes.includes(location.pathname)
                    ? 'text-[--color-gold] bg-[--color-gold]/10 shadow-[0_0_15px_rgba(218,165,32,0.3)]'
                    : 'text-[#3d2f1f] hover:text-[--color-gold] hover:bg-[--color-gold]/5 hover:shadow-[0_0_20px_rgba(218,165,32,0.4)]'
                  }
                `}
              >
                <BookOpen size={20} />
                <span className="hidden sm:inline">EXPLORE</span>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                />
              </button>
            </div>

            {/* DEITY NETWORK */}
            <Link to="/deity-network" className={navItemClass('/deity-network')}>
              <div className="flex items-center gap-2">
                <Network size={20} />
                <span className="hidden sm:inline">DEITY NETWORK</span>
              </div>
            </Link>

            {/* SURPRISE ME */}
            <Link to="/surprise" className={navItemClass('/surprise')}>
              <div className="flex items-center gap-2">
                <Sparkles size={20} />
                <span className="hidden sm:inline">SURPRISE ME!</span>
              </div>
            </Link>

            {/* ASK THE RISHI */}
            <Link to="/ask-rishi" className={navItemClass('/ask-rishi')}>
              <div className="flex items-center gap-2">
                <MessageCircleQuestion size={20} />
                <span className="hidden sm:inline">ASK THE RISHI</span>
              </div>
            </Link>

            {/* GAMES */}
            <Link to="/games" className={navItemClass('/games')}>
              <div className="flex items-center gap-2">
                <Gamepad2 size={20} />
                <span className="hidden sm:inline">GAMES</span>
              </div>
            </Link>

            {/* ABOUT */}
            <Link to="/about" className={navItemClass('/about')}>
              <div className="flex items-center gap-2">
                <Info size={20} />
                <span className="hidden sm:inline">ABOUT</span>
              </div>
            </Link>

          </div>
        </div>
      </nav>

      <DropdownPortal />
    </>
  );
};

export default Navigation;
