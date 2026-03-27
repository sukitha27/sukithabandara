export const projects = [
  {
    title: "Active Directory Lab",
    desc: "Multi-site Active Directory environment with GPO hardening, DNS replication, and Certificate Services integration.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-ZqY9nMzmHmL_mBceABWiAxlLyPpFvBfUqpoBTnLXlQmO0MZxLHvcSqiTVDKoYjJzV2HBHy6q7aSayMrIYWRVcgkudE07gqivl_N7OReq59tCLQAR70PaiALzKBW-P1vvbdGNzGbjJ4tJ5l08tFrOIfJzOm2ggaPb7j_RHZfWHDz2HAIn0g1mTrDuJzF0wBCUIIupqdzVqqS58qZGj6TqTGUTFhdxwMZAIf39QjsUpk8DXKX_M-IlnIb1KtAV_1329JDDLiKBrFFe",
    tags: ["Windows Server", "AD DS", "DNS"],
    file: "active_directory.md",
    content: "## Active Directory Lab\n\nThis project involved designing and implementing a multi-site Active Directory environment from the ground up.\n\n### Key Highlights:\n- **Forest & Domain Design:** Established a secure root domain with delegated child domains for regional offices.\n- **GPO Hardening:** Implemented CIS benchmarks via Group Policy Objects to secure endpoints and servers.\n- **DNS & DHCP:** Configured highly available DNS and DHCP failover clusters.\n- **PKI Integration:** Deployed Active Directory Certificate Services (AD CS) for internal TLS/SSL and smart card authentication.\n\n*Outcome:* A robust, scalable identity management foundation ready for enterprise workloads."
  },
  {
    title: "Hardened Perimeter",
    desc: "Open-source firewall deployment featuring HA-Proxy, Snort IDS/IPS, and WireGuard VPN for secure remote access.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4VSs_MIGIj0TOmib7DY_C7qkcf78NR4sMRhD6hFObC7dZsLq-erG1fbOIRp48VkFyMOM9B3OxL5cjdMCrLLqFCsB1Sho14-2tm97cuOqA02beCUwuUcOSWc9CBwSTFYFK7vDOUOs6sc6eK_qjwIyvd2_Q6WQeR6ZSonnBqCu3q8xt7bRCINYxUb14uFOY3ASgCEEbHvzQcRd5e1qb-Xmy0S2A1qtNtUeajfQVS8i1x18JU_4toVHZGbOkcaypbpL3xa82XrAoNOaF",
    tags: ["pfSense", "WireGuard", "IDS/IPS"],
    file: "perimeter_defense.md",
    content: "## Hardened Perimeter\n\nDesigned a comprehensive edge security solution using open-source technologies to protect internal networks.\n\n### Key Highlights:\n- **pfSense Deployment:** Configured high-availability pfSense firewalls with stateful packet inspection.\n- **IDS/IPS:** Integrated Snort for real-time traffic analysis and threat prevention.\n- **VPN Access:** Set up WireGuard for high-performance, secure remote access for employees.\n- **Load Balancing:** Utilized HA-Proxy for distributing traffic across internal web servers.\n\n*Outcome:* Significantly reduced attack surface and improved remote access throughput by 40%."
  },
  {
    title: "V-Cluster Stack",
    desc: "High-availability virtualization cluster with live migration capabilities and centralized storage management via iSCSI.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAvURn327X4M-y0pDAE8kJavT1-tUFe9ez3MTjfjxZZzroYB4rIemJIQvhlMXvPcmCCH22lQy3FHK5LerYtm0ppJGIwJlqCyz7kPEt-0U7UznosP0J1sEfjbeQYtgGgR46dDLR64hTtyIbAdl1OXYUYgu-BaXS6y2D5a2TmlY5IRn6ccDnQrF9FhvXjf6Kdx7VkpMvR953HQX-qn03kkwaTzF-XQWOJ-rIrjeE8kFdRegRAEzEFKajURe_SzbRwyrpDcGwdn3CFwoN",
    tags: ["Hyper-V", "Failover Clustering", "iSCSI"],
    file: "hyperv_stack.md",
    content: "## V-Cluster Stack\n\nBuilt a resilient virtualization cluster to host mission-critical applications with zero downtime tolerance.\n\n### Key Highlights:\n- **Hyper-V Clustering:** Deployed a 4-node Windows Server Hyper-V cluster.\n- **Storage Area Network:** Configured iSCSI targets with multipath I/O (MPIO) for redundant storage access.\n- **Live Migration:** Enabled seamless virtual machine migration across hosts for hardware maintenance.\n- **Resource Allocation:** Implemented dynamic memory and CPU QoS to ensure performance consistency.\n\n*Outcome:* Achieved 99.99% uptime for hosted services over a 12-month period."
  },
  {
    title: "Immutable Backups",
    desc: "Disaster recovery solution with 3-2-1 backup strategy, air-gapped repositories, and automated verification.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYwgmgIPP9WoQ8DyfCiGUOiYDX_m033yest2ojq3y4Fm8p9WnZ4Prj1UyIk6XMDyxzZTltfqBHGOALGGfyobARcD5YnYtP2SXrhmhOE89OLVEvamwRHmx8ndsRxOhJHserOAme5txxwWmQkeHIskdGGBTFGVgpaiivFWe6oi6zyTDRNo_PY4Xr5K3T6O57dyl04r6Wie7AaPiIcWAoLTvS4Zrt9p1awl4yzD2sRlGl-FRLU7qC5XTW8i_PaZtXiykE4ftemsnqgTlg",
    tags: ["Veeam", "Hardened Repo", "S3 Object Lock"],
    file: "veeam_backup.md",
    content: "## Immutable Backups\n\nEngineered a ransomware-resilient backup architecture following the 3-2-1 rule.\n\n### Key Highlights:\n- **Veeam Backup & Replication:** Centralized backup management for virtual and physical workloads.\n- **Linux Hardened Repository:** Deployed immutable local storage using XFS block cloning to prevent backup deletion.\n- **Cloud Tiering:** Integrated Amazon S3 with Object Lock for offsite, immutable retention.\n- **SureBackup:** Automated daily recovery verification to guarantee backup integrity.\n\n*Outcome:* Ensured data recoverability even in the event of a total administrative compromise."
  },
  {
    title: "Global Observability Hub",
    desc: "Unified monitoring dashboard tracking 500+ endpoints with predictive failure analytics and automated ticketing.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHQVxbbkHImZKdz0Ccw1o2-QTGvJ_hnzUV_v5vziMqhPb6RpBDymM-7wCU1oWqPg5EybRAekOZtit3DczCO5V6KNdvbiiObZua0f7IvuPp4A97c21XjWnGzgAoODrY72l-vPyaA2MmY0m4qf66uNXEbfyWUr_DIxYENX6vp-jjv2Asny6TvJImP36u3y2FDclhu6tpdznQm6Xn12zDJUeekNQKMVcEFm6v50FTalz_tjbKh3_kmMPntuLi8z-mF4iG512loUmTcqsX",
    tags: ["Zabbix", "Grafana", "SNMP"],
    file: "observability.md",
    content: "## Global Observability Hub\n\nCreated a unified monitoring and alerting platform for a heterogeneous IT environment.\n\n### Key Highlights:\n- **Zabbix Implementation:** Monitored over 500 endpoints including servers, switches, and firewalls via SNMP and agents.\n- **Grafana Dashboards:** Built custom, visually appealing dashboards for NOC and management teams.\n- **Predictive Analytics:** Configured baseline triggers to detect anomalies before they caused outages.\n- **Automated Ticketing:** Integrated alerts with Jira Service Desk for streamlined incident response.\n\n*Outcome:* Reduced Mean Time to Resolution (MTTR) by 35% and improved proactive issue detection."
  }
];

