export function Footer() {
  return (
    <footer className="bg-[#1b1c1c] w-full py-12 px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
        <div className="text-lg font-black text-[#00d2fd]">SUKITHA BANDARA</div>
        <div className="font-body text-xs tracking-widest uppercase text-[#e4e2e1]/40">
          © {new Date().getFullYear()} SUKITHA BANDARA // CONNECTION_ESTABLISHED
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          <a className="font-body text-xs tracking-widest uppercase text-[#e4e2e1]/40 hover:text-[#00d2fd] transition-colors" href="#">GitHub</a>
          <a className="font-body text-xs tracking-widest uppercase text-[#e4e2e1]/40 hover:text-[#00d2fd] transition-colors" href="#">LinkedIn</a>
          <a className="font-body text-xs tracking-widest uppercase text-[#e4e2e1]/40 hover:text-[#00d2fd] transition-colors" href="#">Documentation</a>
        </div>
      </div>
    </footer>
  );
}
