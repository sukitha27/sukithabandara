import { skills } from '../data';

export function About() {
  return (
    <section className="py-24 px-6 relative" id="about">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="font-headline text-3xl font-bold mb-8 flex items-center gap-4">
            <span className="text-primary-container">01.</span> Professional_Identity
          </h2>
          <div className="space-y-6 text-on-surface-variant leading-relaxed">
            <p>
              With over a decade of experience in the core of digital ecosystems, I specialize in the silent machinery that powers the world. My approach to infrastructure is rooted in the philosophy of <span className="text-on-surface">Immutable Infrastructure</span> and <span className="text-on-surface">Code-Defined Networks</span>.
            </p>
            <p>
              I don't just build systems; I engineer resilience. From designing complex BGP routing architectures for enterprise scale to automating the deployment of hybrid-cloud virtualization stacks, my mission is to ensure data flows with zero friction and absolute security.
            </p>
            <div className="pt-6">
              <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10 font-mono text-sm">
                <div className="flex gap-2 mb-2"><span className="text-error">●</span><span className="text-secondary">●</span><span className="text-primary">●</span></div>
                <p className="text-primary-container">$ uptime</p>
                <p className="text-on-surface">14:23:05 up 365 days, 14:02, 1 user, load average: 0.05, 0.03, 0.01</p>
                <p className="text-primary-container mt-2">$ whoami</p>
                <p className="text-on-surface">infrastructure_architect_v3.2</p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-8" id="expertise">
          <h3 className="font-headline text-xl font-bold mb-6 text-primary">Technical Proficiency</h3>
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span>
                    {skill.name}
                    <span className="inline-flex gap-2 ml-2 align-middle">
                      {skill.logos.map((logo, lIndex) => (
                        <img key={lIndex} alt={logo.name} className="tool-logo" src={logo.url} />
                      ))}
                    </span>
                  </span>
                  <span className="text-primary">{skill.percentage}%</span>
                </div>
                <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-primary-container" style={{ width: `${skill.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
