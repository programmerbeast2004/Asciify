import React from 'react';
import { Code } from 'lucide-react';
import { FormData } from '@/types/generator';

interface LeetCodeDataFormProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const LeetCodeDataForm = ({ formData, handleChange }: LeetCodeDataFormProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center mb-2">
        <h3 className="text-lg font-bold text-amber-500">LeetCode Stats Card</h3>
        <p className="text-xs text-zinc-500 mt-1">Showcase your problem-solving skills with graphs and badges.</p>
      </div>

      <div className="group relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Code className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
        </div>
        <input 
          name="leetcode_username"
          value={formData.leetcode_username}
          onChange={handleChange}
          className="block w-full bg-black border border-amber-900 rounded-sm py-3 pl-10 pr-4 text-sm text-amber-500 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/50 transition-all placeholder-white/40 font-mono" 
          placeholder="e.g. programmerbeast"
        />
        <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white">
          LeetCode Username
        </div>
      </div>

      <hr className="border-dashed border-amber-900/50 my-1" />

      <div className="flex flex-col gap-3">
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-sm font-medium text-amber-600 group-hover:text-amber-500 transition-colors">Show Badges</span>
          <div className="relative">
            <input type="checkbox" name="lc_show_badges" checked={formData.lc_show_badges} onChange={handleChange} className="sr-only" />
            <div className={`w-10 h-5 bg-black border rounded-full transition-colors ${formData.lc_show_badges ? 'border-amber-500' : 'border-amber-900'}`}></div>
            <div className={`absolute w-3.5 h-3.5 bg-amber-500 rounded-full top-0.5 transition-transform ${formData.lc_show_badges ? 'translate-x-5' : 'translate-x-1'}`}></div>
          </div>
        </label>

        <label className={`flex items-center justify-between cursor-pointer group ${!formData.lc_show_badges ? 'opacity-50 pointer-events-none' : ''}`}>
          <span className="text-sm font-medium text-amber-600 group-hover:text-amber-500 transition-colors">Animate Badges (Rotate)</span>
          <div className="relative">
            <input type="checkbox" name="lc_animate_badges" checked={formData.lc_animate_badges} onChange={handleChange} className="sr-only" />
            <div className={`w-10 h-5 bg-black border rounded-full transition-colors ${formData.lc_animate_badges ? 'border-amber-500' : 'border-amber-900'}`}></div>
            <div className={`absolute w-3.5 h-3.5 bg-amber-500 rounded-full top-0.5 transition-transform ${formData.lc_animate_badges ? 'translate-x-5' : 'translate-x-1'}`}></div>
          </div>
        </label>

        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-sm font-medium text-amber-600 group-hover:text-amber-500 transition-colors">Show Activity Graph</span>
          <div className="relative">
            <input type="checkbox" name="lc_show_graph" checked={formData.lc_show_graph} onChange={handleChange} className="sr-only" />
            <div className={`w-10 h-5 bg-black border rounded-full transition-colors ${formData.lc_show_graph ? 'border-amber-500' : 'border-amber-900'}`}></div>
            <div className={`absolute w-3.5 h-3.5 bg-amber-500 rounded-full top-0.5 transition-transform ${formData.lc_show_graph ? 'translate-x-5' : 'translate-x-1'}`}></div>
          </div>
        </label>
      </div>
    </div>
  );
};
