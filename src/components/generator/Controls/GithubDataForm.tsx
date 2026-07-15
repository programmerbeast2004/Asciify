import React from 'react';
import { GitBranch, Globe, User, Terminal, BookOpen, Star, Building2, MapPin, Eye, EyeOff } from 'lucide-react';
import { FormData, HiddenFields } from '@/types/generator';

interface GithubDataFormProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  hiddenFields: HiddenFields;
  toggleHidden: (field: string) => void;
}

export const GithubDataForm = ({ formData, handleChange, hiddenFields, toggleHidden }: GithubDataFormProps) => {
  return (
    <div className="flex flex-col gap-4">
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
          GitHub Username
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
  );
};
