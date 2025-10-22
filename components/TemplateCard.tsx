import React from 'react';
import { Template } from '../types';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from './Icon';

interface TemplateCardProps {
  template: Template;
}

// FIX: Changed component to a const with React.FC to resolve key prop issue.
export const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const { selectedTemplate, setSelectedTemplate } = useAppContext();
  const isSelected = selectedTemplate?.id === template.id;

  const speak = (text: string) => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Cancel any previous speech
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.volume = 0.7;
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
      }
  };

  const handleSelect = () => {
    setSelectedTemplate(template);
  }

  const handlePreview = (e: React.MouseEvent) => {
      e.stopPropagation();
      speak(template.previewLine);
  }
  
  const handleTry = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedTemplate(template);
      document.getElementById('dialer-input')?.focus();
  }

  return (
    <div 
        onClick={handleSelect}
        className={`bg-gray-800/50 p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:border-teal-400/80 ${isSelected ? 'border-teal-500 shadow-lg shadow-teal-500/10' : 'border-gray-700'}`}>
      <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
              <div className="text-2xl">{template.icon}</div>
              <div>
                  <h3 className="font-semibold text-white">{template.title}</h3>
                  <p className="text-xs text-gray-400">Tone: {template.tone} • Languages: {template.languages}</p>
              </div>
          </div>
          {isSelected && <span className="text-teal-400 text-xs font-bold">SELECTED</span>}
      </div>
      <p className="text-sm text-gray-300 mt-3 italic">"{template.previewLine}"</p>
      <div className="flex gap-2 mt-4">
        <button onClick={handlePreview} className="flex-1 flex items-center justify-center gap-1 bg-gray-700 text-gray-200 px-3 py-2 rounded-md text-sm font-semibold hover:bg-gray-600 transition-colors">
            <Icon icon="play" className="w-4 h-4" /> Preview
        </button>
        <button onClick={handleTry} className="flex-1 bg-teal-600 text-white px-3 py-2 rounded-md text-sm font-semibold hover:bg-teal-500 transition-colors">
            Try
        </button>
      </div>
    </div>
  );
};