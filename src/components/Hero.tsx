export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20" id="hero">
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]"></div>
      <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/10 border border-primary-container/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
            <span className="font-headline text-xs uppercase tracking-widest text-secondary">System Online</span>
          </div>
          <h1 className="font-headline text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-none">
            <span className="block">Network Engineer</span>
            <span className="block text-primary-container text-glow">Infrastructure Builder</span>
            <span className="block text-surface-variant italic">Automation Enthusiast</span>
          </h1>
          <p className="text-on-surface-variant max-w-xl text-lg mb-8 leading-relaxed">
            Architecting high-availability digital environments. Specializing in zero-trust networking, software-defined infrastructure, and automated delivery pipelines.
          </p>
          <div className="flex flex-wrap gap-4">
            <a className="px-8 py-4 bg-gradient-to-r from-primary-container to-secondary-container font-label font-bold uppercase tracking-widest text-sm rounded hover:brightness-110 transition-all text-white" href="#contact">
              Initialize Connection
            </a>
            <a className="px-8 py-4 bg-transparent border border-outline-variant/30 font-label font-bold uppercase tracking-widest text-sm rounded hover:bg-primary/10 transition-all text-on-surface" href="#projects">
              View Matrix
            </a>
          </div>
        </div>
        <div className="md:col-span-4 hidden md:block">
          <div className="relative aspect-square rounded-2xl overflow-hidden border border-outline-variant/20 bg-surface-container-low shadow-2xl">
            <img className="w-full h-full object-cover opacity-60" alt="Close up of high-performance server rack with blue glowing fiber optic cables and cooling fans in dark data center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDe6d8xi_Eerb8e0wcTf5nZRtgDduufK85gs00SqB87icwaypR9tL7lfnNDcKUizltbbLzYNLJoD2DVgTJLwjifY3LXQBBQcnp5ZaL5HQY20BNEsS7VMJ7pvr7LlXI9MT8pluDTBVHuVwW63iBZd1YIR4Huq5G10Gu_LJzjl_gLUAKzawWnJ9VT9QxqVw6PxHBs6aIRLzt-eQc7tdZ_0EOIurVJk_bpxev8vRwiS6u7caOXTYEx2wJOd6kFfxFdLODjGJ-yRkJvwHu"/>
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
