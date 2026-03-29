import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ExternalLink, ChevronDown, CheckCircle2 } from 'lucide-react';

type Cert = {
  id: string;
  name: string;
  shortName: string;
  issuer: string;
  year: string;
  status: 'active' | 'in-progress' | 'planned';
  credentialId?: string;
  verifyUrl?: string;
  color: string;        // Tailwind bg class for accent
  accentHex: string;   // Used for box-shadow glow
  skills: string[];
  description: string;
};

const CERTS: Cert[] = [
  {
    id: 'ccna',
    name: 'Cisco Certified Network Associate',
    shortName: 'CCNA',
    issuer: 'Cisco',
    year: '2022',
    status: 'active',
    credentialId: 'CSCO-XXXXXXXX',
    verifyUrl: 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/index.html',
    color: 'bg-[#049fd8]/15',
    accentHex: '#049fd8',
    skills: ['IP Routing', 'Switching', 'OSPF', 'BGP Basics', 'VLANs', 'ACLs'],
    description: 'Foundation-level certification validating expertise in installing, configuring, and operating routed and switched networks.',
  },
  {
    id: 'mcsa',
    name: 'Microsoft Certified: Azure Administrator Associate',
    shortName: 'AZ-104',
    issuer: 'Microsoft',
    year: '2023',
    status: 'active',
    credentialId: 'MS-XXXXXXXX',
    verifyUrl: 'https://learn.microsoft.com/en-us/certifications/',
    color: 'bg-[#0078d4]/15',
    accentHex: '#0078d4',
    skills: ['Azure VMs', 'Virtual Networks', 'Storage', 'IAM', 'Monitoring', 'ARM Templates'],
    description: 'Validates expertise in implementing, managing, and monitoring an organization\'s Microsoft Azure environment.',
  },
  {
    id: 'security-plus',
    name: 'CompTIA Security+',
    shortName: 'Sec+',
    issuer: 'CompTIA',
    year: '2021',
    status: 'active',
    credentialId: 'COMP-XXXXXXXX',
    verifyUrl: 'https://www.comptia.org/certifications/security',
    color: 'bg-[#c8102e]/15',
    accentHex: '#c8102e',
    skills: ['Threat Analysis', 'PKI', 'Zero Trust', 'SIEM', 'IDS/IPS', 'Incident Response'],
    description: 'Industry-standard certification demonstrating baseline cybersecurity skills across threat management, cryptography, and identity.',
  },
  {
    id: 'vcp',
    name: 'VMware Certified Professional — Data Center Virtualization',
    shortName: 'VCP-DCV',
    issuer: 'VMware',
    year: '2022',
    status: 'active',
    credentialId: 'VMW-XXXXXXXX',
    verifyUrl: 'https://www.vmware.com/education-services/certification.html',
    color: 'bg-[#607078]/15',
    accentHex: '#607078',
    skills: ['ESXi', 'vCenter', 'vSAN', 'vMotion', 'HA/DRS', 'NSX Basics'],
    description: 'Validates skills in deploying, managing, and optimizing VMware vSphere infrastructure in data center environments.',
  },
  {
    id: 'fortinet-nse',
    name: 'Fortinet Network Security Expert — Level 4',
    shortName: 'NSE 4',
    issuer: 'Fortinet',
    year: '2023',
    status: 'active',
    credentialId: 'FNS-XXXXXXXX',
    verifyUrl: 'https://training.fortinet.com/',
    color: 'bg-[#ee3124]/15',
    accentHex: '#ee3124',
    skills: ['FortiGate', 'SD-WAN', 'SSL-VPN', 'IPS Policies', 'Log Analysis', 'HA Clustering'],
    description: 'Professional-level certification covering FortiGate firewall deployment, advanced policy configuration, and network security operations.',
  },
  {
    id: 'rhcsa',
    name: 'Red Hat Certified System Administrator',
    shortName: 'RHCSA',
    issuer: 'Red Hat',
    year: '2024',
    status: 'in-progress',
    color: 'bg-[#cc0000]/15',
    accentHex: '#cc0000',
    skills: ['RHEL', 'Systemd', 'SELinux', 'LVM', 'Networking', 'Bash Scripting'],
    description: 'Enterprise Linux administration certification covering core system skills including file systems, networking, security, and service management.',
  },
];

