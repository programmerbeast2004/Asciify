"use client";

import React, { useState, useEffect } from 'react';
import { GitBranch, User, Sparkles, X, Activity, Type, Layers } from 'lucide-react';

export const Header = () => {
  const [isWhatsNewOpen, setIsWhatsNewOpen] = useState(false);
  const [version, setVersion] = useState("v1");
  const [isFlipping, setIsFlipping] = useState(false);
  const [hasSeenWhatsNew, setHasSeenWhatsNew] = useState(false);

  useEffect(() => {
    // Trigger v1 to v2 flip animation on mount
    const timer = setTimeout(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setVersion("v2");
        setIsFlipping(false);
        
        // Auto pop-up the "What's New" modal right after the version flips!
        setTimeout(() => {
          setIsWhatsNewOpen(true);
          setHasSeenWhatsNew(true);
        }, 800);
      }, 300);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes bounceInModal {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          60% { opacity: 1; transform: scale(1.05) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeInBackdrop {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(8px); }
        }
        @keyframes attentionPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(217, 119, 6, 0.7); }
          50% { box-shadow: 0 0 0 10px rgba(217, 119, 6, 0); }
        }
        .animate-modal-backdrop {
          animation: fadeInBackdrop 0.5s ease-out forwards;
        }
        .animate-modal-content {
          animation: bounceInModal 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .animate-stagger-item {
          opacity: 0;
          animation: slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .attention-button {
          animation: attentionPulse 2s infinite;
        }
      `}</style>

      <header className="border-b border-dashed border-amber-900/50 bg-[#050505] sticky top-0 z-50">
        <div className="max-w-[1300px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 mt-2">
              <img 
                src="/ascii-art-text__1_-removebg-preview.png" 
                alt="asciify logo" 
                className="h-14 w-auto scale-[1.3] ml-4 mr-2 brightness-[1.8] contrast-[1.2] saturate-[1.5] drop-shadow-[0_0_12px_rgba(200,120,80,0.6)]" 
              />
              <div className={`hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 rounded-sm bg-[#111] border border-amber-900 text-[10px] font-bold text-amber-500 tracking-wider shadow-[0_0_15px_rgba(217,119,6,0.4)] transform transition-all duration-300 translate-y-1 ${isFlipping ? 'scale-y-0 opacity-0 rotate-x-90' : 'scale-y-100 opacity-100 rotate-x-0'}`}>
                {version}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                setIsWhatsNewOpen(true);
                setHasSeenWhatsNew(true);
              }}
              className={`group relative flex items-center gap-2 px-4 py-2 rounded-sm bg-gradient-to-r from-amber-900/40 to-amber-800/20 text-amber-500 border border-amber-700/50 font-semibold text-sm hover:from-amber-600 hover:to-amber-500 hover:text-black hover:border-amber-500 transition-all duration-300 ${!hasSeenWhatsNew ? 'attention-button' : 'shadow-[0_0_15px_rgba(217,119,6,0.15)] hover:shadow-[0_0_20px_rgba(217,119,6,0.4)]'}`}
            >
              {!hasSeenWhatsNew && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
              )}
              {!hasSeenWhatsNew && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              )}
              <Sparkles className={`w-4 h-4 ${!hasSeenWhatsNew ? 'animate-pulse text-amber-400' : 'group-hover:animate-pulse'}`} />
              <span className="hidden sm:inline">What's New</span>
            </button>
            <a href="https://github.com/programmerbeast2004/Asciify" target="_blank" rel="noreferrer" className="group relative flex items-center gap-2 px-4 py-2 rounded-sm bg-[#111] text-amber-500 border border-amber-700/50 font-semibold text-sm hover:bg-amber-500 hover:text-black transition-all duration-150">
              <GitBranch className="w-4 h-4" />
              <span className="hidden lg:inline">Contribute</span>
            </a>
            <a href="https://www.its-apoorv.me/" target="_blank" rel="noreferrer" className="group relative flex items-center gap-2 px-4 py-2 rounded-sm bg-[#0a0a0a] border border-dashed border-amber-900/80 text-amber-700 font-semibold text-sm hover:bg-amber-600 hover:text-black hover:border-amber-600 transition-all duration-150">
              <User className="w-4 h-4" />
              <span className="hidden lg:inline relative z-10">Meet the Developer</span>
            </a>
          </div>
        </div>
      </header>

      {isWhatsNewOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 animate-modal-backdrop perspective-1000">
          <div className="bg-[#050505] border-2 border-amber-600 rounded-xl p-8 max-w-lg w-full shadow-[0_0_80px_rgba(217,119,6,0.3)] relative animate-modal-content overflow-hidden">
            
            {/* Ambient Background Glow inside Modal */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] pointer-events-none"></div>
            
            <button 
              onClick={() => setIsWhatsNewOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-amber-500 transition-colors bg-[#111] p-1.5 rounded-full border border-amber-900/50 hover:border-amber-500/80 z-20"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center px-3 py-1 mb-4 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold uppercase tracking-widest animate-pulse">
                Update Available
              </div>

              <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-amber-600 mb-8 flex items-center gap-3 drop-shadow-sm">
                <Sparkles className="w-8 h-8 text-amber-400" /> 
                Welcome to v2!
              </h3>
              
              <div className="space-y-4 text-sm text-zinc-300">
                <div className="bg-[#111]/80 backdrop-blur-md p-5 rounded-lg border border-amber-900/50 hover:border-amber-500 transition-all duration-300 animate-stagger-item hover:shadow-[0_0_20px_rgba(217,119,6,0.15)] group hover:-translate-y-1" style={{ animationDelay: '150ms' }}>
                  <h4 className="font-bold text-white mb-2 text-lg flex items-center gap-2">
                    <div className="p-2 bg-amber-900/30 rounded-md group-hover:bg-amber-500/20 transition-colors">
                      <Activity className="w-5 h-5 text-amber-500" /> 
                    </div>
                    LeetCode Stats Card
                  </h4>
                  <p className="text-zinc-400 leading-relaxed text-[13px] ml-11">Generate beautifully animated LeetCode profile cards to showcase your problem-solving skills, complete with earned badges and rich activity graphs!</p>
                </div>
                
                <div className="bg-[#111]/80 backdrop-blur-md p-5 rounded-lg border border-amber-900/50 hover:border-amber-500 transition-all duration-300 animate-stagger-item hover:shadow-[0_0_20px_rgba(217,119,6,0.15)] group hover:-translate-y-1" style={{ animationDelay: '300ms' }}>
                  <h4 className="font-bold text-white mb-2 text-lg flex items-center gap-2">
                    <div className="p-2 bg-amber-900/30 rounded-md group-hover:bg-amber-500/20 transition-colors">
                      <Type className="w-5 h-5 text-amber-500" /> 
                    </div>
                    Custom Typing Animations
                  </h4>
                  <p className="text-zinc-400 leading-relaxed text-[13px] ml-11">Create dynamic SVG typing animations for your README. Customize fonts, colors, speeds, and text to suit your developer profile perfectly.</p>
                </div>
                
                <div className="bg-[#111]/80 backdrop-blur-md p-5 rounded-lg border border-amber-900/50 hover:border-amber-500 transition-all duration-300 animate-stagger-item hover:shadow-[0_0_20px_rgba(217,119,6,0.15)] group hover:-translate-y-1" style={{ animationDelay: '450ms' }}>
                  <h4 className="font-bold text-white mb-2 text-lg flex items-center gap-2">
                    <div className="p-2 bg-amber-900/30 rounded-md group-hover:bg-amber-500/20 transition-colors">
                      <Layers className="w-5 h-5 text-amber-500" /> 
                    </div>
                    Modular Architecture
                  </h4>
                  <p className="text-zinc-400 leading-relaxed text-[13px] ml-11">Under the hood, Asciify has been fully refactored for better performance, faster renders, and a cleaner developer experience.</p>
                </div>
              </div>
              
              <button 
                onClick={() => setIsWhatsNewOpen(false)}
                className="mt-8 w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-lg rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(217,119,6,0.4)] hover:shadow-[0_0_30px_rgba(217,119,6,0.6)] hover:-translate-y-0.5 animate-stagger-item"
                style={{ animationDelay: '600ms' }}
              >
                Let's Go!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
