
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { CallState } from '../types';
import { Icon } from './Icon';

export const Header = () => {
  const { callState, toggleSidebar } = useAppContext();

  const getStatusPillClass = () => {
    switch (callState) {
      case CallState.Idle:
        return 'bg-gray-500';
      case CallState.Ringing:
        return 'bg-blue-500 animate-pulse';
      case CallState.Connected:
        return 'bg-green-500';
      case CallState.Ended:
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const scrollToDialer = () => {
    document.getElementById('dialer-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <header className="sticky top-0 z-40 bg-gray-900/70 backdrop-blur-md border-b border-gray-700/50 p-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
         <button onClick={toggleSidebar} className="lg:hidden p-1 -ml-1 text-gray-400 hover:text-white">
          <Icon icon="menu" className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
            <Icon icon="logo" className="w-8 h-8 text-teal-400" />
            <span className="text-xl font-bold tracking-tight text-white">Eburon</span>
        </div>
      </div>
      <h1 className="hidden md:block text-lg font-semibold text-gray-300">CSR Studio</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full transition-colors ${getStatusPillClass()}`}></div>
          <span className="text-sm font-medium text-gray-300">{callState}</span>
        </div>
        <button 
          onClick={scrollToDialer}
          className="hidden md:inline-block bg-teal-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500">
          Try it now
        </button>
      </div>
    </header>
  );
};
