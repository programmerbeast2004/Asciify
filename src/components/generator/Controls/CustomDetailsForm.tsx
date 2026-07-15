import React from 'react';
import { Code } from 'lucide-react';
import { CustomField } from '@/types/generator';

interface CustomDetailsFormProps {
  customFields: CustomField[];
  setCustomFields: (fields: CustomField[]) => void;
}

export const CustomDetailsForm = ({ customFields, setCustomFields }: CustomDetailsFormProps) => {
  return (
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
  );
};
