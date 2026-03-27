import { Network, Shield, Server, RefreshCw, Cloud, Activity } from 'lucide-react';

export function Capabilities() {
  const capabilities = [
    {
      icon: <Network className="w-10 h-10 text-primary-container mb-6 block group-hover:scale-110 transition-transform" />,
      title: "Enterprise Networking",
      desc: "Designing and deploying robust LAN/WAN architectures using OSPF, BGP, and advanced switching protocols for mission-critical reliability."
    },
    {
      icon: <Shield className="w-10 h-10 text-primary-container mb-6 block group-hover:scale-110 transition-transform" />,
      title: "Information Security",
      desc: "Implementing perimeter defense with Next-Gen Firewalls, IDS/IPS systems, and zero-trust network access (ZTNA) frameworks."
    },
    {
      icon: <Server className="w-10 h-10 text-primary-container mb-6 block group-hover:scale-110 transition-transform" />,
      title: "System Administration",
      desc: "Expert lifecycle management of heterogeneous server environments, Active Directory forests, and distributed storage systems."
    },
    {
      icon: <RefreshCw className="w-10 h-10 text-primary-container mb-6 block group-hover:scale-110 transition-transform" />,
      title: "Infrastructure Automation",
      desc: "Harnessing Ansible, Terraform, and Python to transform manual hardware provisioning into repeatable, version-controlled code."
    },
    {
      icon: <Cloud className="w-10 h-10 text-primary-container mb-6 block group-hover:scale-110 transition-transform" />,
      title: "Cloud & Virtualization",
      desc: "Scaling workloads through VMware ESXi, Proxmox, and AWS/Azure hybrid deployments for maximum resource utilization."
    },
    {
      icon: <Activity className="w-10 h-10 text-primary-container mb-6 block group-hover:scale-110 transition-transform" />,
      title: "Monitoring & Logging",
      desc: "Observability stacks using Prometheus, Grafana, and ELK to provide real-time packet-level visibility and predictive alerts."
    }
  ];

  return (
    <section className="py-24 bg-surface-container-low px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-headline text-3xl font-bold mb-16 text-center">
          Strategic <span className="text-primary-container">Capabilities</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {capabilities.map((cap, index) => (
            <div key={index} className="p-8 rounded-xl bg-surface-container border border-outline-variant/10 hover:bg-surface-container-high transition-all group">
              {cap.icon}
              <h3 className="font-headline text-xl font-bold mb-4">{cap.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
