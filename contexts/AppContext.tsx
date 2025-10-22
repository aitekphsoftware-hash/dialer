import React, { createContext, useState, useContext, ReactNode } from 'react';
import { CallState, Template, TranscriptEntry } from '../types';

interface AppContextType {
  callState: CallState;
  setCallState: (state: CallState) => void;
  selectedTemplate: Template | null;
  setSelectedTemplate: (template: Template | null) => void;
  dialerNumber: string;
  setDialerNumber: (number: string) => void;
  transcript: TranscriptEntry[];
  addToTranscript: (entry: Omit<TranscriptEntry, 'timestamp'>) => void;
  updateLastTranscript: (payload: Partial<Omit<TranscriptEntry, 'speaker' | 'timestamp'>>) => void;
  clearTranscript: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

// FIX: Changed AppProvider to be a React.FC to properly handle props like children.
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [callState, setCallState] = useState<CallState>(CallState.Idle);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [dialerNumber, setDialerNumber] = useState('');
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const addToTranscript = (entry: Omit<TranscriptEntry, 'timestamp'>) => {
    const newEntry: TranscriptEntry = {
      ...entry,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setTranscript(prev => [...prev, newEntry]);
  };
  
  const updateLastTranscript = (payload: Partial<Omit<TranscriptEntry, 'speaker' | 'timestamp'>>) => {
    setTranscript(prev => {
      if (prev.length === 0) return prev;
      const allButLast = prev.slice(0, -1);
      const updatedLast = { ...prev[prev.length - 1], ...payload };
      return [...allButLast, updatedLast];
    });
  };

  const clearTranscript = () => {
    setTranscript([]);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  }

  const value = {
    callState,
    setCallState,
    selectedTemplate,
    setSelectedTemplate,
    dialerNumber,
    setDialerNumber,
    transcript,
    addToTranscript,
    updateLastTranscript,
    clearTranscript,
    isSidebarOpen,
    toggleSidebar
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};