import { Terminal } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#131314]/70 backdrop-blur-xl shadow-[0_0_40px_rgba(174,198,255,0.05)] transition-opacity duration-300">
      <div className="flex justify-between items-center px-8 h-16 max-w-7xl mx-auto">
        <div className="text-xl font-bold tracking-tighter text-[#00d2fd]">SUKITHA BANDARA</div>
        <div className="hidden md:flex items-center gap-8 font-headline tracking-tight text-sm uppercase">
          <a className="text-[#00d2fd] font-bold border-b-2 border-[#0070f3] pb-1" href="#hero">Hero</a>
          <a className="text-[#e4e2e1]/60 hover:text-[#e4e2e1] transition-colors" href="#about">About</a>
          <a className="text-[#e4e2e1]/60 hover:text-[#e4e2e1] transition-colors" href="#expertise">Skills</a>
          <a className="text-[#e4e2e1]/60 hover:text-[#e4e2e1] transition-colors" href="#projects">Projects</a>
          <a className="text-[#e4e2e1]/60 hover:text-[#e4e2e1] transition-colors" href="#contact">Contact</a>
        </div>
        <div className="flex items-center gap-4">
          <Terminal className="text-[#0070f3] cursor-pointer hover:bg-blue-500/10 p-2 rounded-lg transition-all scale-95 active:scale-90 w-10 h-10" />
        </div>
      </div>
    </nav>
  );
}
