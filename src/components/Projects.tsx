import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { projects } from '../data';

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<{cmd: string, output: string | React.ReactNode}[]>([]);
  const [inputValue, setInputValue] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const activeProject = projects[activeIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const cmd = inputValue.trim();
      const args = cmd.split(' ');
      const mainCmd = args[0].toLowerCase();
      let output: string | React.ReactNode = '';

      switch (mainCmd) {
        case 'help':
          output = (
            <div className="space-y-1">
              <p>Available commands:</p>
              <p>- <span className="text-primary-container font-bold">ls</span> or <span className="text-primary-container font-bold">projects</span>: List available project files</p>
              <p>- <span className="text-primary-container font-bold">cat [filename]</span>: Display project details</p>
              <p>- <span className="text-primary-container font-bold">whoami</span>: System identity</p>
              <p>- <span className="text-primary-container font-bold">uptime</span>: Current system uptime</p>
              <p>- <span className="text-primary-container font-bold">clear</span>: Clear terminal history</p>
              <p>- <span className="text-primary-container font-bold">help</span>: Show this menu</p>
            </div>
          );
          break;
        case 'whoami':
          output = "INFRA_ARCHITECT_V3.2: Senior Systems Engineer specializing in automated high-availability environments. Current focus: Zero-Trust Networking and Infrastructure-as-Code.";
          break;
        case 'uptime':
          output = "up 365 days, 14:02, 1 user, load average: 0.05, 0.03, 0.01";
          break;
        case 'clear':
          setTerminalHistory([]);
          setInputValue('');
          return;
        case 'ls':
        case 'projects':
          output = (
            <div className="space-y-1">
              {projects.map(p => <p key={p.file}>{p.file}</p>)}
            </div>
          );
          break;
        case 'cat':
          if (args.length > 1) {
            const filename = args[1];
            const projectIndex = projects.findIndex(p => p.file.toLowerCase() === filename.toLowerCase());
            if (projectIndex !== -1) {
              setActiveIndex(projectIndex);
              output = `Opening ${filename}...`;
            } else {
              output = `cat: ${filename}: No such file or directory`;
            }
          } else {
            output = "cat: missing operand";
          }
          break;
        default:
          output = `zsh: command not found: ${mainCmd}`;
      }

      setTerminalHistory(prev => [...prev, { cmd, output }]);
      setInputValue('');
    }
  };

  return (
    <section className="py-24 px-6 bg-surface" id="projects">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="font-headline text-4xl font-bold mb-4">Project_Terminal</h2>
          <p className="text-on-surface-variant">Querying system artifacts from the engineering archives.</p>
        </div>
        <div className="bg-[#0e0e0e] rounded-xl overflow-hidden border border-outline-variant/20 shadow-2xl flex flex-col h-[700px]">
          {/* Terminal Header */}
          <div className="bg-[#1f2020] px-4 py-2 flex items-center justify-between border-b border-outline-variant/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <div className="text-[10px] font-mono text-outline uppercase tracking-widest">zsh — infra_admin@net_architect</div>
            <div className="w-12"></div>
          </div>
          {/* Terminal Body */}
          <div className="flex-1 flex overflow-hidden font-mono text-sm">
            {/* Sidebar */}
            <div className="w-1/3 border-r border-outline-variant/10 overflow-y-auto terminal-scroll bg-[#0a0a0a]">
              <div className="p-4 space-y-1">
                {projects.map((project, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveIndex(index);
                      setIsModalOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded flex gap-2 items-center group transition-colors ${
                      index === activeIndex
                        ? 'text-primary-container bg-white/5 border-l-2 border-primary-container'
                        : 'text-on-surface-variant hover:bg-white/5'
                    }`}
                  >
                    <span className="opacity-50">➜</span> <span className="text-secondary">~</span> <span className="truncate">cat {project.file}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 terminal-scroll relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col xl:flex-row gap-6">
                    <button 
                      onClick={() => setIsModalOpen(true)} 
                      className="block shrink-0 text-left focus:outline-none" 
                      title={`View details for ${activeProject.title}`}
                    >
                      <img
                        alt={activeProject.title}
                        className="w-full xl:w-72 aspect-video object-cover rounded border border-outline-variant/20 shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:border-primary-container/50 cursor-pointer"
                        src={activeProject.img}
                      />
                    </button>
                    <div className="flex-1">
                      <h4 className="text-primary-container font-bold text-xl mb-2">{activeProject.title}</h4>
                      <p className="text-on-surface-variant text-sm mb-4 leading-relaxed">{activeProject.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.tags.map((tag, idx) => (
                          <span key={idx} className="text-[10px] bg-white/5 px-2 py-1 rounded text-outline border border-outline-variant/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              {/* Blinking Cursor */}
              <div className="mt-8">
                {terminalHistory.map((item, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-primary-container">➜</span>
                      <span className="text-secondary">~</span>
                      <span className="text-on-surface">{item.cmd}</span>
                    </div>
                    <div className="text-on-surface-variant pl-6">{item.output}</div>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <span className="text-primary-container">➜</span>
                  <span className="text-secondary">~</span>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleCommand}
                    className="bg-transparent border-none outline-none flex-1 text-on-surface font-mono"
                    autoFocus
                    spellCheck="false"
                    autoComplete="off"
                  />
                  <span className="w-2 h-5 bg-[#00d2fd] animate-pulse -ml-2"></span>
                </div>
                <div ref={terminalEndRef} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-surface border border-outline-variant/20 rounded-xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-outline-variant/10 bg-surface-variant/30">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                  <span className="ml-2 font-mono text-xs text-outline tracking-widest uppercase">
                    viewing: {activeProject.file}
                  </span>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors text-on-surface-variant hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              {/* Modal Content */}
              <div className="overflow-y-auto p-6 sm:p-8 terminal-scroll">
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <img
                    src={activeProject.img}
                    alt={activeProject.title}
                    className="w-full md:w-1/2 aspect-video object-cover rounded-lg border border-outline-variant/20"
                  />
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold font-headline mb-4 text-primary-container">{activeProject.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {activeProject.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="prose prose-invert prose-p:text-on-surface-variant prose-headings:text-on-surface prose-a:text-primary max-w-none font-body">
                  <ReactMarkdown>{activeProject.content || activeProject.desc}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
