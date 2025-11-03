import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

export function Navbar() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      // Toggle class-based dark mode per article guidance
      document.body.classList.add('dark');
      // Keep data-theme for existing data-[theme=dark] selectors
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-pms-186 text-white data-[theme=dark]:bg-pms-123 data-[theme=dark]:text-black' : 'text-white hover:bg-white/10'}`;
  return (
    <nav className="bg-pms-2965 text-white data-[theme=dark]:bg-pms-425">
      <div className="container mx-auto px-4 py-3 flex items-center gap-6">
        <Link to="/" className="font-bold text-white text-lg">SkillTrack</Link>
        <div className="flex items-center gap-2">
          <NavLink to="/" className={navLinkClass} end>Dashboard</NavLink>
          <NavLink to="/catalog" className={navLinkClass}>Catalog</NavLink>
          <NavLink to="/tracks" className={navLinkClass}>Tracks</NavLink>
          <NavLink to="/badges" className={navLinkClass}>Badges</NavLink>
          <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>
          <NavLink to="/profile" className={navLinkClass}>Profile</NavLink>
        </div>
        <div className="ml-auto">
          {/* <button
            onClick={() => setIsDark((v) => !v)}
            aria-label="Toggle dark mode"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-white/30 hover:bg-white/10"
          >
            <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
            <span className="text-sm">{isDark ? 'Light' : 'Dark'}</span>
          </button> */}
        </div>
      </div>
    </nav>
  );
}
