export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20" id="hero">
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]"></div>
      <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 lg:col-span-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/10 border border-primary-container/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
            <span className="font-headline text-xs uppercase tracking-widest text-secondary">System Online</span>
          </div>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-none">
            <span className="block">Sukitha Bandara</span>
            <span className="block text-primary-container text-glow text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-4 font-bold tracking-normal">Network Engineer & Systems Architect</span>
          </h1>
          <p className="text-on-surface-variant max-w-xl text-lg mb-8 leading-relaxed">
            Specialized in Active Directory, Virtualization, Backup Solutions & Network Infrastructure.
          </p>
          <div className="flex flex-wrap gap-4">
            <a className="w-full sm:w-auto text-center px-8 py-4 bg-gradient-to-r from-primary-container to-secondary-container font-label font-bold uppercase tracking-widest text-sm rounded hover:brightness-110 transition-all text-white" href="#contact">
              Initialize Connection
            </a>
            <a className="w-full sm:w-auto text-center px-8 py-4 bg-transparent border border-outline-variant/30 font-label font-bold uppercase tracking-widest text-sm rounded hover:bg-primary/10 transition-all text-on-surface" href="#projects">
              View Matrix
            </a>
          </div>
        </div>
        <div className="md:col-span-5 lg:col-span-4 flex justify-center items-center mt-12 md:mt-0">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 animate-float">
            {/* Soft blue glow effect around the circle */}
            <div className="absolute inset-0 rounded-full bg-primary-container/30 blur-[50px] transform scale-110"></div>
            
            {/* Image container with subtle blue border */}
            <div className="relative w-full h-full rounded-full border-4 border-primary-container/40 shadow-[0_0_30px_rgba(0,112,243,0.5)] overflow-hidden bg-surface-container-low z-10">
              <img 
                src="/profile.png" 
                alt="Sukitha Bandara - Professional Profile" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to placeholder if image isn't uploaded yet
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop";
                }}
              />
              {/* Inner shadow for depth */}
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,112,243,0.3)] pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
