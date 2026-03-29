import { useState, useEffect } from 'react';
import { Terminal, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const NAV_LINKS = [
  { label: 'Hero',     href: '#hero' },
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#expertise' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
];

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for shadow / blur intensity
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight active nav link via IntersectionObserver
  useEffect(() => {
    const sectionIds = NAV_LINKS.map(l => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    // small delay so the menu animates out before scroll
    setTimeout(() => {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300
          ${scrolled
            ? 'bg-[#131314]/90 backdrop-blur-xl shadow-[0_0_40px_rgba(174,198,255,0.07)]'
            : 'bg-[#131314]/70 backdrop-blur-xl'
          }`}
      >
        <div className="flex justify-between items-center px-6 md:px-8 h-16 max-w-7xl mx-auto">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            className="text-xl font-bold tracking-tighter text-[#00d2fd] hover:opacity-80 transition-opacity"
          >
            SUKITHA BANDARA
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 font-headline tracking-tight text-sm uppercase">
            {NAV_LINKS.map(link => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`relative transition-colors pb-1 ${
                    isActive
                      ? 'text-[#00d2fd] font-bold'
                      : 'text-[#e4e2e1]/60 hover:text-[#e4e2e1]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 -bottom-0.5 h-0.5 w-full bg-[#0070f3] rounded-full"
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right-side icons */}
          <div className="flex items-center gap-2">
            <Terminal className="text-[#0070f3] cursor-pointer hover:bg-blue-500/10 p-2 rounded-lg transition-all w-10 h-10 hidden md:flex" />

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden p-2 rounded-lg text-[#e4e2e1]/70 hover:text-[#e4e2e1] hover:bg-white/5 transition-all"
              onClick={() => setIsMobileOpen(prev => !prev)}
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#0e0e0e] border-l border-outline-variant/20 flex flex-col md:hidden shadow-2xl"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-outline-variant/10">
                <span className="font-mono text-[11px] text-outline uppercase tracking-widest">Navigation</span>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-headline text-sm uppercase tracking-wide transition-all
                        ${isActive
                          ? 'bg-primary-container/10 text-[#00d2fd] border border-primary-container/20'
                          : 'text-[#e4e2e1]/60 hover:text-[#e4e2e1] hover:bg-surface-container'
                        }`}
                    >
                      <span className="font-mono text-[10px] text-outline w-5 text-right">
                        0{i + 1}
                      </span>
                      {link.label}
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00d2fd]" />
                      )}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Drawer footer */}
              <div className="px-6 py-5 border-t border-outline-variant/10">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary-container to-secondary-container text-white font-label font-bold uppercase tracking-widest text-xs hover:brightness-110 transition-all"
                >
                  <Terminal size={14} />
                  Initialize Connection
                </a>
                <p className="text-center font-mono text-[10px] text-outline/40 mt-3">
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
