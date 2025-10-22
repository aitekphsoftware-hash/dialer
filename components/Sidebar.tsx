import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from './Icon';

const NavItem = ({ label }: { label: string }) => (
  <a href="#" className="flex items-center px-3 py-2 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors text-sm">
    {label}
  </a>
);

// FIX: Defined an explicit props interface for NavGroup and used React.FC.
interface NavGroupProps {
    title: string;
    children: React.ReactNode;
}

const NavGroup: React.FC<NavGroupProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider hover:text-gray-300">
                <span>{title}</span>
                <Icon icon="chevron-down" className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && <div className="mt-1 space-y-1">{children}</div>}
        </div>
    );
}

const SidebarContent = () => (
    <nav className="flex-1 space-y-4 px-2 py-4">
      <NavGroup title="Projects">
        <NavItem label="Overview" />
      </NavGroup>
      <NavGroup title="Workspace">
        <NavItem label="Agents" />
        <NavItem label="Knowledge" />
        <NavItem label="Language Models" />
        <NavItem label="Voices" />
      </NavGroup>
      <NavGroup title="Showcases">
        <NavItem label="Turkish Airlines CSR" />
        <NavItem label="Banking" />
        <NavItem label="Telecom" />
      </NavGroup>
    </nav>
);


export const Sidebar = () => {
    const { isSidebarOpen, toggleSidebar } = useAppContext();
  return (
    <>
      {/* Mobile Sidebar (Drawer) */}
      <div 
        className={`fixed inset-0 bg-gray-900/80 z-40 transition-opacity lg:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSidebar}
      ></div>
      <aside className={`fixed top-0 left-0 h-full w-64 bg-gray-800 border-r border-gray-700 flex flex-col z-50 transform transition-transform lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700 lg:hidden">
            <span className="text-lg font-bold">Menu</span>
            <button onClick={toggleSidebar} className="p-1 text-gray-400 hover:text-white">
                <Icon icon="close" className="w-6 h-6" />
            </button>
        </div>
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-gray-800 border-r border-gray-700 flex-col">
          <SidebarContent />
      </aside>
    </>
  );
};