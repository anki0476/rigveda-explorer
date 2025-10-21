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
  Network,
  Settings,
  Menu,        // 📱 NEW: Hamburger icon
  X            // 📱 NEW: Close icon
} from 'lucide-react';

import { useSoundEffect } from '../../hooks/useSoundEffect';
import SettingsPanel from './SettingsPanel';

const Navigation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const dropdownTimeoutRef = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();

  // 📱 NEW: Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const playHover = useSoundEffect('/audio/button-hover.mp3');
  const playClick = useSoundEffect('/audio/button-click.mp3');

  // 📱 NEW: Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false); // Close mobile menu when resizing to desktop
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 📱 NEW: Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

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

  // 📱 NEW: Mobile menu item class
  const mobileMenuItemClass = (path) => `
    flex items-center gap-3 px-4 py-3 rounded-lg font-semibold
    transition-all duration-300
    ${isActive(path)
      ? 'text-[--color-gold] bg-[--color-gold]/10'
      : 'text-[#3d2f1f] hover:text-[--color-gold] hover:bg-[--color-gold]/5'
    }
  `;

  const exploreRoutes = [
    '/vedic-identity',
    '/deity-network',
    '/ask-rishi',
    '/hymns',
    '/mandala-wheel',
    '/star-map'
  ];

  const DropdownPortal = () => {
    if (!isDropdownOpen || isMobile) return null;

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
          
        <Link to="/vedic-identity" className={dropdownItemClass('/vedic-identity')} onMouseEnter={playHover} onClick={playClick}>
            <User size={20} />
            <span>My Vedic Identity</span>
          </Link>
          
          <Link to="/deity-network" className={dropdownItemClass('/deity-network')} onMouseEnter={playHover} onClick={playClick}>
            <Network size={20} />
            <span>Deity Network</span>
          </Link>
          
          <Link to="/ask-rishi" className={dropdownItemClass('/ask-rishi')} onMouseEnter={playHover} onClick={playClick}>
            <MessageCircleQuestion size={20} />
            <span>Ask the Rishi</span>
          </Link>
          
          <Link to="/hymns" className={dropdownItemClass('/hymns')} onMouseEnter={playHover} onClick={playClick}>
            <Scroll size={20} />
            <span>Hymns</span>
          </Link>
          
          <Link to="/mandala-wheel" className={dropdownItemClass('/mandala-wheel')} onMouseEnter={playHover} onClick={playClick}>
            <CircleDot size={20} />
            <span>Mandala Wheel</span>
          </Link>
          
          <Link to="/star-map" className={dropdownItemClass('/star-map')} onMouseEnter={playHover} onClick={playClick}>
            <Telescope size={20} />
            <span>RigVeda Observatory</span>
          </Link>
        </div>
      </div>,
      document.body
    );
  };

  // 📱 NEW: Mobile Menu Component
  const MobileMenu = () => {
    if (!isMobileMenuOpen) return null;

    return (
      <div className="md:hidden fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm">
        <div className="bg-[--color-parchment] w-[280px] h-full shadow-2xl overflow-y-auto">
          <div className="p-4 space-y-2">
            
            <Link to="/" className={mobileMenuItemClass('/')} onClick={playClick}>
              <Home size={20} />
              <span>HOME</span>
            </Link>

            {/* Explore section in mobile - show all links */}
            <div className="border-t border-[--color-gold]/20 pt-2 mt-2">
              <div className="px-4 py-2 text-sm font-semibold text-[--color-gold] opacity-70">
                EXPLORE
              </div>
              
              <Link to="/vedic-identity" className={mobileMenuItemClass('/vedic-identity')} onClick={playClick}>
                <User size={20} />
                <span>My Vedic Identity</span>
              </Link>
              
              <Link to="/deity-network" className={mobileMenuItemClass('/deity-network')} onClick={playClick}>
                <Network size={20} />
                <span>Deity Network</span>
              </Link>
              
              <Link to="/ask-rishi" className={mobileMenuItemClass('/ask-rishi')} onClick={playClick}>
                <MessageCircleQuestion size={20} />
                <span>Ask the Rishi</span>
              </Link>
              
              <Link to="/hymns" className={mobileMenuItemClass('/hymns')} onClick={playClick}>
                <Scroll size={20} />
                <span>Hymns</span>
              </Link>
              
              <Link to="/mandala-wheel" className={mobileMenuItemClass('/mandala-wheel')} onClick={playClick}>
                <CircleDot size={20} />
                <span>Mandala Wheel</span>
              </Link>
              
              <Link to="/star-map" className={mobileMenuItemClass('/star-map')} onClick={playClick}>
                <Telescope size={20} />
                <span>RigVeda Observatory</span>
              </Link>
            </div>

            <div className="border-t border-[--color-gold]/20 pt-2 mt-2">
              <Link to="/mandalas" className={mobileMenuItemClass('/mandalas')} onClick={playClick}>
                <BookText size={20} />
                <span>TEN MANDALAS</span>
              </Link>

              <Link to="/surprise-me" className={mobileMenuItemClass('/surprise-me')} onClick={playClick}>
                <Sparkles size={20} />
                <span>SURPRISE ME!</span>
              </Link>

              <Link to="/rigveda-on" className={mobileMenuItemClass('/rigveda-on')} onClick={playClick}>
                <BookOpen size={20} />
                <span>RIGVEDA ON...</span>
              </Link>

              <Link to="/games" className={mobileMenuItemClass('/games')} onClick={playClick}>
                <Gamepad2 size={20} />
                <span>GAMES</span>
              </Link>

              <Link to="/about" className={mobileMenuItemClass('/about')} onClick={playClick}>
                <Info size={20} />
                <span>ABOUT</span>
              </Link>
            </div>

            <div className="border-t border-[--color-gold]/20 pt-2 mt-2">
              <button
                onClick={() => {
                  playClick();
                  setIsSettingsOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className={mobileMenuItemClass('')}
              >
                <Settings size={20} />
                <span>SETTINGS</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[--color-parchment]/95 backdrop-blur-sm border-b-2 border-[--color-gold]/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between md:justify-center h-16 gap-2">
            
            {/* 📱 NEW: Mobile Hamburger Button (only shows on mobile) */}
            <button
              onClick={() => {
                playClick();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              onMouseEnter={playHover}
              className="md:hidden p-2.5 rounded-lg bg-[--color-gold]/20 text-[--color-gold] hover:bg-[--color-gold]/30 hover:shadow-[0_0_15px_rgba(218,165,32,0.4)] transition-all duration-300 border-2 border-[--color-gold]/40"
            >
              {isMobileMenuOpen ? <X size={26} strokeWidth={2.5} /> : <Menu size={26} strokeWidth={2.5} />}
            </button>

            {/* Desktop Navigation (hidden on mobile) */}
            <div className="hidden md:flex items-center gap-2">
              
              {/* HOME */}
              <Link to="/" className={navItemClass('/')} onMouseEnter={playHover} onClick={playClick}>
                <div className="flex items-center gap-2">
                  <Home size={20} />
                  <span className="hidden sm:inline">HOME</span>
                </div>
              </Link>

              {/* EXPLORE */}
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
                      : '!text-[#3d2f1f] hover:text-[--color-gold] hover:bg-[--color-gold]/5 hover:shadow-[0_0_20px_rgba(218,165,32,0.4)]'
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

              {/* TEN MANDALAS */}
              <Link to="/mandalas" className={navItemClass('/mandalas')} onMouseEnter={playHover} onClick={playClick}>
                <div className="flex items-center gap-2">
                  <BookText size={20} />
                  <span className="hidden sm:inline">TEN MANDALAS</span>
                </div>
              </Link>

              {/* SURPRISE ME */}
              <Link to="/surprise-me" className={navItemClass('/surprise-me')} onMouseEnter={playHover} onClick={playClick}>
                <div className="flex items-center gap-2">
                  <Sparkles size={20} />
                  <span className="hidden sm:inline">SURPRISE ME!</span>
                </div>
              </Link>

              {/* RIGVEDA ON... */}
              <Link to="/rigveda-on" className={navItemClass('/rigveda-on')} onMouseEnter={playHover} onClick={playClick}>
                <div className="flex items-center gap-2">
                  <BookOpen size={20} />
                  <span className="hidden sm:inline">RIGVEDA ON...</span>
                </div>
              </Link>

              {/* GAMES */}
              <Link to="/games" className={navItemClass('/games')} onMouseEnter={playHover} onClick={playClick}>
                <div className="flex items-center gap-2">
                  <Gamepad2 size={20} />
                  <span className="hidden sm:inline">GAMES</span>
                </div>
              </Link>

              {/* ABOUT */}
              <Link to="/about" className={navItemClass('/about')} onMouseEnter={playHover} onClick={playClick}>
                <div className="flex items-center gap-2">
                  <Info size={20} />
                  <span className="hidden sm:inline">ABOUT</span>
                </div>
              </Link>

              {/* SETTINGS BUTTON */}
              <button
                onClick={() => {
                  playClick();
                  setIsSettingsOpen(true);
                }}
                onMouseEnter={playHover}
                className="ml-2 p-2.5 rounded-lg font-semibold bg-[--color-parchment] text-[#3d2f1f] hover:bg-[--color-gold]/5 hover:text-[--color-gold] hover:shadow-[0_0_20px_rgba(218,165,32,0.4)] transition-all duration-300 ease-out"
                title="Audio Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>

            {/* 📱 NEW: Mobile Settings Button (top right) */}
            <button
              onClick={() => {
                playClick();
                setIsSettingsOpen(true);
              }}
              className="md:hidden p-2 rounded-lg text-[#3d2f1f] hover:text-[--color-gold] hover:bg-[--color-gold]/5 transition-all"
            >
              <Settings size={20} />
            </button>

          </div>
        </div>
      </nav>

      <DropdownPortal />
      <MobileMenu />
      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};

export default Navigation;
