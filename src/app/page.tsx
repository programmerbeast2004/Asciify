"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, GitBranch, Terminal, Globe, User, BookOpen, Star, Building2, MapPin, Type, Palette, Code, Activity, Image as ImageIcon, Eye, EyeOff } from "lucide-react";
import TextType from "@/components/TextType";



export default function Home() {
  const [copied, setCopied] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'data' | 'visual' | 'custom'>('data');
  const [customFields, setCustomFields] = useState<{key: string, value: string}[]>([]);
  const [hiddenFields, setHiddenFields] = useState<Record<string, boolean>>({
    name: false,
    login: false,
    bio: false,
    repos: false,
    followers: false,
    company: false,
    location: false,
  });
  const toggleHidden = (field: string) => setHiddenFields(prev => ({ ...prev, [field]: !prev[field] }));
  const [formData, setFormData] = useState({
    username: "programmerbeast2004",
    custom_username: "",
    name: "",
    bio: "",
    company: "",
    location: "",
    repos: "",
    followers: "",
    following: "",
    custom_image: "",
    card_font: "'Courier New', monospace",
    text_color: "#d97706",
    theme: "dark",
    border_style: "dashed",
    border_color: "default",
    corner_radius: "15",
    anim_speed: "8",
    bg_style: "solid",
    font_size: "16",
    layout_gap: "normal",
    avatar_style: "colored",
    ascii_density: "standard",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (formData.username) params.append("username", formData.username);
      else if (!formData.custom_image) params.append("username", "programmerbeast2004"); // Fallback to prevent broken image
      if (formData.custom_image) params.append("custom_image", formData.custom_image);
      if (formData.custom_username) params.append("custom_username", formData.custom_username);
      if (formData.name) params.append("name", formData.name);
      if (formData.bio) params.append("bio", formData.bio);
      if (formData.company) params.append("company", formData.company);
      if (formData.location) params.append("location", formData.location);
      if (formData.repos) params.append("repos", formData.repos);
      if (formData.followers) params.append("followers", formData.followers);
      if (formData.following) params.append("following", formData.following);

      if (hiddenFields.name) params.append("hide_name", "true");
      if (hiddenFields.login) params.append("hide_login", "true");
      if (hiddenFields.bio) params.append("hide_bio", "true");
      if (hiddenFields.repos) params.append("hide_repos", "true");
      if (hiddenFields.followers) params.append("hide_followers", "true");
      if (hiddenFields.company) params.append("hide_company", "true");
      if (hiddenFields.location) params.append("hide_location", "true");
      if (formData.card_font) params.append("card_font", formData.card_font);
      if (formData.text_color) params.append("text_color", formData.text_color);
      
      // Visual Properties
      if (formData.theme !== "dark") params.append("theme", formData.theme);
      if (formData.border_style !== "solid") params.append("border_style", formData.border_style);
      if (formData.border_color !== "default") params.append("border_color", formData.border_color);
      if (formData.corner_radius !== "15") params.append("corner_radius", formData.corner_radius);
      if (formData.anim_speed !== "8") params.append("anim_speed", formData.anim_speed);
      if (formData.bg_style !== "solid") params.append("bg_style", formData.bg_style);
      if (formData.font_size !== "16") params.append("font_size", formData.font_size);
      if (formData.layout_gap !== "normal") params.append("layout_gap", formData.layout_gap);
      if (formData.avatar_style !== "colored") params.append("avatar_style", formData.avatar_style);
      if (formData.ascii_density !== "standard") params.append("ascii_density", formData.ascii_density);

      customFields.forEach((field, i) => {
        if (field.key && field.value) {
          params.append(`custom_key_${i + 1}`, field.key);
          params.append(`custom_val_${i + 1}`, field.value);
        }
      });

      setPreviewUrl(`/api/card?${params.toString()}`);
    }, 400);
    return () => clearTimeout(timer);
  }, [formData, customFields, hiddenFields]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getMarkdown = () => {
    if (!mounted || typeof window === "undefined") return "";
    return `<div align="center">\n  <img src="${window.location.origin}${previewUrl}" alt="asciify card" />\n</div>`;
  };

  const copyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(getMarkdown());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-amber-500/80 font-mono selection:bg-amber-600/50 relative overflow-hidden">
      
      {/* Premium Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle dot matrix */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(rgba(217, 119, 6, 0.15) 1.5px, transparent 1.5px)',
            backgroundSize: '32px 32px'
          }}
        ></div>
        
        {/* Scanlines */}
        <div 
          className="absolute inset-0 opacity-30 mix-blend-multiply"
          style={{
            background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.4) 51%)',
            backgroundSize: '100% 4px'
          }}
        ></div>
        
        {/* Deep ambient glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-amber-600/20 blur-[150px] animate-ambient-1 mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] rounded-full bg-orange-600/20 blur-[180px] animate-ambient-2 mix-blend-screen"></div>
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-yellow-600/10 blur-[120px] animate-ambient-1 mix-blend-screen" style={{ animationDelay: '5s' }}></div>
        
        {/* Vignette fade for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] opacity-60"></div>
      </div>

      {/* Header */}
      <header className="border-b border-dashed border-amber-900/50 bg-[#050505] sticky top-0 z-50">
        <div className="max-w-[1300px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 mt-2">
              <img 
                src="/ascii-art-text__1_-removebg-preview.png" 
                alt="asciify logo" 
                className="h-14 w-auto scale-[1.3] ml-4 mr-2 brightness-[1.8] contrast-[1.2] saturate-[1.5] drop-shadow-[0_0_12px_rgba(200,120,80,0.6)]" 
              />
              <div className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 rounded-sm bg-[#111] border border-amber-900 text-[10px] font-bold text-amber-500 tracking-wider shadow-lg transform translate-y-1">
                v1
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://github.com/programmerbeast2004/asciify" target="_blank" rel="noreferrer" className="group relative flex items-center gap-2 px-5 py-2 rounded-sm bg-[#111] text-amber-500 border border-amber-700/50 font-semibold text-sm hover:bg-amber-500 hover:text-black transition-all duration-150">
              <GitBranch className="w-4 h-4" />
              <span className="hidden sm:inline">Contribute</span>
            </a>
            <a href="https://www.its-apoorv.me/" target="_blank" rel="noreferrer" className="group relative flex items-center gap-2 px-5 py-2 rounded-sm bg-[#0a0a0a] border border-dashed border-amber-900/80 text-amber-700 font-semibold text-sm hover:bg-amber-600 hover:text-black hover:border-amber-600 transition-all duration-150">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline relative z-10">Meet the Developer</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-[1300px] mx-auto px-6 pt-0 pb-8 flex flex-col items-center">
        
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-4 max-w-2xl relative z-10 pt-4">
          <TextType
            as="h2"
            text={["Elevate your GitHub README.", "Showcase your developer stats.", "Level up your profile."]}
            typingSpeed={60}
            deletingSpeed={30}
            pauseDuration={3000}
            showCursor={true}
            cursorCharacter="|"
            className="text-4xl font-bold text-amber-500 tracking-tight mb-4 leading-tight min-h-[48px]"
            cursorClassName="text-amber-700"
          />
          <p className="text-base text-white/80 leading-relaxed">
            Generate stunning, animated ASCII data cards instantly. No database required. Fully customizable via URL.
          </p>
        </div>

        {/* Generator Interface */}
        <div className="w-full flex flex-col lg:flex-row gap-8 relative z-10 items-start">
          
          {/* Left Panel - Live Preview */}
          <div className="flex-1 flex flex-col gap-6 min-w-0 w-full">
            <div className="bg-[#0a0a0a] border border-amber-900 rounded-sm p-2 pb-6 flex flex-col overflow-hidden shadow-2xl relative">
              
              {/* Window Controls (Retro Style) */}
              <div className="flex items-center gap-2 p-4 mb-4">
                <div className="w-3 h-3 rounded-none bg-amber-950 border border-amber-800"></div>
                <div className="w-3 h-3 rounded-none bg-amber-900 border border-amber-700"></div>
                <div className="w-3 h-3 rounded-none bg-amber-800 border border-amber-600"></div>
                <span className="ml-2 text-xs font-medium text-white font-mono tracking-widest uppercase">Live Preview</span>
              </div>
              
              <div className="w-full flex items-center justify-center px-4 overflow-x-auto min-h-[400px]">
                {previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    key={previewUrl}
                    src={previewUrl} 
                    alt="asciify Preview"
                    className="rounded-xl shadow-2xl drop-shadow-[0_0_40px_rgba(16,185,129,0.08)] w-full h-auto object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-4 text-zinc-600">
                    <Terminal className="w-8 h-8 opacity-50" />
                    <span className="text-sm font-medium">Awaiting Configuration...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Markdown Export */}
            <div className="bg-[#050505] border border-amber-900 rounded-sm p-4 flex flex-col gap-3 group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white uppercase tracking-wider">Markdown Snippet</span>
                <button 
                  onClick={copyMarkdown}
                  className="flex items-center gap-2 text-xs font-medium text-amber-500 bg-[#111] hover:bg-amber-600 hover:text-black px-4 py-2 rounded-sm transition-colors border border-amber-800"
                >
                  {copied ? <Check className="w-4 h-4 text-black" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
              <pre className="text-sm font-mono text-amber-600 bg-black p-4 rounded-sm overflow-x-auto border border-dashed border-amber-900 shadow-inner selection:bg-amber-600/50">
                {getMarkdown()}
              </pre>
            </div>
          </div>

          {/* Right Panel - Controls */}
          <div className="w-full lg:w-[420px] flex-shrink-0 flex flex-col gap-6">
            
            <div className="bg-[#0a0a0a] border border-amber-900 rounded-sm p-6 shadow-2xl">
              <div className="flex bg-black rounded-sm p-1 mb-6 border border-dashed border-amber-900 relative">
                <button 
                  onClick={() => setActiveTab('data')} 
                  className={`flex-1 flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded-none transition-all relative z-10 ${activeTab === 'data' ? 'text-white' : 'text-white/60 hover:text-white'}`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  Data Config
                </button>
                <button 
                  onClick={() => setActiveTab('visual')} 
                  className={`flex-1 flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded-none transition-all relative z-10 ${activeTab === 'visual' ? 'text-white' : 'text-white/60 hover:text-white'}`}
                >
                  <Palette className="w-3.5 h-3.5" />
                  Visual Settings
                </button>
                <button 
                  onClick={() => setActiveTab('custom')} 
                  className={`flex-1 flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded-none transition-all relative z-10 ${activeTab === 'custom' ? 'text-white' : 'text-white/60 hover:text-white'}`}
                >
                  <Code className="w-3.5 h-3.5" />
                  Custom Fields
                </button>
                <div 
                  className="absolute top-1 bottom-1 w-[calc(33.33%-4px)] bg-amber-900/40 border border-amber-700 rounded-none transition-all duration-300 ease-out z-0"
                  style={{ left: activeTab === 'data' ? '4px' : activeTab === 'visual' ? 'calc(33.33% + 2px)' : 'calc(66.66%)' }}
                />
              </div>
              
              {activeTab === 'data' && (
                <div className="flex flex-col gap-4">
                
                {/* Input Component */}
                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <GitBranch className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
                  </div>
                  <input 
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="block w-full bg-black border border-amber-900 rounded-sm py-2.5 pl-10 pr-4 text-sm text-amber-500 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/50 transition-all placeholder-white/40 font-mono" 
                    placeholder="GitHub Username"
                  />
                  <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">
                    Base Profile (Required)
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
                  </div>
                  <input 
                    name="custom_image"
                    value={formData.custom_image}
                    onChange={handleChange}
                    className="block w-full bg-black border border-amber-900 rounded-sm py-2.5 pl-10 pr-4 text-sm text-amber-500 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/50 transition-all placeholder-white/40 font-mono" 
                    placeholder="https://your-custom-image.jpg"
                  />
                  <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">
                    Custom Image URL
                  </div>
                </div>

                <hr className="border-dashed border-amber-900/50 my-2" />

                <div className="grid grid-cols-2 gap-4">
                  <div className="group relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
                    </div>
                    <input name="name" value={formData.name} onChange={handleChange} disabled={hiddenFields.name} className={`block w-full bg-black border border-amber-900 rounded-sm py-2.5 pl-9 pr-10 text-sm focus:outline-none focus:border-amber-600 transition-all placeholder-white/40 font-mono ${hiddenFields.name ? 'text-amber-500/30 line-through' : 'text-amber-500'}`} placeholder="Auto" />
                    <button type="button" onClick={() => toggleHidden('name')} title={hiddenFields.name ? "Show field" : "Hide field"} className="absolute inset-y-0 right-0 pr-3 flex items-center text-amber-900 hover:text-amber-500 transition-colors">
                      {hiddenFields.name ? <EyeOff className="w-4 h-4 text-red-500" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">Name</div>
                  </div>
                  <div className="group relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Terminal className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
                    </div>
                    <input name="custom_username" value={formData.custom_username} onChange={handleChange} disabled={hiddenFields.login} className={`block w-full bg-black border border-amber-900 rounded-sm py-2.5 pl-9 pr-10 text-sm focus:outline-none focus:border-amber-600 transition-all placeholder-white/40 font-mono ${hiddenFields.login ? 'text-amber-500/30 line-through' : 'text-amber-500'}`} placeholder="Auto" />
                    <button type="button" onClick={() => toggleHidden('login')} title={hiddenFields.login ? "Show field" : "Hide field"} className="absolute inset-y-0 right-0 pr-3 flex items-center text-amber-900 hover:text-amber-500 transition-colors">
                      {hiddenFields.login ? <EyeOff className="w-4 h-4 text-red-500" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 group-focus-within:text-zinc-200 transition-colors">Handle</div>
                  </div>
                </div>

                <div className="group relative">
                  <textarea 
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={2}
                    disabled={hiddenFields.bio}
                    className={`block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 px-4 pr-10 text-sm font-mono focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/50 transition-all placeholder-white/40 resize-none ${hiddenFields.bio ? 'text-amber-500/30 line-through' : 'text-amber-500'}`} 
                    placeholder="Custom bio..."
                  />
                  <button type="button" onClick={() => toggleHidden('bio')} title={hiddenFields.bio ? "Show field" : "Hide field"} className="absolute top-2.5 right-3 text-amber-900 hover:text-amber-500 transition-colors">
                    {hiddenFields.bio ? <EyeOff className="w-4 h-4 text-red-500" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">Bio Override</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="group relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BookOpen className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
                    </div>
                    <input name="repos" type="number" value={formData.repos} onChange={handleChange} disabled={hiddenFields.repos} className={`block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-10 text-sm font-mono focus:outline-none focus:border-amber-600 transition-all placeholder-white/40 ${hiddenFields.repos ? 'text-amber-500/30 line-through' : 'text-amber-500'}`} placeholder="Auto" />
                    <button type="button" onClick={() => toggleHidden('repos')} title={hiddenFields.repos ? "Show field" : "Hide field"} className="absolute inset-y-0 right-0 pr-3 flex items-center text-amber-900 hover:text-amber-500 transition-colors">
                      {hiddenFields.repos ? <EyeOff className="w-4 h-4 text-red-500" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">Repos</div>
                  </div>
                  <div className="group relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Star className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
                    </div>
                    <input name="followers" type="number" value={formData.followers} onChange={handleChange} disabled={hiddenFields.followers} className={`block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-10 text-sm font-mono focus:outline-none focus:border-amber-600 transition-all placeholder-white/40 ${hiddenFields.followers ? 'text-amber-500/30 line-through' : 'text-amber-500'}`} placeholder="Auto" />
                    <button type="button" onClick={() => toggleHidden('followers')} title={hiddenFields.followers ? "Show field" : "Hide field"} className="absolute inset-y-0 right-0 pr-3 flex items-center text-amber-900 hover:text-amber-500 transition-colors">
                      {hiddenFields.followers ? <EyeOff className="w-4 h-4 text-red-500" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">Followers</div>
                  </div>
                  <div className="group relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building2 className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
                    </div>
                    <input name="company" value={formData.company} onChange={handleChange} disabled={hiddenFields.company} className={`block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-10 text-sm font-mono focus:outline-none focus:border-amber-600 transition-all placeholder-white/40 ${hiddenFields.company ? 'text-amber-500/30 line-through' : 'text-amber-500'}`} placeholder="Auto" />
                    <button type="button" onClick={() => toggleHidden('company')} title={hiddenFields.company ? "Show field" : "Hide field"} className="absolute inset-y-0 right-0 pr-3 flex items-center text-amber-900 hover:text-amber-500 transition-colors">
                      {hiddenFields.company ? <EyeOff className="w-4 h-4 text-red-500" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">Company</div>
                  </div>
                  <div className="group relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
                    </div>
                    <input name="location" value={formData.location} onChange={handleChange} disabled={hiddenFields.location} className={`block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-10 text-sm font-mono focus:outline-none focus:border-amber-600 transition-all placeholder-white/40 ${hiddenFields.location ? 'text-amber-500/30 line-through' : 'text-amber-500'}`} placeholder="Auto" />
                    <button type="button" onClick={() => toggleHidden('location')} title={hiddenFields.location ? "Show field" : "Hide field"} className="absolute inset-y-0 right-0 pr-3 flex items-center text-amber-900 hover:text-amber-500 transition-colors">
                      {hiddenFields.location ? <EyeOff className="w-4 h-4 text-red-500" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">Location</div>
                  </div>
                </div>

              </div>
              )}
              {activeTab === 'custom' && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between px-1 mb-2">
                  <div className="text-[10px] font-bold text-amber-500/50 uppercase tracking-widest">Custom Data Fields</div>
                  {customFields.length < 5 && (
                    <button 
                      onClick={() => setCustomFields([...customFields, { key: '', value: '' }])}
                      className="text-[10px] font-bold text-amber-500 hover:text-amber-400 bg-amber-900/20 px-2 py-1 rounded-sm border border-amber-900/50 transition-colors flex items-center gap-1"
                    >
                      + Add Field
                    </button>
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                {customFields.map((field, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4">
                    <div className="group relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Code className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
                      </div>
                      <input 
                        value={field.key} 
                        onChange={(e) => {
                          const newFields = [...customFields];
                          newFields[index] = { ...newFields[index], key: e.target.value };
                          setCustomFields(newFields);
                        }} 
                        className="block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-3 text-sm text-amber-500 font-mono focus:outline-none focus:border-amber-600 transition-all placeholder-white/40" 
                        placeholder={`Custom Key ${index + 1}`} 
                      />
                    </div>
                    <div className="group relative">
                      <input 
                        value={field.value} 
                        onChange={(e) => {
                          const newFields = [...customFields];
                          newFields[index] = { ...newFields[index], value: e.target.value };
                          setCustomFields(newFields);
                        }} 
                        className="block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 px-3 text-sm text-amber-500 font-mono focus:outline-none focus:border-amber-600 transition-all placeholder-white/40" 
                        placeholder={`Value ${index + 1}`} 
                      />
                    </div>
                  </div>
                ))}
                </div>
              </div>
              )}
              {activeTab === 'visual' && (
                <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                  <div className="group relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Code className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
                  </div>
                  <select name="theme" value={formData.theme} onChange={handleChange as any} className="block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-3 text-sm text-amber-500 font-mono focus:outline-none focus:border-amber-600 transition-all appearance-none cursor-pointer">
                    <option value="dark">Dark (Default)</option>
                    <option value="light">Light</option>
                    <option value="hacker">Hacker (Green)</option>
                    <option value="dracula">Dracula</option>
                    <option value="monokai">Monokai</option>
                  </select>
                  <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">Theme</div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
                  </div>
                  <select name="avatar_style" value={formData.avatar_style} onChange={handleChange as any} className="block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-3 text-sm text-amber-500 font-mono focus:outline-none focus:border-amber-600 transition-all appearance-none cursor-pointer">
                    <option value="colored">Colored (Default)</option>
                    <option value="grayscale">Black & White</option>
                    <option value="sepia">Sepia Filter</option>
                  </select>
                  <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">Avatar Style</div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Type className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
                  </div>
                  <select name="card_font" value={formData.card_font} onChange={handleChange as any} className="block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-3 text-sm text-amber-500 font-mono focus:outline-none focus:border-amber-600 transition-all appearance-none cursor-pointer">
                    <option value="">Default (Courier)</option>
                    <option value="'Fira Code', monospace">Fira Code</option>
                    <option value="'JetBrains Mono', monospace">JetBrains Mono</option>
                    <option value="Consolas, monospace">Consolas</option>
                  </select>
                  <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">Card Font</div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Palette className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
                  </div>
                  <input name="text_color" value={formData.text_color} onChange={handleChange} className="block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-3 text-sm text-amber-500 font-mono focus:outline-none focus:border-amber-600 transition-all placeholder-white/40" placeholder="#a5d6ff" />
                  <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">Custom Color</div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Check className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
                  </div>
                  <select name="border_style" value={formData.border_style} onChange={handleChange as any} className="block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-3 text-sm text-amber-500 font-mono focus:outline-none focus:border-amber-600 transition-all appearance-none cursor-pointer">
                    <option value="solid">Solid (Default)</option>
                    <option value="dashed">Dashed</option>
                    <option value="dotted">Dotted</option>
                    <option value="none">None</option>
                  </select>
                  <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">Border Style</div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Palette className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
                  </div>
                  <select name="border_color" value={formData.border_color} onChange={handleChange as any} className="block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-3 text-sm text-amber-500 font-mono focus:outline-none focus:border-amber-600 transition-all appearance-none cursor-pointer">
                    <option value="default">Default</option>
                    <option value="emerald">Emerald</option>
                    <option value="cyan">Cyan</option>
                    <option value="purple">Purple</option>
                    <option value="crimson">Crimson</option>
                  </select>
                  <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">Border Color</div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ImageIcon className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
                  </div>
                  <select name="corner_radius" value={formData.corner_radius} onChange={handleChange as any} className="block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-3 text-sm text-amber-500 font-mono focus:outline-none focus:border-amber-600 transition-all appearance-none cursor-pointer">
                    <option value="15">Default (15px)</option>
                    <option value="0">Sharp (0px)</option>
                    <option value="8">Small (8px)</option>
                    <option value="24">Rounded (24px)</option>
                  </select>
                  <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">Corner Radius</div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Activity className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
                  </div>
                  <select name="anim_speed" value={formData.anim_speed} onChange={handleChange as any} className="block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-3 text-sm text-amber-500 font-mono focus:outline-none focus:border-amber-600 transition-all appearance-none cursor-pointer">
                    <option value="8">Normal (8s)</option>
                    <option value="4">Fast (4s)</option>
                    <option value="12">Slow (12s)</option>
                    <option value="0">Disabled (0s)</option>
                  </select>
                  <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">Anim Speed</div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BookOpen className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
                  </div>
                  <select name="bg_style" value={formData.bg_style} onChange={handleChange as any} className="block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-3 text-sm text-amber-500 font-mono focus:outline-none focus:border-amber-600 transition-all appearance-none cursor-pointer">
                    <option value="solid">Solid Background</option>
                    <option value="glass">Glassmorphism</option>
                    <option value="transparent">Transparent</option>
                  </select>
                  <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">Background</div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Type className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
                  </div>
                  <select name="font_size" value={formData.font_size} onChange={handleChange as any} className="block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-3 text-sm text-amber-500 font-mono focus:outline-none focus:border-amber-600 transition-all appearance-none cursor-pointer">
                    <option value="16">Normal (16px)</option>
                    <option value="14">Small (14px)</option>
                    <option value="18">Large (18px)</option>
                  </select>
                  <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">Font Size</div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Code className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
                  </div>
                  <select name="layout_gap" value={formData.layout_gap} onChange={handleChange as any} className="block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-3 text-sm text-amber-500 font-mono focus:outline-none focus:border-amber-600 transition-all appearance-none cursor-pointer">
                    <option value="normal">Normal</option>
                    <option value="compact">Compact</option>
                    <option value="relaxed">Relaxed</option>
                  </select>
                  <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">Layout Gap</div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Star className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
                  </div>
                  <select name="ascii_density" value={formData.ascii_density} onChange={handleChange as any} className="block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-3 text-sm text-amber-500 font-mono focus:outline-none focus:border-amber-600 transition-all appearance-none cursor-pointer">
                    <option value="standard">Numbers (809...)</option>
                    <option value="classic">Symbols (@%#...)</option>
                  </select>
                  <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">ASCII Density</div>
                </div>
              </div>
              )}
            </div>

            {/* Custom Data Source Notice */}
            <div className="bg-[#111] border border-amber-900 rounded-sm p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Globe className="w-20 h-20 text-amber-500" />
              </div>
              <h4 className="text-white font-semibold text-sm mb-2 relative z-10 flex items-center gap-2">
                Decentralized Data Support
              </h4>
              <p className="text-xs text-amber-700 leading-relaxed relative z-10">
                You can host your own raw image on a public repo (like a GitHub Gist) and pass it to the <code className="bg-white/10 text-amber-500 px-1 py-0.5 rounded border border-amber-700">Custom Image URL</code> above. Combined with the text overrides, you can generate cards without any backend database or GitHub fetching!
              </p>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
