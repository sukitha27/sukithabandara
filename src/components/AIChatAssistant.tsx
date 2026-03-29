import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Bot, User, Minimize2, Maximize2, Terminal } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// ─── Portfolio context injected into every conversation ──────────────────────
const SYSTEM_PROMPT = `You are an AI assistant embedded in Sukitha Bandara's portfolio website. You represent Sukitha and answer questions about his professional background, skills, projects, and experience in a knowledgeable, concise, and professional manner. Use a confident but friendly tone — like a senior engineer talking to a potential collaborator.

ABOUT SUKITHA:
- Senior Network Engineer & Systems Architect based in Sri Lanka
- 10+ years of experience in enterprise IT infrastructure
- Specializes in: Active Directory, Virtualization (Hyper-V / VMware / Proxmox), Backup Solutions (Veeam), Network Infrastructure (Cisco, Juniper, Fortinet), and Infrastructure Automation (Ansible, Terraform, Python)

SKILLS & PROFICIENCY:
- Networking & Routing (BGP, OSPF, LAN/WAN): 95%
- Linux & Windows Server Administration: 92%
- Virtualization (Hyper-V, VMware ESXi, Proxmox): 90%
- Firewall & Security (Fortinet, pfSense, Snort IDS/IPS): 88%
- Infrastructure Automation (Ansible, Terraform, Python): 82%

KEY STATS:
- 48+ Projects Completed
- 2,500+ Devices Managed
- 120+ Servers Deployed
- 15 Labs Built

NOTABLE PROJECTS:
1. Active Directory Lab — Multi-site AD with GPO hardening, DNS replication, AD CS (certificate services). Built a secure root domain with delegated child domains for regional offices.
2. Hardened Perimeter — pfSense HA firewalls, Snort IDS/IPS, WireGuard VPN, HA-Proxy load balancing. Reduced attack surface and improved remote access throughput by 40%.
3. V-Cluster Stack — 4-node Hyper-V failover cluster with iSCSI SAN and MPIO. Achieved 99.99% uptime over 12 months.
4. Immutable Backups — Veeam Backup & Replication with Linux hardened repository, S3 Object Lock, and SureBackup automated verification. Ransomware-resilient 3-2-1 strategy.
5. Global Observability Hub — Zabbix + Grafana monitoring 500+ endpoints. Reduced MTTR by 35%.

CONTACT:
- Email: sukithabandara13@gmail.com
- LinkedIn and GitHub available on the portfolio site

GUIDELINES:
- Answer questions about his work, skills, availability, and background.
- If asked something unrelated to Sukitha or his portfolio, politely redirect: "I'm here to answer questions about Sukitha's work and expertise. Is there something specific about his background or projects I can help with?"
- Keep answers concise — 2-4 sentences unless a detailed breakdown is asked for.
- Never make up certifications, clients, or facts not listed above.
- You may say "I don't have that specific detail, but you can reach Sukitha directly at sukithabandara13@gmail.com" if unsure.`;

// ─── Types ───────────────────────────────────────────────────────────────────
type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
};

type ChatState = 'idle' | 'loading' | 'error';

// ─── Suggested questions shown on first open ─────────────────────────────────
const SUGGESTIONS = [
  "What are Sukitha's core skills?",
  "Tell me about the Hyper-V cluster project",
  "What networking protocols does he work with?",
  "How can I contact Sukitha?",
];

