export function Stats() {
  return (
    <section className="py-12 bg-surface-container-lowest border-y border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center md:text-left">
            <div className="font-headline text-4xl font-bold text-primary mb-1">48+</div>
            <div className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Projects Completed</div>
          </div>
          <div className="text-center md:text-left">
            <div className="font-headline text-4xl font-bold text-primary mb-1">2.5k</div>
            <div className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Devices Managed</div>
          </div>
          <div className="text-center md:text-left">
            <div className="font-headline text-4xl font-bold text-primary mb-1">120+</div>
            <div className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Servers Deployed</div>
          </div>
          <div className="text-center md:text-left">
            <div className="font-headline text-4xl font-bold text-primary mb-1">15</div>
            <div className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Labs Built</div>
          </div>
        </div>
      </div>
    </section>
  );
}
