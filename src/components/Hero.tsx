import { Download, ArrowRight } from 'lucide-react';

export function Hero() {
  const handleDownloadCV = () => {
    // Create a link to the CV file — place your CV as /public/sukitha-bandara-cv.pdf
    const link = document.createElement('a');
    link.href = '/sukitha-bandara-cv.pdf';
    link.download = 'Sukitha_Bandara_CV.pdf';
    link.click();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20" id="hero">
      {/* Ambient glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-12 gap-12 items-center">
        {/* Left: text column */}
        <div className="md:col-span-7 lg:col-span-8">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/10 border border-primary-container/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
            <span className="font-headline text-xs uppercase tracking-widest text-secondary">
              System Online
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-none">
            <span className="block">Sukitha Bandara</span>
            <span className="block text-primary-container text-glow text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-4 font-bold tracking-normal">
              Network Engineer &amp; Systems Architect
            </span>
          </h1>

          <p className="text-on-surface-variant max-w-xl text-lg mb-10 leading-relaxed">
            Specialized in Active Directory, Virtualization, Backup Solutions &amp; Network Infrastructure.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            {/* Primary: Initialize Connection */}
            <a
              href="#contact"
              className="group w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-container to-secondary-container font-label font-bold uppercase tracking-widest text-sm rounded hover:brightness-110 transition-all text-white shadow-[0_0_20px_rgba(0,112,243,0.25)] hover:shadow-[0_0_30px_rgba(0,112,243,0.4)]"
            >
              Initialize Connection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary: View Matrix */}
            <a
              href="#projects"
              className="w-full sm:w-auto text-center px-8 py-4 bg-transparent border border-outline-variant/30 font-label font-bold uppercase tracking-widest text-sm rounded hover:bg-primary/10 transition-all text-on-surface"
            >
              View Matrix
            </a>

            {/* Tertiary: Download CV */}
            <button
              onClick={handleDownloadCV}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-surface-container-low border border-outline-variant/20 hover:border-primary-container/50 font-label font-bold uppercase tracking-widest text-sm rounded transition-all text-on-surface-variant hover:text-on-surface"
              aria-label="Download CV / Resume"
            >
              <Download className="w-4 h-4 text-primary-container group-hover:translate-y-0.5 transition-transform" />
              Download CV
            </button>
          </div>

          {/* Mini trust signals below CTA */}
          <div className="mt-10 flex flex-wrap gap-6 text-xs font-mono text-outline/60 uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-container" />
              48+ Projects
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
              2.5k Devices
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              10+ Years Exp.
            </span>
          </div>
        </div>

        {/* Right: profile image */}
        <div className="md:col-span-5 lg:col-span-4 flex justify-center items-center mt-12 md:mt-0">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 animate-float">
            {/* Glow halo */}
            <div className="absolute inset-0 rounded-full bg-primary-container/30 blur-[50px] transform scale-110" />

            {/* Image */}
            <div className="relative w-full h-full rounded-full border-4 border-primary-container/40 shadow-[0_0_30px_rgba(0,112,243,0.5)] overflow-hidden bg-surface-container-low z-10">
              <img
                src="/profile.png"
                alt="Sukitha Bandara — Network Engineer & Systems Architect"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop';
                }}
              />
              {/* Inner depth shadow */}
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,112,243,0.3)] pointer-events-none" />
            </div>

            {/* Floating badge — available */}
            <div className="absolute bottom-4 right-0 z-20 flex items-center gap-2 bg-[#0e0e0e]/90 border border-outline-variant/20 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#27c93f] animate-pulse" />
              <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
                Available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-30 animate-bounce">
        <div className="w-px h-8 bg-outline" />
        <span className="font-mono text-[10px] text-outline uppercase tracking-widest">Scroll</span>
      </div>
    </section>
  );
}
