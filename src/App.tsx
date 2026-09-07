/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { platforms, roms, contributors, Platform, Rom, Contributor } from './data';
import { Battery, Wifi, Bell, Search, Info, Settings, Download, X, Users, Check } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState<string[]>(['', '', '', '']);
  const [error, setError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleLogin = async (code: string) => {
    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      
      if (response.ok) {
        setIsAuthenticated(true);
        setError(false);
      } else {
        setError(true);
        setPasscode(['', '', '', '']);
        if (inputRefs.current[0]) inputRefs.current[0].focus();
        setTimeout(() => setError(false), 2000);
      }
    } catch (err) {
      console.error("Verification failed:", err);
      setError(true);
      setPasscode(['', '', '', '']);
      if (inputRefs.current[0]) inputRefs.current[0].focus();
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newPasscode = [...passcode];
    newPasscode[index] = value.slice(-1); // Only keep the last entered character
    setPasscode(newPasscode);
    
    // Auto focus next input
    if (value !== '' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto submit if this is the last digit and it's filled
    if (value !== '' && index === 3) {
      handleLogin(newPasscode.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && passcode[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4).replace(/\D/g, '');
    if (pastedData) {
      const newPasscode = [...passcode];
      for (let i = 0; i < pastedData.length; i++) {
        if (i < 4) newPasscode[i] = pastedData[i];
      }
      setPasscode(newPasscode);
      
      if (pastedData.length === 4) {
        handleLogin(newPasscode.join(''));
      } else {
        const nextIndex = Math.min(pastedData.length, 3);
        inputRefs.current[nextIndex]?.focus();
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!isAuthenticated ? (
        <motion.div
          key="login"
          exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          transition={{ duration: 0.4 }}
          className="min-h-screen flex items-center justify-center p-4 fixed inset-0 z-50 bg-transparent"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, x: error ? [-10, 10, -10, 10, -5, 5, 0] : 0 }}
            transition={error ? { duration: 0.4 } : {}}
            className="bg-white/80 backdrop-blur-xl p-10 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border-4 border-white w-full max-w-md text-center relative z-10"
            style={{ perspective: 1000 }}
          >
            <motion.img 
               src="https://i.imgur.com/MBWnmPo.png" 
               alt="logo"
               style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
               onMouseMove={handleMouseMove}
               onMouseLeave={handleMouseLeave}
               className="mb-12 w-48 mx-auto object-contain drop-shadow-xl"
             />
            
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex gap-4 justify-center">
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="relative w-16 h-20">
                    <input
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={passcode[index]}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className={`absolute inset-0 w-full h-full text-center text-3xl font-bold rounded-2xl bg-slate-100 border-4 outline-none transition-all text-transparent caret-blue-500 ${
                        error ? 'border-red-400 text-red-500' : 'border-transparent focus:border-blue-400 focus:bg-white'
                      }`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <AnimatePresence>
                        {passcode[index] && (
                          <motion.span
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className={`text-3xl font-bold ${error ? 'text-red-500' : 'text-slate-800'}`}
                          >
                            {passcode[index]}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                ))}
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.6 }}
          className="min-h-screen relative"
        >
          <MainApp />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MainApp() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSidebar, setActiveSidebar] = useState<'platforms' | 'contributors' | null>(null);
  const [platformSearch, setPlatformSearch] = useState('');
  const [romSearch, setRomSearch] = useState('');
  const [{ page: currentPage, direction }, setPageState] = useState({ page: 0, direction: 0 });

  const setCurrentPage = (newPageOrUpdater: number | ((prev: number) => number)) => {
    setPageState(prev => {
      const newPage = typeof newPageOrUpdater === 'function' ? newPageOrUpdater(prev.page) : newPageOrUpdater;
      const newDirection = newPage > prev.page ? 1 : newPage < prev.page ? -1 : 0;
      return { page: newPage, direction: newDirection };
    });
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const filteredRoms = roms.filter(r => {
    const matchesPlatform = selectedPlatform ? r.platformId === selectedPlatform.id : true;
    const matchesSearch = r.title.toLowerCase().includes(romSearch.toLowerCase());
    return matchesPlatform && matchesSearch;
  });

  useEffect(() => {
    setCurrentPage(0);
  }, [romSearch]);

  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.max(1, Math.ceil(filteredRoms.length / ITEMS_PER_PAGE));
  const paginatedRoms = filteredRoms.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key.toLowerCase() === 'y') {
        setActiveSidebar(prev => prev === 'platforms' ? null : 'platforms');
      }
      if (e.key === 'Escape') {
        setActiveSidebar(null);
      }
      if (e.key.toLowerCase() === 'a' || e.key === 'ArrowLeft') {
        setCurrentPage(prev => Math.max(0, prev - 1));
      }
      if (e.key.toLowerCase() === 'd' || e.key === 'ArrowRight') {
        setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages]);

  const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = `${(currentTime.getMonth() + 1).toString().padStart(2, '0')}/${currentTime.getDate().toString().padStart(2, '0')}`;

  const filteredPlatforms = platforms.filter(p => 
    p.name.toLowerCase().includes(platformSearch.toLowerCase()) || 
    p.shortName.toLowerCase().includes(platformSearch.toLowerCase())
  );
  
  const groupedPlatforms = filteredPlatforms.reduce((acc, platform) => {
    if (!acc[platform.brand]) acc[platform.brand] = [];
    acc[platform.brand].push(platform);
    return acc;
  }, {} as Record<string, Platform[]>);

  const sidebarVariants = {
    hidden: { x: '-100%', opacity: 0.5 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { type: 'spring', damping: 25, stiffness: 200, staggerChildren: 0.05 } 
    },
    exit: { x: '-100%', opacity: 0.5 }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Sidebar Menu */}
      <AnimatePresence mode="wait">
        {activeSidebar === 'platforms' && (
          <motion.div
            key="platforms-sidebar"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 bottom-0 w-[380px] bg-white/90 backdrop-blur-2xl shadow-[20px_0_60px_-15px_rgba(0,0,0,0.1)] z-50 p-6 border-r-4 border-white flex flex-col"
          >
            <div className="flex justify-between items-center mb-6 mt-2">
               <h2 className="text-3xl font-black text-slate-800 tracking-tight">Platforms</h2>
               <button onClick={() => setActiveSidebar(null)} className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors">
                  <X size={20} />
               </button>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search platforms..."
                value={platformSearch}
                onChange={(e) => setPlatformSearch(e.target.value)}
                className="w-full bg-slate-100 rounded-full py-3 pl-12 pr-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white border-2 border-transparent transition-all"
              />
            </div>

            <div className="mb-4">
              <button
                onClick={() => { setSelectedPlatform(null); setActiveSidebar(null); setCurrentPage(0); }}
                className={`w-full p-4 rounded-[1.5rem] border-4 transition-all text-left font-bold text-lg ${!selectedPlatform ? 'border-blue-400 bg-blue-50 text-blue-600 shadow-md scale-[1.02]' : 'border-white bg-slate-50 text-slate-600 hover:bg-slate-100 hover:scale-[1.02]'}`}
              >
                All Platforms
              </button>
            </div>

            <div className="flex flex-col gap-6 flex-1 overflow-y-auto px-2 -mx-2 pt-2 -mt-2 pb-8">
              {['Nintendo', 'Sony', 'Sega', 'Other'].map(brand => {
                const brandPlatforms = groupedPlatforms[brand];
                if (!brandPlatforms || brandPlatforms.length === 0) return null;
                
                return (
                  <motion.div variants={itemVariants} key={brand} className="flex flex-col gap-3">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest px-2">{brand}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {brandPlatforms.map(p => {
                        const romCount = roms.filter(r => r.platformId === p.id).length;
                        const isEmpty = romCount === 0;

                        return (
                        <button
                          key={p.id}
                          onClick={() => { 
                            if (!isEmpty) { 
                              if (selectedPlatform?.id === p.id) {
                                setSelectedPlatform(null);
                              } else {
                                setSelectedPlatform(p); 
                              }
                              setActiveSidebar(null); 
                              setCurrentPage(0); 
                            } 
                          }}
                          className={`w-full p-3 rounded-[1.25rem] border-4 transition-all flex flex-col items-center gap-2 group ${isEmpty ? 'border-transparent bg-slate-100 opacity-60 grayscale cursor-not-allowed' : selectedPlatform?.id === p.id ? 'border-blue-400 bg-blue-50 shadow-md scale-105' : 'border-white bg-slate-50 hover:bg-slate-100 hover:scale-105'}`}
                        >
                          <div className="w-full h-16 rounded-xl overflow-hidden shadow-inner bg-slate-200 relative">
                             <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                             <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-40 mix-blend-overlay`} />
                          </div>
                          <div className="flex flex-col items-center">
                            <span className={`font-bold text-xs text-center leading-tight ${selectedPlatform?.id === p.id ? 'text-blue-700' : 'text-slate-600'}`}>{p.name}</span>
                            {isEmpty && <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">No ROMs</span>}
                          </div>
                        </button>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div className="mt-4 pt-6 border-t-2 border-slate-100">
               <p className="text-xs text-slate-400 font-bold uppercase text-center tracking-widest">Press 'Y' to close</p>
            </div>
          </motion.div>
        )}
        {activeSidebar === 'contributors' && (
          <motion.div
            key="contributors-sidebar"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 bottom-0 w-[380px] bg-white/90 backdrop-blur-2xl shadow-[20px_0_60px_-15px_rgba(0,0,0,0.1)] z-50 p-6 border-r-4 border-white flex flex-col"
          >
            <div className="flex justify-between items-center mb-6 mt-2">
               <h2 className="text-3xl font-black text-slate-800 tracking-tight">Contributors</h2>
               <button onClick={() => setActiveSidebar(null)} className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors">
                  <X size={20} />
               </button>
            </div>
            
            <div className="flex flex-col gap-4 flex-1 overflow-y-auto pr-2 pb-8">
               {contributors.map(c => (
                  <motion.div variants={itemVariants} key={c.id} className="bg-slate-50 border-4 border-white rounded-[1.5rem] p-4 shadow-sm flex flex-col gap-3">
                     <div className="flex items-center gap-4">
                        <img src={c.avatarUrl} alt={c.name} className="w-12 h-12 rounded-full shadow-inner object-cover bg-slate-200 border-2 border-white" />
                        <h3 className="font-black text-lg text-slate-700">{c.name}</h3>
                     </div>
                     {c.description && (
                        <p className="text-sm text-slate-500 font-semibold leading-relaxed bg-white p-3 rounded-xl shadow-inner border border-slate-100">{c.description}</p>
                     )}
                  </motion.div>
               ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main App Content - Shifts right when sidebar opens */}
      <motion.div
        animate={{
          x: activeSidebar ? 380 : 0,
          scale: activeSidebar ? 0.95 : 1,
          opacity: activeSidebar ? 0.6 : 1
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="min-h-screen flex flex-col p-6 max-w-7xl mx-auto origin-right"
        onClick={() => activeSidebar && setActiveSidebar(null)}
      >
        {/* Top Bar */}
        <header className="flex justify-between items-center mb-8 gap-4 pointer-events-auto h-16">
          {/* Left Side: Contributors Mock */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setActiveSidebar(prev => prev === 'contributors' ? null : 'contributors');
            }}
            className={`h-full flex items-center gap-3 backdrop-blur-md px-5 rounded-full shadow-sm border-4 transition-colors group cursor-pointer ${activeSidebar === 'contributors' ? 'bg-blue-500 border-blue-400' : 'bg-white/70 border-white hover:bg-white'}`}
          >
            <span className={`font-black ${activeSidebar === 'contributors' ? 'text-white' : 'text-slate-700'}`}>
              {contributors.length > 3 ? `+ ${contributors.length - 3}` : contributors.length}
            </span>
            <div className="flex -space-x-3">
              {contributors.slice(0, 3).map((c) => (
                <img 
                  key={c.id}
                  src={c.avatarUrl}
                  alt={c.name}
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover bg-slate-200 relative z-10"
                />
              ))}
            </div>
            <div className={`ml-2 font-bold px-2 py-1 rounded-md text-xs flex items-center justify-center ${activeSidebar === 'contributors' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors'}`}>
              <Users size={14} />
            </div>
          </button>

          {/* Center Title Pill */}
          <div className="flex-1 flex justify-center h-full">
            <div className="h-full bg-white/90 backdrop-blur-md px-12 rounded-full shadow-sm border-4 border-white min-w-[400px] flex justify-center items-center">
              <h1 className="text-2xl font-black text-slate-700 tracking-tight">
                {selectedPlatform ? selectedPlatform.name : 'All ROMs'}
              </h1>
            </div>
          </div>

          {/* Right Side: ROM Search */}
          <div className="h-full bg-white/70 backdrop-blur-md px-5 rounded-full shadow-sm border-4 border-white flex items-center gap-3 w-80 focus-within:bg-white transition-colors">
            <Search size={20} className="text-slate-400 shrink-0" />
            <input 
              type="text"
              placeholder="Search games..."
              value={romSearch}
              onChange={(e) => setRomSearch(e.target.value)}
              className="bg-transparent border-none outline-none font-bold text-slate-700 w-full placeholder:text-slate-400"
            />
            {romSearch && (
              <button onClick={() => setRomSearch('')} className="text-slate-400 hover:text-slate-600 shrink-0">
                <X size={16} />
              </button>
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col items-center pointer-events-auto w-full">
          <div 
            className="w-full bg-white/60 backdrop-blur-md border-4 border-white rounded-[3rem] p-8 shadow-lg transition-all duration-500 overflow-hidden"
          >
             <div className="relative w-full">
                <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                  <motion.div
                    key={currentPage}
                    custom={direction}
                    variants={{
                      enter: (dir: number) => ({
                        x: dir > 0 ? '100%' : '-100%',
                        opacity: 0,
                        scale: 0.9,
                      }),
                      center: {
                        zIndex: 1,
                        x: 0,
                        opacity: 1,
                        scale: 1,
                      },
                      exit: (dir: number) => ({
                        zIndex: 0,
                        x: dir < 0 ? '100%' : '-100%',
                        opacity: 0,
                        scale: 0.9,
                      })
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                      scale: { duration: 0.3 }
                    }}
                    className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 grid-flow-dense w-full"
                  >
                    {paginatedRoms.length > 0 ? (
                      paginatedRoms.map(rom => (
                        <div
                          key={rom.id}
                          className={spanClasses[rom.gridSize] || 'col-span-1 row-span-1'}
                        >
                          <RomCard rom={rom} />
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-400 w-full h-full">
                        <Search size={48} className="mb-4 opacity-50" />
                        <h3 className="text-xl font-black">No ROMs found</h3>
                        <p className="font-semibold mt-2">Try adjusting your search or selecting a different platform.</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
             </div>
          </div>
        </main>

        {/* Bottom Controls */}
        <footer className="mt-8 flex justify-between items-center px-4 pointer-events-auto">
          <div className="flex gap-4">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setActiveSidebar(prev => prev === 'platforms' ? null : 'platforms');
              }}
              className={`backdrop-blur-sm px-6 py-3 rounded-full border-2 shadow-sm font-bold flex items-center gap-2 transition-all duration-300 ${activeSidebar === 'platforms' ? 'bg-blue-500 border-blue-400 text-white hover:bg-blue-600 shadow-blue-500/30' : 'bg-white/80 border-white text-slate-700 hover:bg-white'}`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${activeSidebar === 'platforms' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}>Y</span>
              Platforms
            </button>
            <button 
              className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white shadow-sm font-bold text-slate-700 flex items-center gap-2 hover:bg-white transition-colors"
            >
              <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs">-</span>
              Details
            </button>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-2">
              {totalPages > 1 && Array.from({ length: totalPages }).map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full transition-colors ${i === currentPage ? 'bg-emerald-400' : 'bg-slate-300'}`} />
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              className={`backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white shadow-sm font-bold text-slate-700 flex items-center gap-2 transition-colors ${currentPage === 0 ? 'opacity-50 cursor-not-allowed bg-white/40' : 'bg-white/80 hover:bg-white'}`}
            >
              <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-black">A</span>
              Prev
            </button>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
              disabled={currentPage === totalPages - 1}
              className={`backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white shadow-sm font-bold text-slate-700 flex items-center gap-2 transition-colors ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed bg-white/40' : 'bg-white/80 hover:bg-white'}`}
            >
              <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-black">D</span>
              Next
            </button>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}

const spanClasses: Record<string, string> = {
  '1x1': 'col-span-1 row-span-1',
  '2x2': 'col-span-2 row-span-2',
};

function RomCard({ rom }: { rom: Rom }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowModal(true)}
        className="w-full h-full aspect-square group relative rounded-[2rem] border-4 border-white shadow-md overflow-hidden bg-slate-200 transition-all duration-300 flex flex-col justify-end text-left"
      >
        <img 
          src={rom.coverImage} 
          alt={rom.title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative z-10 p-4">
           <h3 className="text-white font-black text-lg drop-shadow-md leading-tight">{rom.title}</h3>
           <p className="text-white/90 font-bold text-xs drop-shadow-sm mt-1">{rom.size}</p>
        </div>
        
        {/* Subtle overlay icon for interaction */}
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10">
           <Download size={20} className="text-white" />
        </div>
      </motion.button>

      {/* Download Modal */}
      {createPortal(
        <AnimatePresence>
          {showModal && (
            <DownloadModal rom={rom} onClose={() => setShowModal(false)} />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

function DownloadModal({ rom, onClose }: { rom: Rom; onClose: () => void }) {
  const [agreed, setAgreed] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />
      
      {/* Modal Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative bg-white rounded-[2.5rem] p-8 shadow-2xl border-4 border-white w-full max-w-lg z-10"
      >
        <div className="relative w-full h-40 rounded-2xl overflow-hidden mb-6 flex items-end p-6 border-4 border-slate-50 shadow-inner">
           <img src={rom.bannerImage || rom.coverImage} alt={rom.title} className="absolute inset-0 w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
           <h2 className="relative z-10 text-2xl font-black text-white drop-shadow-md">{rom.title}</h2>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 text-amber-500 font-bold mb-2">
            <Info size={20} />
            <span className="uppercase tracking-wider text-sm">Legal Disclaimer</span>
          </div>
          <p className="text-slate-600 font-semibold leading-relaxed">
            You can only download a copy of this game if you bought a real physical/digital copy of the game as well, or have the fitting legal license to own this ROM.
          </p>
        </div>

        <label className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors border-2 border-transparent hover:border-slate-200">
          <div className="relative flex items-center pt-1">
            <input 
              type="checkbox" 
              className="w-6 h-6 rounded-md border-2 border-slate-300 text-blue-500 focus:ring-blue-500 cursor-pointer appearance-none checked:bg-blue-500 checked:border-blue-500 transition-all"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            {agreed && <Check size={16} strokeWidth={3} className="absolute text-white left-1 pointer-events-none" />}
          </div>
          <span className="text-slate-700 font-bold select-none">
            I confirm that I own a legal copy of {rom.title} or hold a valid license.
          </span>
        </label>

        <div className="mt-8 flex gap-4">
          <button 
            disabled={isDownloading}
            onClick={onClose}
            className="flex-1 py-4 rounded-full bg-slate-100 text-slate-600 font-bold text-lg hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button 
            disabled={!agreed || isDownloading}
            onClick={() => {
              if (!rom.downloadLink || isDownloading) return;
              setIsDownloading(true);
              setIsTransitioning(true);

              setTimeout(() => {
                window.open(rom.downloadLink, '_blank');
                onClose();
              }, 2500);
            }}
            className={`flex-1 py-4 rounded-full font-bold text-lg text-white shadow-lg transition-all relative overflow-hidden ${
              agreed 
                ? 'bg-blue-500 hover:bg-blue-600 hover:shadow-xl hover:-translate-y-1' 
                : 'bg-slate-300 cursor-not-allowed shadow-none'
            }`}
          >
            {isDownloading ? 'Preparing...' : `Download (${rom.size})`}
          </button>
        </div>
      </motion.div>
    </div>

    <AnimatePresence>
      {isTransitioning && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="fixed inset-0 z-[100] bg-white/60 backdrop-blur-xl flex items-center justify-center flex-col gap-4"
        >
           <motion.div
              initial={{ y: 300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
              className="relative z-20 drop-shadow-2xl mb-8"
           >
              <motion.div
                 animate={{ y: [-15, 15, -15] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                 className="w-36 h-36"
              >
                 <img 
                   src="https://mario.wiki.gallery/images/thumb/0/0d/SMBW_Mario_Jump.png/474px-SMBW_Mario_Jump.png" 
                   className="w-full h-full object-contain" 
                   alt="Mario"
                 />
              </motion.div>
           </motion.div>
           <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              className="text-3xl font-black text-slate-800 tracking-tight mt-4 relative z-10"
           >
             Opening download page...
           </motion.h2>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
