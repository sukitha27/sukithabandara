import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';

const BOOT_LINES = [
  { text: 'BIOS v2.4.1 — Initializing POST sequence...', delay: 0 },
  { text: 'CPU: NET_ARCH_CORE @ 4.2GHz ✓', delay: 120 },
  { text: 'RAM: 32768 MB DDR5 ✓', delay: 220 },
  { text: 'NIC: eth0 — Link detected @ 10Gbps ✓', delay: 340 },
  { text: 'Loading kernel modules...', delay: 460 },
  { text: 'Mounting file systems... ✓', delay: 580 },
  { text: 'Starting network services...', delay: 700 },
  { text: '', delay: 820 },
  { text: '⚠  ROUTE LOOKUP FAILED', delay: 900, error: true },
  { text: '⚠  Destination: 0x404 — Host unreachable', delay: 1020, error: true },
  { text: '⚠  No route to host. Packet dropped.', delay: 1140, error: true },
  { text: '', delay: 1260 },
  { text: 'Initiating fallback protocol...', delay: 1380 },
  { text: 'Type "help" for available commands.', delay: 1500, dim: true },
];

const COMMANDS: Record<string, () => string | JSX.Element> = {
  help: () => (
    <span>
      Commands:{' '}
      <span className="text-[#00d2fd]">home</span>,{' '}
      <span className="text-[#00d2fd]">about</span>,{' '}
      <span className="text-[#00d2fd]">projects</span>,{' '}
      <span className="text-[#00d2fd]">contact</span>,{' '}
      <span className="text-[#00d2fd]">clear</span>
    </span>
  ),
  home:     () => { window.location.href = '/'; return 'Redirecting to /...'; },
  about:    () => { window.location.href = '/#about'; return 'Navigating to #about...'; },
  projects: () => { window.location.href = '/#projects'; return 'Navigating to #projects...'; },
  contact:  () => { window.location.href = '/#contact'; return 'Navigating to #contact...'; },
  whoami:   () => 'visitor@net_architect — guest session',
  pwd:      () => '/404/void/nowhere',
  ls:       () => '. .. lost+found/',
  date:     () => new Date().toString(),
  ping:     () => 'ping: connect: Network is unreachable (error 404)',
  clear:    () => '__CLEAR__',
};

type HistoryItem = { cmd: string; output: string | JSX.Element };

export function NotFound() {
  const [bootLines, setBootLines]       = useState<typeof BOOT_LINES>([]);
  const [bootDone, setBootDone]         = useState(false);
  const [history, setHistory]           = useState<HistoryItem[]>([]);
  const [input, setInput]               = useState('');
  const [blink, setBlink]               = useState(true);
  const inputRef  = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  /* Boot sequence */
  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setBootLines(prev => [...prev, line]);
        if (i === BOOT_LINES.length - 1) setBootDone(true);
      }, line.delay);
    });
  }, []);

  /* Cursor blink */
  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(t);
  }, []);

  /* Auto-scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [bootLines, history]);

  /* Focus input when boot done */
  useEffect(() => {
    if (bootDone) setTimeout(() => inputRef.current?.focus(), 100);
  }, [bootDone]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || !input.trim()) return;
    const cmd = input.trim().toLowerCase();
    const handler = COMMANDS[cmd];

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    const output = handler
      ? handler()
      : `zsh: command not found: ${cmd}`;

    setHistory(prev => [...prev, { cmd: input.trim(), output }]);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4 py-12 font-mono">
      {/* Glow blob */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0070f3]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-3xl relative z-10">
        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl overflow-hidden border border-white/8 shadow-[0_0_60px_rgba(0,0,0,0.8)]"
        >
          {/* Title bar */}
          <div className="bg-[#1f2020] px-4 py-3 flex items-center gap-3 border-b border-white/5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="flex-1 text-center flex items-center justify-center gap-2">
              <Terminal size={12} className="text-[#8b90a0]" />
              <span className="text-[11px] text-[#8b90a0] uppercase tracking-widest">
                bash — error@net_architect: ~
              </span>
            </div>
          </div>

          {/* Terminal body */}
          <div
            className="bg-[#0e0e0e] p-6 min-h-[420px] max-h-[60vh] overflow-y-auto terminal-scroll cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Boot sequence lines */}
            {bootLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
                className={`text-[13px] leading-relaxed mb-0.5 ${
                  line.error ? 'text-[#ff5f56]' :
                  line.dim   ? 'text-[#414754]' :
                               'text-[#8b90a0]'
                }`}
              >
                {line.text || '\u00A0'}
              </motion.div>
            ))}

            {/* Command history */}
            {history.map((item, i) => (
              <div key={i} className="mt-2">
                <div className="flex items-center gap-2 text-[13px]">
                  <span className="text-[#0070f3]">➜</span>
                  <span className="text-[#00d2fd]">~</span>
                  <span className="text-[#e4e2e1]">{item.cmd}</span>
                </div>
                <div className="text-[13px] text-[#8b90a0] pl-6 mt-0.5">{item.output}</div>
              </div>
            ))}

            {/* Input line */}
            {bootDone && (
              <div className="flex items-center gap-2 mt-3 text-[13px]">
                <span className="text-[#0070f3]">➜</span>
                <span className="text-[#00d2fd]">~</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  className="flex-1 bg-transparent outline-none text-[#e4e2e1] caret-transparent"
                  autoComplete="off"
                  spellCheck={false}
                />
                <span className={`w-2 h-4 bg-[#00d2fd] -ml-2 ${blink ? 'opacity-100' : 'opacity-0'}`} />
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </motion.div>

        {/* 404 label below terminal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-8 text-center"
        >
          <p className="text-[#414754] text-xs uppercase tracking-widest mb-3">
            error code: 0x404 — destination unreachable
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-widest text-white transition-all hover:brightness-110"
            style={{ background: 'linear-gradient(to right, #0070f3, #00d2fd)' }}
          >
            <Terminal size={14} />
            Return to base
          </a>
        </motion.div>
      </div>
    </div>
  );
}