export const skills = [
  {
    name: "Networking & Routing",
    percentage: 95,
    logos: [
      { name: "Cisco", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2f5SgQwexbfSA91YvFd-k6PlTGlDaLWx1W9knDaI3gq2oHrxSj5YO-HSEuj4avG5xo00_uZHG5kvT8XAhaT0uHW1hTaXWS6reu0YAMazAWaClYknaxC95dzgrrng3RMCLZxD5RLdgmzg8HmBa1jq061BIXszEFbmFNc8J_GrSt70osemja2bmzhAAtiLsX7TPp4EYYh_GxXqVNFT4-GZjJ5jsv8X0TBp0cAC2sjdM9fCGMGqQJQbN_tihupNLEaTyeVTvsjXTYgx8" },
      { name: "Juniper", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNQVjqxYMvGsQz7sl44XmIKTYmTiUArWu_u7MKbqa_AEoO3FbtUwFxO_DSd6i4h-vFJK0aalISwCjuqqSr7xGYDUTP-3xSwSkw-y6V2DQuIFXSeZ5BHO7mmsuaXMbTDDqSRZhX-oHhoxct__MsnPbXKMryIYayrALLRa0nFtcCnkLyLncr9XwtGjKgl-ic9jHjgJNjYTKOz-UzSNhuuTDqObW_TggqxyPMGghcJHstMtPaIxE2enAxksDiXhfD6zvRa3JgHQjmOoqh" }
    ]
  },
  {
    name: "Virtualization (Hyper-V/VMware)",
    percentage: 90,
    logos: [
      { name: "VMware", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2skSW9payO6HOLNfAzz2VHd51bdVCzp2s5qu0_Kwnhn-gBMWS7LHvf2V-poWI5KNjCtpdibVSZ5K62ixJeDD8vcgoeUdYb8TvjOZeduuhkgEuj1SrDog165vptRNd-SFPru8lwC0kj-ahooHPHHBB4v_LebVmSmQ9WL0sCq9LjCr4Ivm3DbLfjBAV3mpQp3gvWXIi-OLP4M7Lq_onAQWfs0Uk_IZ_tyTHZvb6PT2PYKYY2ok4AMLEiw2CXlZRRnLIE9DmM65iqXbe" },
      { name: "Proxmox", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmOoxiyMoEaSZBvxXYOXokFHyTyJCbmlrMD61_snTk7zhJ7PCIT0rmFksRcEzKxc5BgGUhMW9FmjxECRpAxCzkNXMd3H0ivbYhx1KumRCDovPDP4fhHj743y6dtYtwZIduHzfZXh2gYCgrf2uNz0LoaQQlR_YOuLZXZrJD7s0D5ei7Rtq0-2HoQ60GmLKSnNCQQw7ZGaCmNnvEC_PB42xowcwNE-QVvgOKBEBLsgjKfzSUeF2stuexKzp2zT9FpShSZN-Q_sQRmuX1" }
    ]
  },
  {
    name: "Firewall & Security",
    percentage: 88,
    logos: [
      { name: "Fortinet", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIQFt2_JcfzR78384n-yY4oNGdXpXeCOWHOqts0nNXUxhyOZRQqIXj6ZO-Lz0b7UOVqF6NdPlJEBbcBcPzjjsEPgF-J0g_dQw1C6SoekmJu72AeyuHll3hwW3Y52BWy9NyEKXEE_lkeX9F7iwnJ-2KPxLxomCk2_6w3pvbIGbTSWHGB_ORp9JyjpbVDOBpbp_wvVRHcdoJ0_Ml9G7SV8o60XNFDAPDQPtNl2t5m3Ktb9O5qQH6_BJ_0gjns39XwT2WlA3PnFHlIXnJ" },
      { name: "pfSense", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQqTx_wy-79B2fPm4WFaO-d4ah8rVIp4U2ghWeFzYP9iyTTMYGie4aQalm8wa3D1gCCQEA-Jkg6jQU8EbSJHw56OSaMAiL00cLtlwZJiEkim9tIjgBpWgndNYK9tQbprLq4VnsvIZcuKf00ROiMEvMNSrhdS8sFR2k6NXemawJH9IpZ1TkOYWbQXOZERMmEKgNuaJOtoZD-qSkvtVxkxjeuIsVFp2sRmJ58c8kjnyxXpYkzoUb3colW9Z6Zh-NZzYVxGohPqgiQLO9" }
    ]
  },
  {
    name: "Infrastructure Automation",
    percentage: 82,
    logos: [
      { name: "Terraform", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBO3RZWngpt6OyCD6FdzAT03egx7cNXUahwKmwdc-ohJOvK8cV4wnM_eT6e3r9KiKXWq5h9rJqRuRkUjiF2lAw69AB7hIjQxMaIlQsjk4QOpcjh9Z_m3zaCvbr_Q34EtEmZ4iGrFuTIZ0G1iGoctZZsAEfXsEYAuPAWk-Y7OLKbB0o9yEBF6mBGFaSfn-Ct9i3fmZzj572-Fo6Qvph5TCR-5JUbezxdntjSfqCzJbUrzEXHeCH74Ie-35gF2IWXAtox7bJ2v8sjCA2j" },
      { name: "Ansible", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4xGsyWzLOXarcVLO9hdZrIntslYmndyxZe88bUoI40Pl71HSfJBH6NfD2gWMu6W9OVX8dOVaB-q8bHWO8aiCCAVN4Edfk1PAaVEFhOPJfyQvkDbor7PtMjTlwgWZVxMojgLA_5DPP1_i6SWS77NxPbsIpRU8W1Iu_ZjZre6qejXuRv7QJ_RXEojKI5tHevXr88L3FFzYuNeOWFDFdPfQeyQV45cUVY3MGfnU_w_RRpPt5WoHFhvJAu3_7jTt-HsE_3Xh6ZxWYm8KC" },
      { name: "Python", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAx0VUFOoaTRVnWPG8STE9fmwvxi4DHYXO3h9W1nCxbKnz-3L0KgFHZ_Le4gpg8Fcq2RhvUVgLnWKNnJAhTObDmZzKW83N3Zhdsup1OloodYz2sM6jqLKty994V2YqL3L-yvkXKI-dGDP8vyJRwrkAeRVIBUT_Dd_WqEaXH-zeYSlPFRrzniHhLF23bcAuILMhLMs7ANXYnAC94m8Wbb5JRfjBlUvag479YLbcoloHL3YRijHZfSoOT1INqDe5hKSN5cD3aUSazlM96" }
    ]
  },
  {
    name: "Linux/Windows Server Adm.",
    percentage: 92,
    logos: [
      { name: "Red Hat", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCM0KjyWhzhmaIYAF3grZfE8TZp2TL-qMpQAfUqX_S2npeDr1kyQgbOewhKNmhnJ1tqOPfqdi2SK-P8SCWJGlc-khYq6mm4sPY03ET9DRCqIkdlz5DwITgtu3nQqw3gfafLQE0vvMAcgfkbAMMVI2sUQRqsn1n_c0s44owKDXdS3ZztPZwtgHT0maeeY18HUsyAOmz4jxNztf1rpsMZodBQ7ukpILxrkQITaIWyfXDOYuxnM4imVtX29bznqKaWdntL-Od5zs3oxdN4" },
      { name: "Ubuntu", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDaKp7CzWwcAz0omWOwEmkN8kb0-gyWwaEaQMDAC8UmjUui53VHggS7u_OUyzhmBQrqc8UPpWiSpklFRU_R4MVmxyXC-0WwZoQocHDJ1u87raY0S6607KunziMFYE1vsEbRh5qW6ye8gQnu1ynlJTDX-HAIOcMZtYxFDSSMLHxF-egxs2l331lw93ayiqaSLo62v_NamTwdV6Ph9EkI2ZMCa28pFTMsml5CD14PaqredODCi_-eVZT2BBYCqxNmbyNSVpCMqVZlShrr" },
      { name: "Microsoft", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqgk4GbqmEWkMbHgLlLi0t--QeVZoX8vDhMFhiVmJilrF8v51VgdPIMy45JHB2l5SiDEF7-TBnFNfM1PyU7wONmPKpZNdzpL2qFruHoxASosrHWjvjX3NJZ08BIikYey3UHI52BAOLdWZTs5yIO7j-pqahvF9KY1cCociO6XZbVGqI2R09AK9TDdG05W_Gz8q4PKjk47dSibri3lawDQDILXJ-42GMHJokmQAX10DnlTXZZs17tmfIzdGcOTix9PTFw-qZHLoPqctV" }
    ]
  }
];
