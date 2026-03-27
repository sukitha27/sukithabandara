import { AtSign, Share2, Send } from 'lucide-react';

export function Contact() {
  return (
    <section className="py-24 px-6 bg-surface-container-low overflow-hidden" id="contact">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 relative">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-container/5 rounded-full blur-[100px]"></div>
        <div className="relative z-10">
          <h2 className="font-headline text-5xl font-black mb-6 tracking-tighter">
            Establish<br /><span className="text-primary">Connection</span>
          </h2>
          <p className="text-on-surface-variant mb-12 text-lg">
            Interested in scaling your infrastructure or securing your network? Send a packet my way.
          </p>
          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 rounded bg-surface-container-highest flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-surface transition-colors">
                <AtSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-outline">Primary Protocol</p>
                <p className="font-bold text-lg">admin@net-architect.io</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 rounded bg-surface-container-highest flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-surface transition-colors">
                <Share2 className="w-6 h-6" />
              </div>
              <div className="flex gap-4">
                <a className="text-on-surface-variant hover:text-primary transition-colors font-bold uppercase tracking-widest text-sm" href="#">LinkedIn</a>
                <span className="text-outline-variant">/</span>
                <a className="text-on-surface-variant hover:text-primary transition-colors font-bold uppercase tracking-widest text-sm" href="#">GitHub</a>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 glass-panel p-8 rounded-xl border border-outline-variant/20">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-outline mb-2 font-bold">Source Identifier</label>
              <input className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant/30 focus:border-secondary transition-all focus:ring-0 text-on-surface placeholder:text-outline/30 py-4" placeholder="Your Name" type="text" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-outline mb-2 font-bold">Return Address</label>
              <input className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant/30 focus:border-secondary transition-all focus:ring-0 text-on-surface placeholder:text-outline/30 py-4" placeholder="Email@domain.com" type="email" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-outline mb-2 font-bold">Data Payload</label>
              <textarea className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant/30 focus:border-secondary transition-all focus:ring-0 text-on-surface placeholder:text-outline/30 py-4 resize-none" placeholder="Brief project scope or message..." rows={4}></textarea>
            </div>
            <button className="w-full py-4 bg-primary-container text-white font-label font-bold uppercase tracking-widest text-sm rounded hover:shadow-[0_0_20px_rgba(0,112,243,0.3)] transition-all flex items-center justify-center gap-2" type="submit">
              Transmit Data <Send className="w-4 h-4 ml-2" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
