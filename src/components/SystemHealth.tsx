import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

/* ── Skeleton shimmer block ─────────────────────────────────────────────── */
function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`skeleton rounded ${className}`} />;
}

function CardSkeleton() {
  return (
    <div className="bg-[#111111] rounded-xl border border-[#222] p-5 flex flex-col h-64 shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-2.5 w-28" />
        <Skeleton className="h-2.5 w-16" />
      </div>
      <div className="flex-1 flex flex-col gap-3 justify-end">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
}

export function SystemHealth() {
  const [isReady, setIsReady]         = useState(false);
  const [throughput, setThroughput]   = useState([400, 300, 600, 800, 500, 700, 400, 600, 842]);
  const [load, setLoad]               = useState(42);
  const [latency, setLatency]         = useState(24);
  const [logs, setLogs]               = useState([
    { id: 1, time: '06:48:45', msg: 'sys.init() - OK' },
    { id: 2, time: '06:48:46', msg: 'net.connect(eth0) - ESTABLISHED' },
    { id: 3, time: '06:48:48', msg: 'auth.verify(token) - SUCCESS' },
  ]);
  const [dots, setDots] = useState<{ id: number; x: number; y: number; duration: number; delay: number }[]>([]);

  /* Simulate async data load — show skeletons for 1.4 s */
  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 1400);
    return () => clearTimeout(t);
  }, []);

  /* Live data updates */
  useEffect(() => {
    if (!isReady) return;
    const interval = setInterval(() => {
      setThroughput(prev => [...prev.slice(1), Math.floor(Math.random() * 400) + 400]);
      setLoad(Math.floor(Math.random() * 30) + 30);
      setLatency(Math.floor(Math.random() * 15) + 15);
      const msgs = ['tcp.handshake()', 'mem.alloc(1024)', 'disk.read(0x4A)', 'worker.spawn()'];
      const statuses = ['OK', 'SUCCESS', 'DONE'];
      setLogs(prev => [
        ...prev.slice(-6),
        {
          id: Date.now(),
          time: new Date().toLocaleTimeString('en-US', { hour12: false }),
          msg: `${msgs[Math.floor(Math.random() * msgs.length)]} - ${statuses[Math.floor(Math.random() * statuses.length)]}`,
        },
      ]);
    }, 2000);
    return () => clearInterval(interval);
  }, [isReady]);

  useEffect(() => {
    setDots(
      Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        duration: Math.random() * 2 + 1.5,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  const generatePath = (data: number[]) => {
    if (data.length === 0) return '';
    const W = 200, H = 100, max = 1000;
    const dx = W / (data.length - 1);
    let path = `M 0 ${H - (data[0] / max) * H}`;
    for (let i = 0; i < data.length - 1; i++) {
      const x1 = i * dx, y1 = H - (data[i] / max) * H;
      const x2 = (i + 1) * dx, y2 = H - (data[i + 1] / max) * H;
      const cx = (x1 + x2) / 2;
      path += ` C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`;
    }
    return path;
  };

  return (
    <section className="py-24 px-6 bg-[#0a0a0a] border-y border-white/5" id="health-dashboard">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-headline text-3xl font-bold mb-12 text-center text-white">
          Live <span className="text-[#3b82f6]">Telemetry</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {!isReady ? (
            /* ── Skeleton placeholders ── */
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            /* ── Live cards ── */
            <>
              {/* Card 1: Net Throughput */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}
                className="bg-[#111111] rounded-xl border border-[#222] p-5 flex flex-col h-64 shadow-2xl relative overflow-hidden"
              >
                <div className="flex justify-between items-center mb-4 relative z-10">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">NET_THROUGHPUT</span>
                  <span className="text-[10px] font-mono text-gray-400">{throughput[throughput.length - 1]} Mbps</span>
                </div>
                <div className="flex-1 relative mt-4 -mx-5 -mb-5">
                  <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0070f3" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#0070f3" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d={`${generatePath(throughput)} L 200 100 L 0 100 Z`} fill="url(#blueGrad)" />
                    <path d={generatePath(throughput)} fill="none" stroke="#0070f3" strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                      style={{ filter: 'drop-shadow(0px 0px 6px rgba(0,112,243,0.6))' }} />
                  </svg>
                </div>
              </motion.div>

              {/* Card 2: Server Load */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
                className="bg-[#111111] rounded-xl border border-[#222] p-5 flex flex-col h-64 shadow-2xl"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">SERVER_LOAD</span>
                  <span className="text-[10px] font-mono text-[#0070f3]">{load}%</span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center relative">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                      <rect x="20" y="20" width="60" height="60" rx="12" fill="none" stroke="#222" strokeWidth="3" />
                      <motion.rect x="20" y="20" width="60" height="60" rx="12"
                        fill="none" stroke="#0070f3" strokeWidth="3" strokeLinecap="round"
                        pathLength="100" strokeDasharray="25 75"
                        animate={{ strokeDashoffset: [100, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        style={{ filter: 'drop-shadow(0px 0px 6px rgba(0,112,243,0.6))' }}
                      />
                    </svg>
                    <span className="text-[#0070f3] font-mono text-xl">{load}</span>
                  </div>
                  <div className="w-full flex gap-1.5 mt-8 px-2">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i}
                        className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                          i <= Math.ceil(load / 20)
                            ? 'bg-[#0070f3] shadow-[0_0_8px_rgba(0,112,243,0.6)]'
                            : 'bg-[#222]'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Global Latency */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
                className="bg-[#111111] rounded-xl border border-[#222] p-5 flex flex-col h-64 shadow-2xl"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">GLOBAL_LATENCY</span>
                  <span className="text-[10px] font-mono text-gray-400">avg {latency}ms</span>
                </div>
                <div className="flex-1 relative mt-2 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] overflow-hidden">
                  {dots.map(dot => (
                    <motion.div key={dot.id}
                      className="absolute w-2 h-2 bg-[#0070f3] rounded-full"
                      style={{ left: `${dot.x}%`, top: `${dot.y}%`, filter: 'drop-shadow(0px 0px 6px rgba(0,112,243,0.8))' }}
                      animate={{ opacity: [0.1, 1, 0.1], scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: dot.duration, repeat: Infinity, delay: dot.delay }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Card 4: System Logs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}
                className="bg-[#111111] rounded-xl border border-[#222] flex flex-col h-64 shadow-2xl overflow-hidden"
              >
                <div className="flex justify-between items-center bg-[#1a1a1a] px-4 py-3 border-b border-[#222]">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">SYSTEM_LOGS</span>
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#ffb86c]" />
                    <div className="w-2 h-2 rounded-full bg-[#8be9fd]" />
                  </div>
                </div>
                <div className="flex-1 p-4 font-mono text-[10px] text-gray-500 flex flex-col justify-end overflow-hidden space-y-2 bg-[#0a0a0a]">
                  {logs.map(log => (
                    <motion.div key={log.id}
                      initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
                      className="break-words">
                      <span className="text-gray-600">[{log.time}]</span>{' '}
                      <span className="text-gray-400">{log.msg}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
