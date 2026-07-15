import React from 'react';
import { Code, User, Type, Palette, Check, Activity, BookOpen, Star, Image as ImageIcon } from 'lucide-react';
import { FormData, CardType } from '@/types/generator';

interface AppearanceFormProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  cardType: CardType;
}

export const AppearanceForm = ({ formData, handleChange, cardType }: AppearanceFormProps) => {
  return (
    <div className="grid grid-cols-2 gap-y-4 gap-x-4">
      <div className="group relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Code className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
        </div>
        <select name="theme" value={formData.theme} onChange={handleChange} className="block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-3 text-sm text-amber-500 font-mono focus:outline-none focus:border-amber-600 transition-all appearance-none cursor-pointer">
          <option value="dark">Dark (Default)</option>
          <option value="light">Light</option>
          <option value="hacker">Hacker (Green)</option>
          <option value="dracula">Dracula</option>
          <option value="monokai">Monokai</option>
        </select>
        <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">Theme</div>
      </div>

      {cardType === 'github' && (
      <div className="group relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <User className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
        </div>
        <select name="avatar_style" value={formData.avatar_style} onChange={handleChange} className="block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-3 text-sm text-amber-500 font-mono focus:outline-none focus:border-amber-600 transition-all appearance-none cursor-pointer">
          <option value="colored">Colored (Default)</option>
          <option value="grayscale">Black & White</option>
          <option value="sepia">Sepia Filter</option>
        </select>
        <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">Avatar Style</div>
      </div>
      )}

      <div className="group relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Type className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
        </div>
        <select name="card_font" value={formData.card_font} onChange={handleChange} className="block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-3 text-sm text-amber-500 font-mono focus:outline-none focus:border-amber-600 transition-all appearance-none cursor-pointer">
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
        <input name="text_color" value={formData.text_color} onChange={handleChange} className="block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-10 text-sm text-amber-500 font-mono focus:outline-none focus:border-amber-600 transition-all placeholder-white/40" placeholder="#a5d6ff" />
        <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
          <div className="relative w-6 h-6 rounded-sm overflow-hidden border border-amber-900/50 hover:border-amber-500 transition-colors group-focus-within:border-amber-600">
            <input 
              type="color" 
              name="text_color" 
              value={/^#[0-9A-Fa-f]{6}$/i.test(formData.text_color) ? formData.text_color : '#d97706'} 
              onChange={handleChange} 
              className="absolute -top-2 -left-2 w-10 h-10 cursor-pointer opacity-0 z-10"
            />
            <div className="w-full h-full" style={{ backgroundColor: /^#?([0-9A-Fa-f]{3,8})$/.test(formData.text_color) ? (formData.text_color.startsWith('#') ? formData.text_color : `#${formData.text_color}`) : '#d97706' }}></div>
          </div>
        </div>
        <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">Accent Color</div>
      </div>

      <div className="group relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Check className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
        </div>
        <select name="border_style" value={formData.border_style} onChange={handleChange} className="block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-3 text-sm text-amber-500 font-mono focus:outline-none focus:border-amber-600 transition-all appearance-none cursor-pointer">
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
        <select name="border_color" value={formData.border_color} onChange={handleChange} className="block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-3 text-sm text-amber-500 font-mono focus:outline-none focus:border-amber-600 transition-all appearance-none cursor-pointer">
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
        <select name="corner_radius" value={formData.corner_radius} onChange={handleChange} className="block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-3 text-sm text-amber-500 font-mono focus:outline-none focus:border-amber-600 transition-all appearance-none cursor-pointer">
          <option value="15">Default (15px)</option>
          <option value="0">Sharp (0px)</option>
          <option value="8">Small (8px)</option>
          <option value="24">Rounded (24px)</option>
        </select>
        <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">Corner Radius</div>
      </div>

      {cardType === 'github' && (
      <div className="group relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Activity className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
        </div>
        <select name="anim_speed" value={formData.anim_speed} onChange={handleChange} className="block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-3 text-sm text-amber-500 font-mono focus:outline-none focus:border-amber-600 transition-all appearance-none cursor-pointer">
          <option value="8">Normal (8s)</option>
          <option value="4">Fast (4s)</option>
          <option value="12">Slow (12s)</option>
          <option value="0">Disabled (0s)</option>
        </select>
        <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">Anim Speed</div>
      </div>
      )}

      <div className="group relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <BookOpen className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
        </div>
        <select name="bg_style" value={formData.bg_style} onChange={handleChange} className="block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-3 text-sm text-amber-500 font-mono focus:outline-none focus:border-amber-600 transition-all appearance-none cursor-pointer">
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
        <select name="font_size" value={formData.font_size} onChange={handleChange} className="block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-3 text-sm text-amber-500 font-mono focus:outline-none focus:border-amber-600 transition-all appearance-none cursor-pointer">
          <option value="16">Normal (16px)</option>
          <option value="14">Small (14px)</option>
          <option value="18">Large (18px)</option>
        </select>
        <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">Font Size</div>
      </div>

      {cardType === 'github' && (
      <div className="group relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Code className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
        </div>
        <select name="layout_gap" value={formData.layout_gap} onChange={handleChange} className="block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-3 text-sm text-amber-500 font-mono focus:outline-none focus:border-amber-600 transition-all appearance-none cursor-pointer">
          <option value="normal">Normal</option>
          <option value="compact">Compact</option>
          <option value="relaxed">Relaxed</option>
        </select>
        <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">Layout Gap</div>
      </div>
      )}

      {cardType === 'github' && (
      <div className="group relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Star className="w-4 h-4 text-white group-focus-within:text-white transition-colors" />
        </div>
        <select name="ascii_density" value={formData.ascii_density} onChange={handleChange} className="block w-full bg-[#000] border border-amber-900 rounded-sm py-2.5 pl-9 pr-3 text-sm text-amber-500 font-mono focus:outline-none focus:border-amber-600 transition-all appearance-none cursor-pointer">
          <option value="standard">Numbers (809...)</option>
          <option value="classic">Symbols (@%#...)</option>
        </select>
        <div className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 text-[10px] font-semibold uppercase tracking-wider text-white group-focus-within:text-white transition-colors">ASCII Density</div>
      </div>
      )}
    </div>
  );
};
