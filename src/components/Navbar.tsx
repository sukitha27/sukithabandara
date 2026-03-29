import { useState, useEffect } from 'react';
import { Terminal, Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = [
  { label: 'Hero',            href: '#hero' },
  { label: 'About',           href: '#about' },
  { label: 'Skills',          href: '#expertise' },
  { label: 'Certifications',  href: '#certifications' },
  { label: 'Projects',        href: '#projects' },
  { label: 'Contact',         href: '#contact' },
];

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled]           = useState(false);
  const { theme, toggleTheme }            = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1));
    const observers: IntersectionObserver[] = [];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  const logoColor      = isDark ? '#00d2fd' : '#0050b3';
  const linkActive     = isDark ? '#00d2fd' : '#0050b3';
  const linkInactive   = isDark ? 'rgba(228,226,225,0.6)' : 'rgba(17,18,20,0.55)';
  const linkHover      = isDark ? '#e4e2e1' : '#111214';
  const underlineColor = '#0070f3';
  const navBg = scrolled
    ? isDark ? 'rgba(19,19,20,0.92)' : 'rgba(255,255,255,0.92)'
    : isDark ? 'rgba(19,19,20,0.70)' : 'rgba(255,255,255,0.70)';

  return (
    <>
      <nav
        className="fixed top-0 w-full z-50 backdrop-blur-xl"
        style={{
          backgroundColor: navBg,
          boxShadow: scrolled
            ? isDark ? '0 0 40px rgba(174,198,255,0.07)' : '0 1px 20px rgba(0,0,0,0.08)'
            : 'none',
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        <div className="flex justify-between items-center px-6 md:px-8 h-16 max-w-7xl mx-auto">
          <a
            href="#hero"
            onClick={e => { e.preventDefault(); handleNavClick('#hero'); }}
            className="text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity"
            style={{ color: logoColor }}
          >
            SUKITHA BANDARA
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7 font-headline tracking-tight text-sm uppercase">
            {NAV_LINKS.map(link => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => { e.preventDefault(); handleNavClick(link.href); }}
                  className="relative pb-1 font-bold"
                  style={{ color: isActive ? linkActive : linkInactive }}
                  onMouseEnter={e => { if (!isActive) (e.target as HTMLElement).style.color = linkHover; }}
                  onMouseLeave={e => { if (!isActive) (e.target as HTMLElement).style.color = linkInactive; }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 -bottom-0.5 h-0.5 w-full rounded-full"
                      style={{ backgroundColor: underlineColor }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-1">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.span key="sun"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <Sun size={18} color="#ffbd2e" />
                  </motion.span>
                ) : (
                  <motion.span key="moon"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <Moon size={18} color="#0050b3" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button className="hidden md:flex p-2 rounded-lg hover:bg-blue-500/10 transition-colors">
              <Terminal size={18} color="#0070f3" />
            </button>

            {/* Hamburger */}
            <button
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: isDark ? 'rgba(228,226,225,0.7)' : 'rgba(17,18,20,0.6)' }}
              onClick={() => setIsMobileOpen(p => !p)}
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileOpen ? (
                  <motion.span key="x"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span key="menu"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div key="drawer"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col md:hidden shadow-2xl border-l"
              style={{
                backgroundColor: isDark ? '#0e0e0e' : '#ffffff',
                borderColor: isDark ? 'rgba(65,71,84,0.2)' : 'rgba(0,0,0,0.08)',
              }}
            >
              <div className="flex items-center justify-between px-6 h-16 border-b"
                style={{ borderColor: isDark ? 'rgba(65,71,84,0.15)' : 'rgba(0,0,0,0.06)' }}>
                <span className="font-mono text-[11px] uppercase tracking-widest"
                  style={{ color: isDark ? '#8b90a0' : '#6b7280' }}>Navigation</span>
                <div className="flex items-center gap-1">
                  <button onClick={toggleTheme} className="p-1.5 rounded-lg"
                    style={{ color: isDark ? '#ffbd2e' : '#0050b3' }}
                    aria-label="Toggle theme">
                    {isDark ? <Sun size={16} /> : <Moon size={16} />}
                  </button>
                  <button onClick={() => setIsMobileOpen(false)} className="p-1.5 rounded-lg"
                    style={{ color: isDark ? '#c1c6d7' : '#3a3d4a' }}
                    aria-label="Close menu">
                    <X size={18} />
                  </button>
                </div>
              </div>

              <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <motion.a key={link.href} href={link.href}
                      onClick={e => { e.preventDefault(); handleNavClick(link.href); }}
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-center gap-4 px-4 py-3.5 rounded-xl font-headline text-sm uppercase tracking-wide border"
                      style={{
                        backgroundColor: isActive
                          ? isDark ? 'rgba(0,112,243,0.1)' : 'rgba(0,112,243,0.07)'
                          : 'transparent',
                        color: isActive ? linkActive : linkInactive,
                        borderColor: isActive
                          ? isDark ? 'rgba(0,112,243,0.2)' : 'rgba(0,112,243,0.15)'
                          : 'transparent',
                      }}
                    >
                      <span className="font-mono text-[10px] w-5 text-right"
                        style={{ color: isDark ? '#8b90a0' : '#9ca3af' }}>0{i + 1}</span>
                      {link.label}
                      {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: linkActive }} />}
                    </motion.a>
                  );
                })}
              </nav>

              <div className="px-6 py-5 border-t"
                style={{ borderColor: isDark ? 'rgba(65,71,84,0.15)' : 'rgba(0,0,0,0.06)' }}>
                <a href="#contact"
                  onClick={e => { e.preventDefault(); handleNavClick('#contact'); }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-label font-bold uppercase tracking-widest text-xs text-white hover:brightness-110 transition-all"
                  style={{ background: 'linear-gradient(to right, #0070f3, #00d2fd)' }}>
                  <Terminal size={14} />
                  Initialize Connection
                </a>
                <p className="text-center font-mono text-[10px] mt-3"
                  style={{ color: isDark ? 'rgba(139,144,160,0.5)' : 'rgba(107,114,128,0.6)' }}>
                  © {new Date().getFullYear()} SUKITHA BANDARA
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
