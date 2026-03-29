import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { projects } from '../data';

type Theme = {
  id: string;
  name: string;
  bg: string;
  headerBg: string;
  sidebarBg: string;
  textPrimary: string;
  textSecondary: string;
  textNormal: string;
  borderPrimary: string;
  cursorBg: string;
};

const THEMES: Record<string, Theme> = {
  default: {
    id: 'default',
    name: 'Default',
    bg: 'bg-[#0e0e0e]',
    headerBg: 'bg-[#1f2020]',
    sidebarBg: 'bg-[#0a0a0a]',
    textPrimary: 'text-primary-container',
    textSecondary: 'text-secondary',
    textNormal: 'text-on-surface-variant',
    borderPrimary: 'border-primary-container',
    cursorBg: 'bg-[#00d2fd]',
  },
  dracula: {
    id: 'dracula',
    name: 'Dracula',
    bg: 'bg-[#282a36]',
    headerBg: 'bg-[#21222c]',
    sidebarBg: 'bg-[#1e1f29]',
    textPrimary: 'text-[#ff79c6]',
    textSecondary: 'text-[#bd93f9]',
    textNormal: 'text-[#f8f8f2]',
    borderPrimary: 'border-[#ff79c6]',
    cursorBg: 'bg-[#f1fa8c]',
  },
  solarized: {
    id: 'solarized',
    name: 'Solarized Dark',
    bg: 'bg-[#002b36]',
    headerBg: 'bg-[#073642]',
    sidebarBg: 'bg-[#00212b]',
    textPrimary: 'text-[#268bd2]',
    textSecondary: 'text-[#2aa198]',
    textNormal: 'text-[#839496]',
    borderPrimary: 'border-[#268bd2]',
    cursorBg: 'bg-[#b58900]',
  },
  matrix: {
    id: 'matrix',
    name: 'Matrix',
    bg: 'bg-[#000000]',
    headerBg: 'bg-[#001100]',
    sidebarBg: 'bg-[#000500]',
    textPrimary: 'text-[#00ff00]',
    textSecondary: 'text-[#008800]',
    textNormal: 'text-[#00cc00]',
    borderPrimary: 'border-[#00ff00]',
    cursorBg: 'bg-[#00ff00]',
  }
};

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<{cmd: string, output: string | React.ReactNode}[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES.default);
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
              <p>- <span className={`${currentTheme.textPrimary} font-bold`}>ls</span> or <span className={`${currentTheme.textPrimary} font-bold`}>projects</span>: List available project files</p>
              <p>- <span className={`${currentTheme.textPrimary} font-bold`}>cat [filename]</span>: Display project details</p>
              <p>- <span className={`${currentTheme.textPrimary} font-bold`}>whoami</span>: System identity</p>
              <p>- <span className={`${currentTheme.textPrimary} font-bold`}>uptime</span>: Current system uptime</p>
              <p>- <span className={`${currentTheme.textPrimary} font-bold`}>clear</span>: Clear terminal history</p>
              <p>- <span className={`${currentTheme.textPrimary} font-bold`}>help</span>: Show this menu</p>
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
        <div className={`${currentTheme.bg} rounded-xl overflow-hidden border border-outline-variant/20 shadow-2xl flex flex-col h-[600px] md:h-[700px] transition-colors duration-300`}>
          {/* Terminal Header */}
          <div className={`${currentTheme.headerBg} px-4 py-2 flex items-center justify-between border-b border-outline-variant/10 transition-colors duration-300`}>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="text-[10px] font-mono text-outline uppercase tracking-widest hidden sm:block">zsh — infra_admin@net_architect</div>
              <select 
                value={currentTheme.id}
                onChange={(e) => setCurrentTheme(THEMES[e.target.value])}
                className="bg-black/20 text-outline text-[10px] font-mono uppercase tracking-widest border border-outline-variant/20 rounded px-2 py-1 outline-none focus:border-primary-container cursor-pointer"
              >
                {Object.values(THEMES).map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Terminal Body */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden font-mono text-sm">
            {/* Sidebar */}
            <div className={`w-full md:w-1/3 border-b md:border-b-0 md:border-r border-outline-variant/10 overflow-x-auto md:overflow-y-auto terminal-scroll ${currentTheme.sidebarBg} transition-colors duration-300 flex-shrink-0`}>
              <div className="p-4 flex md:flex-col gap-2 md:space-y-1 md:gap-0">
                {projects.map((project, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveIndex(index);
                      setIsModalOpen(false);
                    }}
                    className={`w-auto md:w-full whitespace-nowrap md:whitespace-normal text-left p-2 rounded flex gap-2 items-center group transition-colors ${
                      index === activeIndex
                        ? `${currentTheme.textPrimary} bg-white/5 border-b-2 md:border-b-0 md:border-l-2 ${currentTheme.borderPrimary}`
                        : `${currentTheme.textNormal} hover:bg-white/5`
                    }`}
                  >
                    <span className="opacity-50 hidden md:inline">➜</span> <span className={`${currentTheme.textSecondary} hidden md:inline`}>~</span> <span className="truncate">cat {project.file}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 terminal-scroll relative">
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
                      <h4 className={`${currentTheme.textPrimary} font-bold text-xl mb-2`}>{activeProject.title}</h4>
                      <p className={`${currentTheme.textNormal} text-sm mb-4 leading-relaxed`}>{activeProject.desc}</p>
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
                      <span className={currentTheme.textPrimary}>➜</span>
                      <span className={currentTheme.textSecondary}>~</span>
                      <span className={currentTheme.textNormal}>{item.cmd}</span>
                    </div>
                    <div className={`${currentTheme.textNormal} pl-6 opacity-80 break-words`}>{item.output}</div>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <span className={currentTheme.textPrimary}>➜</span>
                  <span className={currentTheme.textSecondary}>~</span>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleCommand}
                    className={`bg-transparent border-none outline-none flex-1 min-w-0 ${currentTheme.textNormal} font-mono`}
                    autoFocus
                    spellCheck="false"
                    autoComplete="off"
                  />
                  <span className={`w-2 h-5 ${currentTheme.cursorBg} animate-pulse -ml-2`}></span>
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
