import React from 'react';
import { Terminal, Palette, Code, Globe } from 'lucide-react';
import { CardType, ActiveTab, CustomField, HiddenFields, FormData } from '@/types/generator';
import { CardTypeSwitcher } from './Controls/CardTypeSwitcher';
import { TypingForm } from './Controls/TypingForm';
import { GithubDataForm } from './Controls/GithubDataForm';
import { AppearanceForm } from './Controls/AppearanceForm';
import { CustomDetailsForm } from './Controls/CustomDetailsForm';
import { LeetCodeDataForm } from './Controls/LeetCodeDataForm';

interface ControlsProps {
  cardType: CardType;
  setCardType: (type: CardType) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  hiddenFields: HiddenFields;
  toggleHidden: (field: string) => void;
  customFields: CustomField[];
  setCustomFields: (fields: CustomField[]) => void;
}

export const Controls = ({
  cardType,
  setCardType,
  activeTab,
  setActiveTab,
  formData,
  handleChange,
  hiddenFields,
  toggleHidden,
  customFields,
  setCustomFields
}: ControlsProps) => {
  return (
    <div className="w-full lg:w-[450px] flex-shrink-0 flex flex-col gap-6">
      <CardTypeSwitcher cardType={cardType} setCardType={setCardType} />
      
      {cardType === 'typing' ? (
        <TypingForm formData={formData} handleChange={handleChange} />
      ) : (
        <div className="bg-[#0a0a0a] border border-amber-900 rounded-sm p-6 shadow-2xl">
          <div className="flex bg-black rounded-sm p-1 mb-6 border border-dashed border-amber-900 relative">
            <button 
              onClick={() => setActiveTab('data')} 
              className={`flex-1 flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded-none transition-all relative z-10 ${activeTab === 'data' ? 'text-white' : 'text-white/60 hover:text-white'}`}
            >
              <Terminal className="w-3.5 h-3.5" />
              Profile Data
            </button>
            <button 
              onClick={() => setActiveTab('visual')} 
              className={`flex-1 flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded-none transition-all relative z-10 ${activeTab === 'visual' ? 'text-white' : 'text-white/60 hover:text-white'}`}
            >
              <Palette className="w-3.5 h-3.5" />
              Appearance
            </button>
            {cardType === 'github' && (
              <button 
                onClick={() => setActiveTab('custom')} 
                className={`flex-1 flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded-none transition-all relative z-10 ${activeTab === 'custom' ? 'text-white' : 'text-white/60 hover:text-white'}`}
              >
                <Code className="w-3.5 h-3.5" />
                Custom Details
              </button>
            )}
            <div 
              className="absolute top-1 bottom-1 bg-amber-900/40 border border-amber-700 rounded-none transition-all duration-300 ease-out z-0"
              style={{ 
                width: cardType === 'github' ? 'calc(33.33% - 4px)' : 'calc(50% - 4px)',
                left: activeTab === 'data' ? '4px' : (activeTab === 'visual' ? (cardType === 'github' ? 'calc(33.33% + 2px)' : 'calc(50% + 2px)') : 'calc(66.66%)') 
              }}
            />
          </div>

          {activeTab === 'data' && cardType === 'github' && (
            <GithubDataForm 
              formData={formData} 
              handleChange={handleChange} 
              hiddenFields={hiddenFields} 
              toggleHidden={toggleHidden} 
            />
          )}

          {activeTab === 'custom' && cardType === 'github' && (
            <CustomDetailsForm 
              customFields={customFields} 
              setCustomFields={setCustomFields} 
            />
          )}

          {activeTab === 'visual' && (
            <AppearanceForm 
              formData={formData} 
              handleChange={handleChange} 
              cardType={cardType} 
            />
          )}

          {activeTab === 'data' && cardType === 'leetcode' && (
            <LeetCodeDataForm 
              formData={formData} 
              handleChange={handleChange} 
            />
          )}
        </div>
      )}

      {cardType === 'github' && (
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
      )}
    </div>
  );
};
