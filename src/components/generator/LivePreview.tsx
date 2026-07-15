import React from 'react';
import { Terminal } from 'lucide-react';

interface LivePreviewProps {
  previewUrl: string;
}

export const LivePreview = ({ previewUrl }: LivePreviewProps) => {
  return (
    <div className="bg-[#0a0a0a] border border-amber-900 rounded-sm p-2 pb-6 flex flex-col overflow-hidden shadow-2xl relative">
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
            src={`${previewUrl}&_t=${Date.now()}`} 
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
  );
};