const STATUS_CONFIG = {
  active: {
    label: 'Active',
    dot: 'bg-[#27c93f]',
    text: 'text-[#27c93f]',
    ring: 'border-[#27c93f]/30',
  },
  'in-progress': {
    label: 'In Progress',
    dot: 'bg-[#ffbd2e] animate-pulse',
    text: 'text-[#ffbd2e]',
    ring: 'border-[#ffbd2e]/30',
  },
  planned: {
    label: 'Planned',
    dot: 'bg-outline',
    text: 'text-outline',
    ring: 'border-outline/20',
  },
};

function CertCard({ cert }: { cert: Cert }) {
  const [expanded, setExpanded] = useState(false);
  const status = STATUS_CONFIG[cert.status];

  return (
    <motion.div
      layout
      className="rounded-xl border border-outline-variant/10 bg-surface-container overflow-hidden hover:border-outline-variant/20 transition-colors"
      style={{
        boxShadow: expanded
          ? `0 0 0 1px ${cert.accentHex}22, 0 8px 40px ${cert.accentHex}15`
          : 'none',
      }}
    >
      {/* Card header — always visible */}
      <button
        className="w-full text-left p-5 flex items-start gap-4 group"
        onClick={() => setExpanded(e => !e)}
        aria-expanded={expanded}
      >
        {/* Icon accent block */}
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-lg ${cert.color} flex items-center justify-center border border-white/5`}
        >
          <Award
            className="w-6 h-6"
            style={{ color: cert.accentHex }}
          />
        </div>

        {/* Title area */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span
                  className="font-mono text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded"
                  style={{ background: `${cert.accentHex}20`, color: cert.accentHex }}
                >
                  {cert.shortName}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest border rounded-full px-2 py-0.5 ${status.text} ${status.ring}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                  {status.label}
                </span>
              </div>
              <h3 className="font-headline text-sm font-bold text-on-surface leading-tight mt-1 pr-4">
                {cert.name}
              </h3>
              <p className="font-mono text-[11px] text-outline mt-0.5">
                {cert.issuer} · {cert.year}
              </p>
            </div>

            {/* Expand chevron */}
            <ChevronDown
              className={`flex-shrink-0 w-4 h-4 text-outline transition-transform duration-200 mt-1 ${expanded ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
      </button>

      {/* Expandable detail panel */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0 border-t border-outline-variant/10 space-y-4">
              {/* Description */}
              <p className="text-on-surface-variant text-sm leading-relaxed pt-4">
                {cert.description}
              </p>

              {/* Skills covered */}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-outline mb-2">
                  Skills Covered
                </p>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map(skill => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant border border-outline-variant/10"
                    >
                      <CheckCircle2 className="w-3 h-3" style={{ color: cert.accentHex }} />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer: credential ID + verify link */}
              <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
                {cert.credentialId ? (
                  <p className="font-mono text-[11px] text-outline">
                    ID: <span className="text-on-surface-variant">{cert.credentialId}</span>
                  </p>
                ) : (
                  <span />
                )}
                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest transition-colors hover:opacity-80"
                    style={{ color: cert.accentHex }}
                    onClick={e => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3 h-3" />
                    Verify
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Certifications() {
  const active = CERTS.filter(c => c.status === 'active').length;
  const inProgress = CERTS.filter(c => c.status === 'in-progress').length;

  return (
    <section className="py-24 px-6 bg-surface" id="certifications">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 items-end">
          <div>
            <h2 className="font-headline text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-4">
              <span className="text-primary-container">04.</span> Certifications
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Industry credentials validating expertise across networking, security, cloud, and virtualization platforms. Click any card to expand details.
            </p>
          </div>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-4 md:justify-end">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-surface-container-low border border-outline-variant/10">
              <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
              <span className="font-mono text-sm text-on-surface-variant">
                <span className="text-on-surface font-bold">{active}</span> Active
              </span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-surface-container-low border border-outline-variant/10">
              <span className="w-2 h-2 rounded-full bg-[#ffbd2e] animate-pulse" />
              <span className="font-mono text-sm text-on-surface-variant">
                <span className="text-on-surface font-bold">{inProgress}</span> In Progress
              </span>
            </div>
          </div>
        </div>

        {/* Cert grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {CERTS.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.35 }}
            >
              <CertCard cert={cert} />
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="mt-8 text-center font-mono text-[11px] text-outline/50 uppercase tracking-widest">
          All credentials verifiable via issuer portals · Credential IDs on request
        </p>
      </div>
    </section>
  );
}
