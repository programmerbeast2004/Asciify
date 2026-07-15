import React from 'react';
import { Copy, Check } from 'lucide-react';
import { ExportOptions } from '@/types/generator';

interface MarkdownExportProps {
  exportOptions: ExportOptions;
  setExportOptions: React.Dispatch<React.SetStateAction<ExportOptions>>;
  getMarkdown: () => string;
  downloadReadme: () => void;
  copyMarkdown: () => void;
  copied: boolean;
}

export const MarkdownExport = ({
  exportOptions,
  setExportOptions,
  getMarkdown,
  downloadReadme,
  copyMarkdown,
  copied,
}: MarkdownExportProps) => {
  return (
    <div className="bg-[#050505] border border-amber-900 rounded-sm p-4 flex flex-col gap-3 group">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-white uppercase tracking-wider">Markdown Export</span>
        <div className="flex gap-2">
          <button 
            onClick={downloadReadme}
            className="flex items-center gap-2 text-xs font-medium text-amber-500 bg-[#111] hover:bg-amber-600 hover:text-black px-4 py-2 rounded-sm transition-colors border border-amber-800"
          >
            Download README
          </button>
          <button 
            onClick={copyMarkdown}
            className="flex items-center gap-2 text-xs font-medium text-amber-500 bg-[#111] hover:bg-amber-600 hover:text-black px-4 py-2 rounded-sm transition-colors border border-amber-800"
          >
            {copied ? <Check className="w-4 h-4 text-black" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-2">
        <label className="flex items-center gap-2 text-xs text-amber-500 cursor-pointer hover:text-white transition-colors">
          <input type="checkbox" checked={exportOptions.typing} onChange={(e) => setExportOptions(prev => ({ ...prev, typing: e.target.checked }))} className="accent-amber-600 w-3 h-3" />
          Include Typing Intro
        </label>
        <label className="flex items-center gap-2 text-xs text-amber-500 cursor-pointer hover:text-white transition-colors">
          <input type="checkbox" checked={exportOptions.github} onChange={(e) => setExportOptions(prev => ({ ...prev, github: e.target.checked }))} className="accent-amber-600 w-3 h-3" />
          Include GitHub Stats
        </label>
        <label className="flex items-center gap-2 text-xs text-amber-500 cursor-pointer hover:text-white transition-colors">
          <input type="checkbox" checked={exportOptions.leetcode} onChange={(e) => setExportOptions(prev => ({ ...prev, leetcode: e.target.checked }))} className="accent-amber-600 w-3 h-3" />
          Include LeetCode Stats
        </label>
      </div>
      <pre className="text-sm font-mono text-amber-600 bg-black p-4 rounded-sm overflow-x-auto border border-dashed border-amber-900 shadow-inner selection:bg-amber-600/50">
        {getMarkdown()}
      </pre>
    </div>
  );
};
