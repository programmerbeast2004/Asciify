import React from 'react';
import { Type } from 'lucide-react';
import { FormData } from '@/types/generator';

interface TypingFormProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const TypingForm = ({ formData, handleChange }: TypingFormProps) => {
  return (
    <div className="bg-[#0a0a0a] border border-amber-900 rounded-sm p-5 shadow-2xl flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Type className="w-5 h-5 text-amber-500" />
          <h3 className="text-amber-500 font-bold text-base">Typing Text Configuration</h3>
        </div>
      </div>
      
      <div className="group relative">
        <textarea 
          name="typing_intro"
          value={formData.typing_intro}
          onChange={handleChange}
          rows={3}
          className="block w-full bg-[#050505] border border-amber-900/50 rounded-sm py-3 px-4 text-sm font-mono focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-all placeholder-white/20 resize-none text-amber-500" 
          placeholder="Line 1: Hi there!&#10;Line 2: I'm a Developer&#10;Line 3: Welcome!"
        />
        <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white">
          Text Lines
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="group relative">
          <select name="typing_font" value={formData.typing_font} onChange={handleChange} className="block w-full bg-[#050505] border border-amber-900/50 rounded-sm py-2.5 pl-3 pr-8 text-xs text-amber-500 font-mono focus:outline-none focus:border-amber-500 transition-all appearance-none cursor-pointer">
            <option value="Courier New">Courier New</option>
            <option value="Fira Code">Fira Code</option>
            <option value="Inter">Inter</option>
            <option value="Roboto">Roboto</option>
            <option value="Outfit">Outfit</option>
          </select>
          <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white">Font Style</div>
        </div>

        <div className="group relative">
          <select name="typing_size" value={formData.typing_size} onChange={handleChange} className="block w-full bg-[#050505] border border-amber-900/50 rounded-sm py-2.5 pl-3 pr-8 text-xs text-amber-500 font-mono focus:outline-none focus:border-amber-500 transition-all appearance-none cursor-pointer">
            <option value="20">Small (20px)</option>
            <option value="24">Medium (24px)</option>
            <option value="28">Large (28px)</option>
            <option value="32">Huge (32px)</option>
          </select>
          <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white">Size</div>
        </div>

        <div className="group relative">
          <select name="typing_duration" value={formData.typing_duration} onChange={handleChange} className="block w-full bg-[#050505] border border-amber-900/50 rounded-sm py-2.5 pl-3 pr-8 text-xs text-amber-500 font-mono focus:outline-none focus:border-amber-500 transition-all appearance-none cursor-pointer">
            <option value="4000">Slow</option>
            <option value="3000">Normal</option>
            <option value="1500">Fast</option>
            <option value="1000">Sonic</option>
          </select>
          <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white">Typing Speed</div>
        </div>

        <div className="group relative flex items-center justify-between bg-[#050505] border border-amber-900/50 rounded-sm py-1.5 pl-3 pr-1.5">
          <div className="text-xs text-white/70">Text Color</div>
          <div className="relative w-8 h-6 rounded-sm overflow-hidden border border-amber-900/50">
            <input 
              type="color"
              name="typing_color"
              value={formData.typing_color}
              onChange={handleChange}
              className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
