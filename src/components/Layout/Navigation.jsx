import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/deity-network', label: 'Deity Network', icon: '🕸️' },
    { path: '/rigveda-on', label: 'Rig Veda On...', icon: '📚' },
    { path: '/surprise-me', label: 'Surprise Me!', icon: '✨' },
    { path: '/ask-rishi', label: 'Ask the Rishi', icon: '💬' },
    { path: '/mandalas', label: 'Ten Mandalas', icon: '📖' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
  ];

  return (
    <nav className="bg-[--color-parchment-dark] border-b-4 border-[--color-gold]/30 shadow-lg sticky top-0 z-50">
      <ul className="flex flex-wrap justify-center gap-2 md:gap-4 p-4 max-w-7xl mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`
                  flex items-center gap-2 px-3 md:px-4 py-2 
                  font-[family:--font-family-body] rounded-md 
                  transition-all duration-200
                  ${isActive 
                    ? 'bg-[--color-gold] text-[--color-ink] shadow-md' 
                    : 'text-[--color-ink] hover:text-[--color-gold] hover:bg-[--color-parchment-light]'
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm md:text-base hidden sm:inline">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
