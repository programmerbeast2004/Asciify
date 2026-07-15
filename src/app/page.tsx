"use client";

import React from "react";
import { useCardGenerator } from "@/hooks/useCardGenerator";
import { Header } from "@/components/generator/Header";
import { Hero } from "@/components/generator/Hero";
import { LivePreview } from "@/components/generator/LivePreview";
import { MarkdownExport } from "@/components/generator/MarkdownExport";
import { Controls } from "@/components/generator/Controls";

export default function Home() {
  const {
    cardType,
    setCardType,
    copied,
    previewUrl,
    exportOptions,
    setExportOptions,
    activeTab,
    setActiveTab,
    customFields,
    setCustomFields,
    hiddenFields,
    toggleHidden,
    formData,
    handleChange,
    getMarkdown,
    copyMarkdown,
    downloadReadme
  } = useCardGenerator();

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

      <Header />

      <main className="max-w-[1300px] mx-auto px-6 pt-0 pb-8 flex flex-col items-center">
        <Hero />

        {/* Generator Interface */}
        <div className="w-full flex flex-col lg:flex-row gap-8 relative z-10 items-start">
          
          {/* Left Panel - Live Preview and Export */}
          <div className="flex-1 flex flex-col gap-6 min-w-0 w-full">
            <LivePreview previewUrl={previewUrl} />

            <MarkdownExport 
              exportOptions={exportOptions}
              setExportOptions={setExportOptions}
              getMarkdown={getMarkdown}
              downloadReadme={downloadReadme}
              copyMarkdown={copyMarkdown}
              copied={copied}
            />
          </div>

          {/* Right Panel - Controls */}
          <Controls 
            cardType={cardType}
            setCardType={setCardType}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            formData={formData}
            handleChange={handleChange}
            hiddenFields={hiddenFields}
            toggleHidden={toggleHidden}
            customFields={customFields}
            setCustomFields={setCustomFields}
          />
        </div>
      </main>
    </div>
  );
}