// ─── Main Component ───────────────────────────────────────────────────────────
export function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [chatState, setChatState] = useState<ChatState>('idle');
  const [unreadCount, setUnreadCount] = useState(0);
  const [hasOpened, setHasOpened] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setUnreadCount(0);
    }
  }, [isOpen]);

  // Show greeting after a delay
  useEffect(() => {
    if (isOpen && !hasOpened) {
      setHasOpened(true);
      const greeting: Message = {
        id: 'greeting',
        role: 'assistant',
        content: "Hi! I'm Sukitha's AI assistant. Ask me anything about his skills, projects, or experience — or use one of the suggestions below to get started.",
      };
      setMessages([greeting]);
    }
  }, [isOpen, hasOpened]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || chatState === 'loading') return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: trimmed,
    };

    const assistantMsgId = `a-${Date.now()}`;
    const assistantMsg: Message = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      isStreaming: true,
    };

    setMessages(prev => [...prev, userMsg, assistantMsg]);
    setInput('');
    setChatState('loading');

    try {
      // Build conversation history for the API (exclude greeting)
      const history = messages
        .filter(m => m.id !== 'greeting')
        .map(m => ({ role: m.role, content: m.content }));

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: [...history, { role: 'user', content: trimmed }],
          stream: true,
        }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();
              if (data === '[DONE]') continue;
              try {
                const parsed = JSON.parse(data);
                if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                  accumulated += parsed.delta.text;
                  setMessages(prev =>
                    prev.map(m =>
                      m.id === assistantMsgId
                        ? { ...m, content: accumulated }
                        : m
                    )
                  );
                }
              } catch {
                // skip malformed SSE lines
              }
            }
          }
        }
      }

      setMessages(prev =>
        prev.map(m =>
          m.id === assistantMsgId ? { ...m, isStreaming: false } : m
        )
      );

      // Bump unread if minimized
      if (!isOpen) setUnreadCount(c => c + 1);
    } catch (err) {
      console.error(err);
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantMsgId
            ? {
                ...m,
                content: "Sorry, I couldn't connect right now. Please try again or reach Sukitha directly at sukithabandara13@gmail.com",
                isStreaming: false,
              }
            : m
        )
      );
      setChatState('error');
    } finally {
      setChatState('idle');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-50 group"
            aria-label="Open AI Chat"
          >
            <div className="relative flex items-center gap-3 pl-4 pr-5 py-3 bg-[#0e0e0e] border border-primary-container/40 rounded-full shadow-[0_0_20px_rgba(0,112,243,0.25)] hover:shadow-[0_0_30px_rgba(0,112,243,0.4)] hover:border-primary-container/70 transition-all duration-300">
              {/* Pulsing dot */}
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-secondary-container" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-secondary-container animate-ping opacity-60" />
              </div>
              <span className="font-mono text-xs text-on-surface-variant group-hover:text-on-surface transition-colors">
                Ask AI
              </span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary-container text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: 'spring', damping: 24, stiffness: 300 }}
            className={`fixed z-50 flex flex-col bg-[#0e0e0e] border border-outline-variant/20 rounded-2xl shadow-[0_8px_60px_rgba(0,0,0,0.7)] overflow-hidden transition-all duration-300
              ${isMaximized
                ? 'inset-4 md:inset-8'
                : 'bottom-6 left-6 md:bottom-8 md:left-8 w-[calc(100vw-3rem)] max-w-sm md:max-w-md'
              }`}
            style={{ maxHeight: isMaximized ? undefined : '70vh' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#131314] border-b border-outline-variant/10 flex-shrink-0">
              <div className="flex gap-1.5">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-110 transition-all"
                  aria-label="Close"
                />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex-1 text-center">
                <span className="font-mono text-[11px] text-outline tracking-widest uppercase">
                  ai_assistant — sukitha.portfolio
                </span>
              </div>
              <button
                onClick={() => setIsMaximized(m => !m)}
                className="text-outline hover:text-on-surface transition-colors p-1"
                aria-label={isMaximized ? 'Minimize' : 'Maximize'}
              >
                {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 terminal-scroll">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full gap-3 py-8 text-center">
                  <Terminal className="w-10 h-10 text-primary-container opacity-40" />
                  <p className="text-on-surface-variant text-sm font-mono">
                    Loading assistant...
                  </p>
                </div>
              )}

              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs
                    ${msg.role === 'assistant'
                      ? 'bg-primary-container/20 border border-primary-container/30 text-primary-container'
                      : 'bg-secondary/20 border border-secondary/30 text-secondary'
                    }`}
                  >
                    {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed
                      ${msg.role === 'assistant'
                        ? 'bg-surface-container text-on-surface-variant rounded-tl-sm'
                        : 'bg-primary-container/15 border border-primary-container/20 text-on-surface rounded-tr-sm'
                      }`}
                  >
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-invert prose-sm max-w-none prose-p:my-1 prose-p:leading-relaxed prose-headings:text-on-surface prose-strong:text-on-surface">
                        <ReactMarkdown>{msg.content || ' '}</ReactMarkdown>
                        {msg.isStreaming && msg.content && (
                          <span className="inline-block w-1.5 h-4 bg-primary-container ml-0.5 animate-pulse align-middle" />
                        )}
                      </div>
                    ) : (
                      <p>{msg.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator when streaming starts */}
              {chatState === 'loading' && messages[messages.length - 1]?.content === '' && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary-container/20 border border-primary-container/30 flex items-center justify-center">
                    <Bot size={14} className="text-primary-container" />
                  </div>
                  <div className="bg-surface-container rounded-xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-outline animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Suggestions (shown only at start) */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex-shrink-0">
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map(s => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-[11px] font-mono px-2.5 py-1.5 rounded-lg border border-outline-variant/20 text-on-surface-variant hover:border-primary-container/40 hover:text-on-surface hover:bg-surface-container transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input bar */}
            <div className="flex-shrink-0 border-t border-outline-variant/10 bg-[#131314] px-3 py-3">
              <div className="flex items-center gap-2 bg-surface-container-lowest rounded-xl px-3 py-2 border border-outline-variant/15 focus-within:border-primary-container/40 transition-colors">
                <span className="font-mono text-primary-container text-xs select-none">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Sukitha's experience..."
                  disabled={chatState === 'loading'}
                  className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-outline/40 outline-none font-mono disabled:opacity-50"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || chatState === 'loading'}
                  className="w-7 h-7 rounded-lg bg-primary-container flex items-center justify-center disabled:opacity-30 hover:brightness-110 transition-all flex-shrink-0"
                  aria-label="Send"
                >
                  <Send size={13} className="text-white" />
                </button>
              </div>
              <p className="text-[10px] text-outline/40 font-mono mt-1.5 text-center">
                Powered by Claude · Press Enter to send
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
